import React, { useState, useEffect } from "react";
import axios from "axios";

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
];

const UrgentCases = () => {
  const [urgentCases, setUrgentCases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="urgent-cases-container">
      <h1 className="text-3xl font-bold mb-6">Urgent Cases</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {urgentCases.map((caseItem) => (
          <div
            key={caseItem.missing_person_id}
            className="card bg-white shadow-md rounded-lg overflow-hidden w-64"
          >
            <img
              src={caseItem.photo}
              alt={caseItem.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{caseItem.name}</h2>
              <p className="text-sm text-gray-600">{caseItem.description}</p>
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