import { FaUsers, FaCheck } from "react-icons/fa"; // Import icons from react-icons

function Volunteer() {
  return (
    <div className="overflow-hidden w-screen bg-white m-0 p-0">
      <div className="w-screen h-[500px] bg-gray-500 flex flex-col items-center justify-center">
        <h1>Become a lifeline</h1>
        <p>Help reunite families in Ethiopia</p>
      </div>
      <p className="text-black text-left text-3xl m-2 font-bold">
        How You Can Help
      </p>

      <div className="flex flex-row justify-around text-black p-4">
        <div className="flex flex-col items-center justify-center m-4">
          <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-full">
            <FaUsers className="text-white text-2xl" /> {/* Icon for Search Teams */}
          </div>
          <p className="font-bold text-lg">Search Teams</p>
          <p className="text-gray-500">
            Join organized searches in regions across Ethiopia to help find
            missing persons.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center m-4">
          <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-full">
            <FaUsers className="text-white text-2xl" /> {/* Icon for Flyer Distribution */}
          </div>
          <p className="font-bold text-lg">Flyer Distribution</p>
          <p className="text-gray-500">
            Print and share missing persons posters in markets, schools, and
            kebeles.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center m-4">
          <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-full">
            <FaUsers className="text-white text-2xl" /> {/* Icon for Social Media */}
          </div>
          <p className="font-bold text-lg">Social Media</p>
          <p className="text-gray-500">
            Amplify cases using hashtags like #FindThemEthiopia on social
            platforms.
          </p>
        </div>
      </div>
      <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 w-full h-auto flex flex-col items-start overflow-hidden p-4 m-2">
          <p className="text-black text-left text-2xl m-2 font-bold">
            Join Our Volunteer Network
          </p>
          <p className="text-gray-500 text-left m-2">
            Your time and skills can help reunite families. Sign up to receive
            notifications about volunteer opportunities.
          </p>
          <button className="bg-blue-900 text-white w-full p-2 rounded-md">
            Register as Volunteer
          </button>
        </div>
        <div className="bg-yellow-400 w-full h-auto m-2 rounded-lg">
          <div className="bg-yellow-50 w-full h-auto flex flex-col items-start overflow-hidden p-2 ml-1 rounded-lg">
            <p className="text-black text-left text-2xl m-2 font-bold">
              Training & Safety
            </p>
            <p className="text-gray-500 flex items-center">
              <FaCheck className="text-green-500 w-6 h-6 mr-2" />
              Never search alone. Always coordinate with local authorities.
            </p>
            <p className="text-gray-500 flex items-center">
              <FaCheck className="text-green-500 w-6 h-6 mr-2" />
              Avoid high-risk zones without proper guidance.
            </p>
            <p className="text-gray-500 flex items-center">
              <FaCheck className="text-green-500 w-6 h-6 mr-2" />
              Respect local customs and engage community leaders.
            </p>
            <p className="text-gray-500 flex items-center">
              <FaCheck className="text-green-500 w-6 h-6 mr-2" />
              Maintain confidentiality of sensitive case information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;