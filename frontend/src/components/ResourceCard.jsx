import React from "react";
import {
  PhoneIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ScaleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

// Icon mapping based on the type of resource
const typeIcons = {
  guide: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
  contact: <PhoneIcon className="h-6 w-6 text-green-500" />,
  legal: <ScaleIcon className="h-6 w-6 text-indigo-500" />,
  "mental-health": <HeartIcon className="h-6 w-6 text-red-500" />,
};

const typeColors = {
  guide: "blue",
  contact: "green",
  legal: "indigo",
  "mental-health": "red",
};

const ResourceCard = ({ resource }) => {
  const handleClick = () => {
    if (resource.url) {
      window.open(resource.url, "_blank");
    } else if (resource.phone) {
      window.location.href = `tel:${resource.phone}`;
    }
  };

  // Handle phone number copy to clipboard
  const handleCopyPhoneNumber = () => {
    if (resource.phone) {
      navigator.clipboard.writeText(resource.phone)
        .then(() => {
          alert('Phone number copied to clipboard!');
        })
        .catch((err) => {
          alert('Failed to copy phone number: ', err);
        });
    }
  };

  return (
    <div className="resource-card" onClick={handleClick}>
      <div
        className={`icon-container bg-${typeColors[resource.type]}-100`}
      >
        {typeIcons[resource.type]}
      </div>
      <div className="resource-card-content">
        <div className="resource-card-header">
          <h3 className="resource-card-title">{resource.title}</h3>
          <span
            className={`resource-card-tag text-${typeColors[resource.type]}-600 bg-${typeColors[resource.type]}-100`}
          >
            {resource.type.replace("-", " ")}
          </span>
        </div>
        <p className="resource-card-description">{resource.description}</p>
        <div className="resource-card-footer">
          {resource.phone && (
            <div
              className="resource-card-phone flex items-center whitespace-nowrap"  // Prevent text wrapping
              onClick={handleCopyPhoneNumber}  // Added click event to copy phone number
              style={{ cursor: 'pointer' }}
            >
              <PhoneIcon className="h-4 w-4 mr-2" />  {/* Added margin-right for spacing */}
              <span>{resource.phone}</span>
            </div>
          )}

          <div className="resource-card-languages">
            {resource.languages.map((lang, idx) => (
              <span key={idx} className="resource-card-language">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ResourceCard;
