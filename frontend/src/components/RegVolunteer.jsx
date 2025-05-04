import React, { useState } from "react";

const RegVolunteer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://your-api.com/volunteer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegVolunteer;
