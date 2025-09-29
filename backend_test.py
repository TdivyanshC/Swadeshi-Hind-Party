#!/usr/bin/env python3
"""
Backend API Testing for Swadeshi Hindu Party Website
Tests all form submission endpoints and health checks
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from environment
BACKEND_URL = "https://swadeshi-connect.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def log_result(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_health_check(self):
        """Test GET /api/ endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_result("Health Check (GET /api/)", True, 
                                  f"API is active - {data.get('message')}")
                    return True
                else:
                    self.log_result("Health Check (GET /api/)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Health Check (GET /api/)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Health Check (GET /api/)", False, f"Connection error: {str(e)}")
            return False
    
    def test_health_endpoint(self):
        """Test GET /api/health endpoint with database connectivity"""
        try:
            response = self.session.get(f"{BACKEND_URL}/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and data.get("database") == "connected":
                    self.log_result("Health Check with DB (GET /api/health)", True, 
                                  "Database connection healthy")
                    return True
                else:
                    self.log_result("Health Check with DB (GET /api/health)", False, 
                                  "Database not connected properly", data)
                    return False
            else:
                self.log_result("Health Check with DB (GET /api/health)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Health Check with DB (GET /api/health)", False, 
                          f"Connection error: {str(e)}")
            return False
    
    def test_donation_submission(self):
        """Test POST /api/donations endpoint"""
        test_data = {
            "name": "Rajesh Kumar Sharma",
            "email": "rajesh.sharma@gmail.com",
            "phone": "9876543210",
            "amount": "5000",
            "message": "Proud to support Swadeshi Hindu Party's vision for Atmanirbhar Bharat"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/donations", 
                                       data=json.dumps(test_data))
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "name", "email", "phone", "amount"]):
                    self.log_result("Donation Submission (POST /api/donations)", True, 
                                  f"Donation created successfully - ID: {data.get('id')}")
                    return True
                else:
                    self.log_result("Donation Submission (POST /api/donations)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Donation Submission (POST /api/donations)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Donation Submission (POST /api/donations)", False, 
                          f"Request error: {str(e)}")
            return False
    
    def test_membership_registration(self):
        """Test POST /api/memberships endpoint"""
        test_data = {
            "name": "Priya Devi Gupta",
            "email": "priya.gupta@yahoo.com",
            "phone": "8765432109",
            "membershipType": "individual",
            "address": "123 Gandhi Nagar, Sector 15, New Delhi, Delhi 110001"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/memberships", 
                                       data=json.dumps(test_data))
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "name", "membershipType", "membershipNumber"]):
                    self.log_result("Membership Registration (POST /api/memberships)", True, 
                                  f"Membership created - Number: {data.get('membershipNumber')}")
                    return True
                else:
                    self.log_result("Membership Registration (POST /api/memberships)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Membership Registration (POST /api/memberships)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Membership Registration (POST /api/memberships)", False, 
                          f"Request error: {str(e)}")
            return False
    
    def test_volunteer_registration(self):
        """Test POST /api/volunteers endpoint"""
        test_data = {
            "name": "Amit Singh Chauhan",
            "email": "amit.chauhan@outlook.com",
            "phone": "7654321098",
            "skills": "Social media management, event organization, public speaking, community outreach",
            "availability": "Weekends and evenings, 10-15 hours per week"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/volunteers", 
                                       data=json.dumps(test_data))
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "name", "skills", "volunteerId"]):
                    self.log_result("Volunteer Registration (POST /api/volunteers)", True, 
                                  f"Volunteer registered - ID: {data.get('volunteerId')}")
                    return True
                else:
                    self.log_result("Volunteer Registration (POST /api/volunteers)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Volunteer Registration (POST /api/volunteers)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Volunteer Registration (POST /api/volunteers)", False, 
                          f"Request error: {str(e)}")
            return False
    
    def test_contact_form(self):
        """Test POST /api/contact endpoint"""
        test_data = {
            "name": "Sunita Rani Verma",
            "email": "sunita.verma@gmail.com",
            "subject": "Inquiry about local party activities in Mumbai",
            "message": "Namaste, I am interested in learning more about Swadeshi Hindu Party's activities in Mumbai region. How can I get involved in local community programs?"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", 
                                       data=json.dumps(test_data))
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "name", "subject", "message"]):
                    self.log_result("Contact Form (POST /api/contact)", True, 
                                  f"Contact message created - ID: {data.get('id')}")
                    return True
                else:
                    self.log_result("Contact Form (POST /api/contact)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Contact Form (POST /api/contact)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Contact Form (POST /api/contact)", False, 
                          f"Request error: {str(e)}")
            return False
    
    def test_stats_endpoint(self):
        """Test GET /api/stats endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/stats")
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["total_donations", "total_members", "total_volunteers", 
                               "total_contacts", "recent_activity"]
                if all(key in data for key in expected_keys):
                    self.log_result("Platform Statistics (GET /api/stats)", True, 
                                  f"Stats retrieved - Members: {data.get('total_members')}, "
                                  f"Donations: {data.get('total_donations')}")
                    return True
                else:
                    self.log_result("Platform Statistics (GET /api/stats)", False, 
                                  "Invalid response format", data)
                    return False
            else:
                self.log_result("Platform Statistics (GET /api/stats)", False, 
                              f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_result("Platform Statistics (GET /api/stats)", False, 
                          f"Request error: {str(e)}")
            return False
    
    def test_phone_validation(self):
        """Test phone number validation with invalid numbers"""
        invalid_phone_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",  # Invalid - doesn't start with 6,7,8,9
            "amount": "1000",
            "message": "Test donation"
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/donations", 
                                       data=json.dumps(invalid_phone_data))
            if response.status_code == 422:  # Validation error expected
                self.log_result("Phone Validation Test", True, 
                              "Phone validation working - rejected invalid number")
                return True
            else:
                self.log_result("Phone Validation Test", False, 
                              f"Expected validation error but got HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Phone Validation Test", False, 
                          f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Swadeshi Hindu Party Backend API Tests")
        print("=" * 60)
        
        # Test basic connectivity first
        if not self.test_health_check():
            print("❌ Basic health check failed - stopping tests")
            return False
        
        if not self.test_health_endpoint():
            print("❌ Database health check failed - stopping tests")
            return False
        
        # Test all form endpoints
        tests = [
            self.test_donation_submission,
            self.test_membership_registration,
            self.test_volunteer_registration,
            self.test_contact_form,
            self.test_stats_endpoint,
            self.test_phone_validation
        ]
        
        passed = 0
        total = len(tests) + 2  # +2 for health checks already done
        
        for test in tests:
            if test():
                passed += 1
        
        passed += 2  # Add the 2 health checks that passed
        
        print("\n" + "=" * 60)
        print(f"🏁 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("✅ All backend API tests PASSED!")
            return True
        else:
            print(f"❌ {total - passed} tests FAILED!")
            return False
    
    def get_summary(self):
        """Get test summary"""
        passed = sum(1 for r in self.results if r['success'])
        total = len(self.results)
        return {
            'total_tests': total,
            'passed': passed,
            'failed': total - passed,
            'success_rate': (passed / total * 100) if total > 0 else 0,
            'results': self.results
        }

if __name__ == "__main__":
    print("Testing Swadeshi Hindu Party Backend API")
    print(f"Backend URL: {BACKEND_URL}")
    print()
    
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Print detailed summary
    summary = tester.get_summary()
    print(f"\n📊 Final Summary:")
    print(f"   Success Rate: {summary['success_rate']:.1f}%")
    print(f"   Total Tests: {summary['total_tests']}")
    print(f"   Passed: {summary['passed']}")
    print(f"   Failed: {summary['failed']}")
    
    sys.exit(0 if success else 1)