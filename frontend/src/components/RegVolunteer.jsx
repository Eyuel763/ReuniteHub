import React, { useState } from "react";

const regions = {
  AddisAbaba: [
    "Addis Ketema",
    "Akaki Kality",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe Keranio",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka",
  ],
  Oromia: ["Adama", "Jimma", "Shashamane", "Nekemte"],
  Amhara: ["Bahir Dar", "Gondar", "Debre Birhan", "Dessie"],
  Tigray: ["Mekelle", "Axum", "Shire", "Adigrat"],
  SNNPR: ["Hawassa", "Wolaita Sodo", "Arba Minch"],
  Somali: ["Jigjiga", "Gode", "Dollo"],
  Afar: ["Semera", "Asayita", "Gewane"],
  BenishangulGumuz: ["Assosa", "Metekel"],
  Gambela: ["Gambela", "Itang"],
  Harari: ["Harar"],
  DireDawa: ["Dire Dawa"],
};

const RegVolunteer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    region: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setFormData({
      ...formData,
      region: selectedRegion,
      city: "", 
    });
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

  const regionKeys = Object.keys(regions);
  const cities = formData.region ? regions[formData.region] : [];

  return (
    <div className="w-screen min-h-screen p-6 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg text-black font-semibold mb-4">
        Volunteer Registration Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white  max-w-[700px] m-2 p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          onChange={handleChange}
          className="w-full p-3 border rounded-md text-black bg-gray-100"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          onChange={handleChange}
          className="w-full p-3 border rounded-md text-black bg-gray-100"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          onChange={handleChange}
          className="w-full p-3 border rounded-md text-black bg-gray-100"
          required
        />
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="w-full p-3 border rounded-md text-black bg-gray-100"
        />

       
        <select
          name="region"
          value={formData.region}
          onChange={handleRegionChange}
          className="w-full p-3 border rounded-md bg-gray-100 text-black"
          required
        >
          <option value="">Select Region *</option>
          {regionKeys.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

      
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 text-black"
          required
          disabled={!formData.region}
        >
          <option value="">Select City *</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Volunteer Skill Dropdown */}
        <select
          name="volunteerSkill"
          value={formData.volunteerSkill || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 text-black"
          required
        >
          <option value="">Select Volunteer Skill *</option>
          <option value="Navigation">Navigation & Map Reading</option>
          <option value="SearchAndRescue">Search & Rescue</option>
          <option value="FirstAid">First Aid / CPR</option>
          <option value="PublicAwareness">
            Public Awareness / Flier Distribution
          </option>
          <option value="CommunityOutreach">Community Outreach</option>
          <option value="SocialMedia">Social Media / Digital Outreach</option>
          <option value="PosterDesign">Poster Design</option>
          <option value="Translation">
            Translation & Multilingual Communication
          </option>
          <option value="DataEntry">Data Entry / Admin</option>
          <option value="TeamCoordination">Team Coordination / Support</option>
        </select>

        <button
          type="submit"
          className="w-full bg-sky-900 text-white py-3 rounded-md hover:bg-sky-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegVolunteer;
