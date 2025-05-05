import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SuccessStories = () => {
  const successStories = [
    {
      id: 1,
      title: "Lost Child Reunited With Family",
      summary: "5-year-old Ethan found safe after 48-hour search",
      fullStory: "Ethan wandered away from his home in Portland and was missing for two days. Thanks to community volunteers and the Amber Alert system, he was found playing in a park 3 miles away. The family is grateful to everyone who helped in the search effort that involved over 200 volunteers and local law enforcement.",
      date: "May 10, 2023",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    {
      id: 2,
      title: "Alzheimer's Patient Found Safe",
      summary: "72-year-old Margaret returned home after 36 hours",
      fullStory: "Margaret, who suffers from Alzheimer's, wandered away from her care facility during a routine walk. A local shop owner recognized her from our alert system and immediately contacted authorities. She was found in good health, just 2 miles from the facility, and was happily reunited with her family who praised the quick response of the community.",
      date: "April 22, 2023",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
    },
    {
      id: 3,
      title: "Missing Teenager Located",
      summary: "16-year-old Alex found safe after week-long search",
      fullStory: "After running away from home following an argument with parents, 16-year-old Alex was found safe at a friend's house in a neighboring town. The family worked closely with counselors and our organization to improve communication. Now back home, Alex is attending family therapy sessions and doing well in school.",
      date: "March 15, 2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    }
  ];

  const [expandedStory, setExpandedStory] = useState(null);

  const toggleStory = (id) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h1>
        <p className="text-xl text-gray-600">Heartwarming reunions made possible by our community</p>
      </div>

      <div className="space-y-16">
        {successStories.map((story) => (
          <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-96 w-full">
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{story.title}</h2>
                  <p className="text-xl text-gray-200">{story.summary}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">{story.date}</span>
                <button 
                  onClick={() => toggleStory(story.id)}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  {expandedStory === story.id ? (
                    <>
                      Read Less <FiChevronUp className="ml-1" />
                    </>
                  ) : (
                    <>
                      Read More <FiChevronDown className="ml-1" />
                    </>
                  )}
                </button>
              </div>

              {expandedStory === story.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-700 whitespace-pre-line">{story.fullStory}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;