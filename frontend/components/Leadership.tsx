'use client'

export default function Leadership() {
  const leaders = [
    {
      name: "Matendra Singh",
      position: "President",
      image: "/assets/matendra singh.jpg",
      bio: "A visionary leader dedicated to building a self-reliant and culturally rooted India through the five pillars of progress."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Leadership
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dedicated leaders committed to serving the nation with integrity and vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {leader.name}
              </h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium mb-3">
                {leader.position}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}