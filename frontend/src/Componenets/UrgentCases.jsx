import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const mockUrgentCases = [
  {
    missing_person_id: 1,
    name: "Sarah Johnson",
    age: 28,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    last_seen_location: "Central Park, New York",
    last_seen_date: "2023-05-15T12:00:00Z",
    status: "urgent",
    description: "Last seen wearing blue jeans and a white t-shirt. Has a tattoo of a butterfly on her right wrist.",
    reported_by: "Michael Johnson (brother)",
    created_at: "2023-05-16T09:30:00Z",
  },
  {
    missing_person_id: 2,
    name: "David Chen",
    age: 15,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    last_seen_location: "Downtown Seattle bus station",
    last_seen_date: "2023-05-18T17:30:00Z",
    status: "urgent",
    description: "High school student missing after school. Carrying a black backpack with red stripes.",
    reported_by: "Lisa Chen (mother)",
    created_at: "2023-05-18T20:15:00Z",
  },
  {
    missing_person_id: 3,
    name: "Maria Garcia",
    age: 72,
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    last_seen_location: "Oakwood Retirement Home",
    last_seen_date: "2023-05-20T10:00:00Z",
    status: "urgent",
    description: "Alzheimer's patient. Last seen wearing purple dress and white sweater.",
    reported_by: "Oakwood Staff",
    created_at: "2023-05-20T11:45:00Z",
  },
  {
    missing_person_id: 4,
    name: "James Wilson",
    age: 8,
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    last_seen_location: "Riverside Elementary School playground",
    last_seen_date: "2023-05-21T15:30:00Z",
    status: "urgent",
    description: "Third grader missing after school. Wearing a blue superhero backpack.",
    reported_by: "School Administration",
    created_at: "2023-05-21T17:00:00Z",
  },
  {
    missing_person_id: 5,
    name: "Emily Rodriguez",
    age: 24,
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    last_seen_location: "Midtown Cafe, Chicago",
    last_seen_date: "2023-05-22T19:00:00Z",
    status: "urgent",
    description: "Did not return home from work. Last seen wearing black pants and a red blouse.",
    reported_by: "Carlos Rodriguez (husband)",
    created_at: "2023-05-23T08:20:00Z",
  },
];

const UrgentCases = () => {
  const [urgentCases, setUrgentCases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const fetchUrgentCases = async () => {
    try {
      // Use mock data in development
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock data");
        setUrgentCases(mockUrgentCases.slice(0, 5));
        return;
      }

      // Real API call for production
      const response = await axios.get("http://127.0.0.1:8000/api/missing_persons/urgent-reports/");
      setUrgentCases(response.data.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch urgent cases:", error);

      // Fallback to mock data if API fails
      console.log("Falling back to mock data due to API error");
      setUrgentCases(mockUrgentCases.slice(0, 5));
      setError("Failed to load real data. Showing mock examples instead.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrgentCases();
  }, []);

  if (loading) return <p className="text-center py-8">Loading urgent cases...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="urgent-cases-container relative p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-bold inline-block">Urgent Cases</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="text-gray-700" size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight className="text-gray-700" size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {urgentCases.map((caseItem) => (
          <div
            key={caseItem.missing_person_id}
            className="card bg-white shadow-md rounded-lg overflow-hidden w-64 flex-shrink-0 hover:shadow-lg transition-shadow"
          >
            <img
              src={caseItem.photo}
              alt={caseItem.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{caseItem.name}, {caseItem.age}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{caseItem.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Last seen: {caseItem.last_seen_location}
              </p>
              <p className="text-sm text-gray-500">
                Reported by: {caseItem.reported_by}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentCases;