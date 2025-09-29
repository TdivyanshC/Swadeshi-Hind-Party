from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional, Literal
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Swadeshi Hindu Party API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic Models
class BaseSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")

class DonationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    amount: str = Field(..., min_length=1)
    message: Optional[str] = Field(None, max_length=1000)

    @validator('phone')
    def validate_phone(cls, v):
        # Remove any spaces or special characters
        cleaned = ''.join(filter(str.isdigit, v))
        if len(cleaned) != 10 or not cleaned.startswith(('6', '7', '8', '9')):
            raise ValueError('Phone number must be a valid 10-digit Indian mobile number')
        return cleaned

class Donation(BaseSubmission):
    amount: str
    message: Optional[str] = None

class MembershipCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    membershipType: Literal['individual', 'family', 'student']
    address: str = Field(..., min_length=10, max_length=500)

    @validator('phone')
    def validate_phone(cls, v):
        cleaned = ''.join(filter(str.isdigit, v))
        if len(cleaned) != 10 or not cleaned.startswith(('6', '7', '8', '9')):
            raise ValueError('Phone number must be a valid 10-digit Indian mobile number')
        return cleaned

class Membership(BaseSubmission):
    membershipType: str
    address: str
    membershipNumber: Optional[str] = None

class VolunteerCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    skills: str = Field(..., min_length=10, max_length=1000)
    availability: str = Field(..., min_length=5, max_length=200)

    @validator('phone')
    def validate_phone(cls, v):
        cleaned = ''.join(filter(str.isdigit, v))
        if len(cleaned) != 10 or not cleaned.startswith(('6', '7', '8', '9')):
            raise ValueError('Phone number must be a valid 10-digit Indian mobile number')
        return cleaned

class Volunteer(BaseSubmission):
    skills: str
    availability: str
    volunteerId: Optional[str] = None

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="unread")

# Helper function to generate membership number
def generate_membership_number() -> str:
    import time
    return f"SHP{int(time.time())}"

# Helper function to generate volunteer ID
def generate_volunteer_id() -> str:
    import time
    return f"VOL{int(time.time())}"

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Swadeshi Hindu Party API", "status": "active"}

@api_router.post("/donations", response_model=Donation)
async def create_donation(donation_data: DonationCreate):
    """Create a new donation submission"""
    try:
        # Create donation object
        donation = Donation(
            name=donation_data.name,
            email=donation_data.email,
            phone=donation_data.phone,
            amount=donation_data.amount,
            message=donation_data.message
        )
        
        # Store in database
        donation_dict = donation.dict()
        await db.donations.insert_one(donation_dict)
        
        logger.info(f"New donation created: {donation.id} for amount: ₹{donation.amount}")
        return donation
        
    except Exception as e:
        logger.error(f"Error creating donation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create donation")

@api_router.get("/donations", response_model=List[Donation])
async def get_donations(skip: int = 0, limit: int = 100):
    """Get list of donations"""
    try:
        donations = await db.donations.find().skip(skip).limit(limit).sort("created_at", -1).to_list(length=None)
        return [Donation(**donation) for donation in donations]
    except Exception as e:
        logger.error(f"Error fetching donations: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch donations")

@api_router.post("/memberships", response_model=Membership)
async def create_membership(membership_data: MembershipCreate):
    """Create a new membership application"""
    try:
        # Create membership object
        membership = Membership(
            name=membership_data.name,
            email=membership_data.email,
            phone=membership_data.phone,
            membershipType=membership_data.membershipType,
            address=membership_data.address,
            membershipNumber=generate_membership_number()
        )
        
        # Store in database
        membership_dict = membership.dict()
        await db.memberships.insert_one(membership_dict)
        
        logger.info(f"New membership created: {membership.id} - {membership.membershipType}")
        return membership
        
    except Exception as e:
        logger.error(f"Error creating membership: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create membership")

@api_router.get("/memberships", response_model=List[Membership])
async def get_memberships(skip: int = 0, limit: int = 100):
    """Get list of memberships"""
    try:
        memberships = await db.memberships.find().skip(skip).limit(limit).sort("created_at", -1).to_list(length=None)
        return [Membership(**membership) for membership in memberships]
    except Exception as e:
        logger.error(f"Error fetching memberships: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch memberships")

@api_router.post("/volunteers", response_model=Volunteer)
async def create_volunteer(volunteer_data: VolunteerCreate):
    """Create a new volunteer application"""
    try:
        # Create volunteer object
        volunteer = Volunteer(
            name=volunteer_data.name,
            email=volunteer_data.email,
            phone=volunteer_data.phone,
            skills=volunteer_data.skills,
            availability=volunteer_data.availability,
            volunteerId=generate_volunteer_id()
        )
        
        # Store in database
        volunteer_dict = volunteer.dict()
        await db.volunteers.insert_one(volunteer_dict)
        
        logger.info(f"New volunteer registered: {volunteer.id}")
        return volunteer
        
    except Exception as e:
        logger.error(f"Error creating volunteer: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create volunteer registration")

@api_router.get("/volunteers", response_model=List[Volunteer])
async def get_volunteers(skip: int = 0, limit: int = 100):
    """Get list of volunteers"""
    try:
        volunteers = await db.volunteers.find().skip(skip).limit(limit).sort("created_at", -1).to_list(length=None)
        return [Volunteer(**volunteer) for volunteer in volunteers]
    except Exception as e:
        logger.error(f"Error fetching volunteers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch volunteers")

@api_router.post("/contact", response_model=Contact)
async def create_contact(contact_data: ContactCreate):
    """Create a new contact message"""
    try:
        # Create contact object
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message
        )
        
        # Store in database
        contact_dict = contact.dict()
        await db.contacts.insert_one(contact_dict)
        
        logger.info(f"New contact message: {contact.id} - {contact.subject}")
        return contact
        
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create contact message")

@api_router.get("/contact", response_model=List[Contact])
async def get_contacts(skip: int = 0, limit: int = 100):
    """Get list of contact messages"""
    try:
        contacts = await db.contacts.find().skip(skip).limit(limit).sort("created_at", -1).to_list(length=None)
        return [Contact(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

@api_router.get("/stats")
async def get_stats():
    """Get platform statistics"""
    try:
        stats = {
            "total_donations": await db.donations.count_documents({}),
            "total_members": await db.memberships.count_documents({}),
            "total_volunteers": await db.volunteers.count_documents({}),
            "total_contacts": await db.contacts.count_documents({}),
            "recent_activity": await db.donations.count_documents({
                "created_at": {"$gte": datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)}
            })
        }
        return stats
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await client.admin.command('ping')
        return {"status": "healthy", "database": "connected", "timestamp": datetime.utcnow()}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)