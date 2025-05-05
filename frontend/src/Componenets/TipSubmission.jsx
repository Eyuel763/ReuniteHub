import React, { useState } from "react";  // <-- Correct import

const TipSubmission = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can expand this)
    if (!name || !phone || !description) {
      alert("Please fill in all fields.");
      return;
    }

    // Process the tip submission (For now, just log it)
    console.log("Tip Submitted:", { name, phone, description });

    // Set submitted state to show a success message
    setIsSubmitted(true);

    // Optionally, reset form
    setName("");
    setPhone("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit a Tip</h2>
      
      {isSubmitted ? (
        <div className="text-green-600">Thank you for your tip! We will review it shortly.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Your Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description of the Tip</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Submit Tip
          </button>
        </form>
      )}
    </div>
  );
};

export default TipSubmission;
