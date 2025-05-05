 

const Conclusion = () => {
  return (
    <div>
      <div className="bg-gray-200 rounded-xl m-4 p-2">
        <p className="text-black text-left text-2xl m-2 font-bold">
          Contact & Support
        </p>
        <div className=" bg-gray-200 border rounded-xl text-gray-800 p-2 m-2">
          <p className="">
            <ion-icon name="call-outline"></ion-icon> Call +2519123456
          </p>
          <p className="">
            <ion-icon name="mail-outline"></ion-icon> Email:
            Volunteer@ReuniteHub.et
          </p>
          <p className="">
            <ion-icon name="alert-circle-outline"></ion-icon> Text "VOLUNTEER" to 805# for updates
          </p>
        </div>
      </div>
      <div className="m-4 p-2 bg-white rounded-xl">
        <p className="text-black text-left text-2xl m-2 font-bold">
                  Our Partners
              </p>
              <div className=" rounded-xl text-gray-800 p-2 m-2">
                  <p>
                      We work closely with Ethiopian Red Cross, Ministry of Women in Social Affairs and IOM Ethiopia to coordinate social efforts.
                  </p>
              </div> 
      </div>
    </div>
  );
};
export default Conclusion;
