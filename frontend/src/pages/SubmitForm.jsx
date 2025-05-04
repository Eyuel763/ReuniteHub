import Form from '../Componenets/Form.jsx';
    const SubmitForm = () => {
        return (
            <>
            <div className="   m-9 mb-72  ">
                <h1 className="font-bold text-6xl text-center m-7 mb-16">Report a Missing Person</h1>
                <h2 className="text-4xl text-center"> Your report could save a life. Submit securely below or via SMS (805#).</h2>
                
            </div>
            <div className="m-9 md:mx-40 sm:ml-0 sm:mr-0 sm:mb-72 mb-72 ">
               <p className="text-gray-400">Form</p>
                <Form /> 
            </div>

            </>
        );
    };

export default SubmitForm;