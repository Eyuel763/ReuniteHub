import React, { useEffect, useState } from "react";

const VolunteerActivities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("/activities.json")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);


  const activityTypes = ["All Opportunities", ...new Set(activities.map((a) => a.type))];

  const filteredActivities =
    selectedType === "All Opportunities"
      ? activities
            : activities.filter((a) => a.type === selectedType);
    
    
    
  //Handle Join
    
    const username = "john_doe"; // Replace with  user context

    const handleJoin = (activityId) => {
      const payload = {
        username,
        activityId,
      };

        fetch("https://your-backend-api.com/join",  // backend api
            {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to join");
          alert("Successfully joined this effort!");
        })
        .catch((err) => {
          console.error(err);
          alert("Error joining the effort.");
        });
    };


  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4 ">Volunteer Activities</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {activityTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedType === type
                ? "bg-blue-500 text-white border-none "
                : "bg-white text-gray-700  "
            }`}
          >
            {type}
          </button>
        ))}
      </div>
        <div className="flex flex-col items-start m-1">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="mb-4 p-4 border rounded-xl shadow-sm bg-white w-full"
          >
            <p className="bg-blue-500 text-white  font-bold text-sm mb-2 p-2 rounded-full inline-block">
              {activity.type}
            </p>
            <h3 className="text-xl font-bold">{activity.title}</h3>

            <p className="mb-2">{activity.description}</p>
            <p>{activity.date}</p>
            <p>{activity.location}</p>
            <p>
              {activity.moderator.name} :{activity.moderator.contact}
            </p>

            <button
              onClick={() => handleJoin(activity.id)}
              className="mt-4 px-4 py-2 w-full bg-blue-900 text-white rounded "
            >
              Join This Effort
            </button>
        </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerActivities;
