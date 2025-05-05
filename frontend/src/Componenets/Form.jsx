import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoIosClose } from "react-icons/io";

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        physicalDescription: '',
        date: '',
        images: [],
        relationship: '',
        contact_info: '',
        consentToShare: false,
    });

    const[loding, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const scrollToForm = () => {
        const formSection = document.getElementById("success-message");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const removeImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        scrollToForm(); // Scroll to the form section
    
        // Introduce a delay before proceeding with the submission
        setTimeout(async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/missing_personsreports',
                    {

                    method: 'POST', // Use POST to send data
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON content type
                    },
                    body: JSON.stringify(formData), // Convert form data to JSON
                });
    
                setLoading(false); // Stop loading after the delay and submission
    
                if (response.ok) {
                    const result = await response.json();
                    console.log('Form Data Submitted Successfully:', result);
                    setNotification({ message: "Your request has been submitted!", type: "success" });
                } else {
                    console.error('Failed to submit form:', response.statusText);
                    setNotification({ message: "Failed to submit your request. Please try again.", type: "error" });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setNotification({ message: "An error occurred. Please try again.", type: "error" });
            }
        }, 2000); // Delay of 2000ms (2 seconds)
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
    });


    return (
        <>
            {!loding ? (
                <fieldset id='success-message' className="border-2 shadow-2xl border-gray-300 p-4 relative rounded-xl max-w-4xl ">
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
                            <label htmlFor="name" className="block font-bold text-left m-2">Full Name</label>
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
                            <label htmlFor="age" className="block font-bold text-left m-2">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                required
                                value={formData.age}
                                onChange={handleChange}
                                className="border-2 border-gray-200 p-2 rounded-l w-full focus:outline-none"
                            />
                        </div>
                        <div className="m-5">
                            <label htmlFor="gender" className="block font-bold text-left m-2">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleChange}
                                required
                                className="border-2 border-gray-200 p-2 hover:cursor-pointer rounded-2xl w-full focus:outline-none">
                                <option value="" disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="m-5">
                            <label htmlFor="physicalDescription" className="block font-bold text-left m-2">Physical Description</label>
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
                            <label htmlFor="location" className="block font-bold text-left m-2">Location</label>
                            <select
                                id="location"
                                name="location"
                                value={formData.location || ''}
                                onChange={handleChange}
                                required
                                className="border-2 border-gray-200 hover:cursor-pointer p-2 rounded-l w-full focus:outline-none">

                                <option value="" disabled>Select location</option>
                                <option value="addis-ababa">Addis Ababa</option>
                                <option value="dire-dawa">Dire Dawa</option>
                                <option value="mekelle">Mekelle</option>
                                <option value="bahir-dar">Bahir Dar</option>
                                <option value="gondar">Gondar</option>
                                <option value="hawassa">Hawassa</option>
                                <option value="jimma">Jimma</option>
                                <option value="harar">Harar</option>
                                <option value="adama">Adama</option>
                                <option value="debre-birhan">Debre Birhan</option>
                            </select>
                        </div>
                        <div className="m-5">
                            <label htmlFor="location" className="block font-bold text-left m-2">Location</label>
                            <input type='date'
                                id="date"
                                name="date"
                                value={formData.date || ''}
                                onChange={handleChange}
                                required
                                className="border-2 border-gray-200 hover:cursor-pointer p-2 rounded-l w-full focus:outline-none"/>
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
                            className={`border-1 w-full md:w-full  h-36 p-4 rounded-xl flex justify-center items-center m-3 hover:cursor-pointer ${
                                isDragActive ? 'bg-gray-500' : 'bg-blue-100'
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
                                    <li key={index} className="text-green-500 bg-green-50 rounded-l flex items-center justify-between m-1.5">
                                        <span>{file.name}</span>
                                        <IoIosClose
                                            className="text-red-500 text-4xl cursor-pointer hover:text-red-700 transition-transform transform hover:scale-150"
                                            onClick={() => removeImage(index)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        <h1 className="text-3xl font-bold my-3.5 text-left">Submitter Information</h1>
                        <div className="m-5">
                            <label htmlFor="relationship" className="block font-bold text-left m-2">Relationship to Missing Person</label>
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
                            <label htmlFor="contact_info" className="block font-bold text-left m-2">Your Contact Details</label>
                            <input
                                type="tel"
                                id="contact_info"
                                name="contact_info"
                                value={formData.contact_info || ''}
                                onChange={handleChange}
                                required
                                className="border-2 border-gray-300 p-2 rounded-l w-full focus:outline-none"
                                placeholder="+251"
                                pattern="^\+?[0-9]*$"
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
                        <button
                            type="submit"
                            className={`p-4 text-white rounded-4xl m-4 w-40 h-10 flex items-center justify-center  ${
                                formData.consentToShare
                                    ? 'bg-gray-700 hover:bg-blue-500 transform hover:scale-110 transition duration-150 active:scale-100 hover:cursor-pointer'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!formData.consentToShare} >
                            Submit
                        </button>
                    </form>
                </fieldset>):(
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-black-700 "></div>
                    </div>
            )}
        </>
        
    );
};

export default Form;