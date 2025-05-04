import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoIosClose } from "react-icons/io";

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        physicalDescription: '',
        location: '',
        images: [],
        relationship: '',
        contactDetails: '',
        consentToShare: false, // Added consentToShare field
        blurContactDetails: false, // Added blurContactDetails field
    });

    const [showPopup, setShowPopup] = useState(false);

    const scrollToForm = () => {
        const formSection = document.getElementById("success-message");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth" });
        }
      };

    const [notification, setNotification] = useState({ message: "", type: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDrop = (acceptedFiles) => {
        if (formData.images.length + acceptedFiles.length > 3) {
            setShowPopup(true);
            return;
        }
        setFormData({ ...formData, images: [...formData.images, ...acceptedFiles] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add your form submission logic here
        setNotification({ message: "You'r request has been submited!", type: "success" });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
    });

    // setTimeout(() => {
    //     setNotification({ message: "", type: "" });
    //   }, 5000);

    return (
        <fieldset id='success-message' className="border-2 border-gray-300 p-4 relative rounded-xl max-w-4xl ">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-3xl font-bold my-3.5 text-left">Missing Person Details</h1>
                {notification.message && (
        <div 
          className={`p-4 mb-4 rounded ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}
                <div className="m-5">
                    <label htmlFor="name" className="block text-left m-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 p-2 rounded-l w-full focus:outline-none"
                        placeholder="Enter full name"
                    />
                </div>
                <div className="m-5">
                    <label htmlFor="age" className="block text-left m-2">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="border-2 border-gray-200 p-2 rounded-l w-full focus:outline-none"
                    />
                </div>
                <div className="m-5">
                    <label htmlFor="email" className="block text-left m-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-gray-200 p-2 rounded-l w-full focus:outline-none"
                        
                    />
                </div>
                <div className="m-5">
                    <label htmlFor="gender" className="block text-left m-2">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 p-2 hover:cursor-pointer rounded-2xl w-full focus:outline-none"
                    >
                        <option value="" disabled>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="m-5">
                    <label htmlFor="physicalDescription" className="block text-left m-2">Physical Description</label>
                    <textarea
                        id="physicalDescription"
                        name="physicalDescription"
                        value={formData.physicalDescription || ''}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 p-2 rounded-l w-full resize-none focus:outline-none"
                        placeholder="• Enter details like height, weight, skin tone, Distinctive features (e.g., scars, tattoos, traditional clothing)."
                    />
                </div>
                <h1 className="text-3xl font-bold my-3.5 text-left">Last Seen</h1>
                <div className="m-5">
                    <label htmlFor="location" className="block text-left m-2">Location</label>
                    <select
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 hover:cursor-pointer p-2 rounded-l w-full focus:outline-none">

                        <option value="" disabled>Select location</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                        <option value="houston">Houston</option>
                        <option value="miami">Miami</option>
                    </select>
                </div>
                <h1 className="text-3xl font-bold my-3.5 text-left">Upload Photos</h1>
                {showPopup && (
                    <div className="flex justify-between p-4 mb-4 rounded-xl bg-red-200 text-red-500 m-3">
                            <p>You can only upload 3 images.</p>
                            <IoIosClose  className='text-3xl cursor-pointer hover:text-red-700 
                            hover:scale-125 active:scale-100 transition-transform duration-800 ease-in-out ' onClick={()=>setShowPopup(false)}/>
                    </div>
                )}
                <div className="border-1 border-black-500 px-8 py-3 rounded-xl w-fit m-3">
                    <p className="text-left">Upload clear face/body shots (max 3).</p>
                </div>
                <div
                    {...getRootProps()}
                    className={`border-1 w-full md:w-80  h-28 p-4 rounded-l flex justify-center items-center m-3 hover:cursor-pointer ${
                        isDragActive ? 'bg-gray-200' : 'bg-gray-100'
                    }`}>
                        
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the images here...</p>
                    ) : (
                        <>
                            <p className="hidden md:block text-left">Drag and drop or Click</p>
                            <p className="block md:hidden text-left">Click to add image</p>
                        </>
                    )}
                </div>
                {formData.images.length > 0 && (
                    <ul className="mt-2 text-left m-3">
                        {formData.images.map((file, index) => (
                            <li key={index} className="text-green-500">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                )}

                
                
                <h1 className="text-3xl font-bold my-3.5 text-left">Submitter Information</h1>
                <div className="m-5">
                    <label htmlFor="relationship" className="block text-left m-2">Relationship to Missing Person</label>
                    <select
                        id="relationship"
                        name="relationship"
                        value={formData.relationship || ''}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 hover:cursor-pointer p-2 rounded-2xl w-full focus:outline-none">
                            
                        <option value="" disabled>Select relationship</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="spouse">Spouse</option>
                        <option value="friend">Friend</option>
                        <option value="colleague">Colleague</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="m-5">
                    <label htmlFor="contactDetails" className="block text-left m-2">Contact Details</label>
                    <input
                        type="tel"
                        id="contactDetails"
                        name="contactDetails"
                        value={formData.contactDetails || ''}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 p-2 rounded-l w-full focus:outline-none"
                        placeholder="+251"
                    />
                </div>
                <div className="m-5 ">
                    <label className="block text-left hover:cursor-pointer">
                        <input
                            type="checkbox"
                            name="consentToShare"
                            className='m-2'
                            required
                            checked={formData.consentToShare || false}
                            onChange={(e) =>
                                setFormData({ ...formData, consentToShare: e.target.checked })
                            }
                        />
                        I consent to share this information publicly on ReuniteHub
                    </label>
                </div>
                <div className="m-5">
                    <label className="block text-left hover:cursor-pointer">
                        <input
                            type="checkbox"
                            name="blurContactDetails"
                            className='m-2'
                            checked={formData.blurContactDetails || false}
                            onChange={(e) =>
                                setFormData({ ...formData, blurContactDetails: e.target.checked })}/>
                        Blur my contact details for safety
                    </label>
                </div>
                <button
                    type="submit"
                    className="p-4 bg-gray-700 text-white rounded-4xl m-4 hover:bg-blue-500 transform hover:scale-110 transition duration-150 active:scale-100  w-40 h-10 flex items-center justify-center hover:cursor-pointer" onSubmit={scrollToForm}>
                    Submit
                </button>
            </form>
        </fieldset>
    );
};

export default Form;