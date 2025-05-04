import UserIcon from "./assets/user_group.png";
import Check from "./assets/checkmark.png";
import file from "./assets/Volunteer Handbook Template.pdf";
import { Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import RegVolunteer from "./components/RegVolunteer";
import VolunteerActivities from "./components/VolunteerActivities";







function Volunteer() {

  /*
<Routes>
  <Route path="/reg-volunteer" element={<RegVolunteer />} /> 
</Routes>;
*/
  
  
 /* const navigate = useNavigate();
  
  };*/
  

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file; 
    link.download = "Volunteer Handbook Template.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    return (
      <div className=" overflow-hidden  w-screen bg-white m-0 p-0 ">
        <div className="w-screen h-[400px] bg-gray-500 flex flex-col items-center justify-center">
          <h1>Become a lifeline</h1>
          <p>Help reunite families in Ethiopia</p>
        </div>
        <p className="text-black text-left text-3xl m-2 font-bold">
          How You Can Help
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-8 p-2 ">
          <div className="flex flex-col items-center  m-4">
            <img
              src={UserIcon}
              alt="User Icon"
              className="w-10 h-10 sm:w-20 sm:h-20"
            />
            <p className="font-bold text-lg">Search Teams</p>
            <p className="text-gray-500">
              Join organized searches in regions across Ethiopia to help find
              missing persons.
            </p>
          </div>
          <div className="flex flex-col items-center  m-4 ">
            <img
              src={UserIcon}
              alt="User Icon"
              className="w-10 h-10 sm:w-20 sm:h-20"
            />
            <p className="font-bold text-lg">Flyer Distribution</p>
            <p className="text-gray-500">
              Print and share missing persons posters in markets, schools, and
              kebeles.
            </p>
          </div>
          <div className="flex flex-col items-center  m-4">
            <img
              src={UserIcon}
              alt="User Icon"
              className="w-10 h-10 sm:w-20 sm:h-20"
            />
            <p className="font-bold text-lg">Social Media</p>
            <p className="text-gray-500">
              Amplifiy cases using hashtags like #FindThemEthiopia on social
              platforms.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-gray-100 w-full h-auto  flex flex-col items-start overflow-hidden p-4 m-2">
            <p className="text-black text-left text-2xl m-2 font-bold">
              Join Our Volunteer Network
            </p>
            <p className="text-gray-500 text-left m-2">
              Your time and skills can help reunite families. Sign up to recieve
              notifications about volunteer opportunities.
            </p>
            <button
              onClick={() => navigate("/reg-volunteer")}
              className="bg-blue-900 text-white w-full   "
            >
              Register as Volunteer
            </button>
          </div>
          <div className="bg-yellow-400 w-full h-auto m-2 rounded-lg ">
            <div className="bg-yellow-50 w-full h-auto flex flex-col items-start overflow-hidden p-6 ml-1 rounded-lg space-y-2">
              <p className="text-black text-left text-2xl m-2 font-bold">
                Training & Saftey
              </p>
              <p className="text-gray-500">
                <img src={Check} alt="Check" className="w-6 h-6  inline" />
                Never search alone. Always coordinate with local authorities.
              </p>
              <p className="text-gray-500">
                <img src={Check} alt="Check" className="w-6 h-6  inline" />
                Avoid high risk zones without proper guidance.
              </p>
              <p className="text-gray-500">
                <img src={Check} alt="Check" className="w-6 h-6  inline" />
                Respect local customs and engage community leaders.
              </p>
              <p className="text-gray-500">
                <img src={Check} alt="Check" className="w-6 h-6  inline" />
                Maintain confidentiality of sensitive case information.
              </p>
              <button
                onClick={handleDownload}
                className="bg-transparent text-blue-900 w-full border-2 border-blue-900 hover:bg-blue-900 hover:text-white rounded-lg p-2 "
              >
                Download Volunteer Handbook
              </button>
            </div>
          </div>
          <div>
            <VolunteerActivities />
          </div>
        </div>
      </div>
    );
}

export default Volunteer;

