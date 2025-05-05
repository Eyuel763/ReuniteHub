import React, { useState, useRef } from "react";
import MapSection from "../Componenets/MapSection";
import AlertsPanel from "../Componenets/AlertsPanel";
import TipSubmission from "../Componenets/TipSubmission";
import IconLegend from "../Componenets/IconLegend";
import SearchParty from "../Componenets/SearchParty";
import PrivacyNotice from "../Componenets/PrivacyNotice";
import PartnerFeed from "../Componenets/PartnerFeed";

const AlertsMaps = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "Initial Alert",
      position: [9.03, 38.74],
      status: "verified",
    },
  ]);

  const mapRef = useRef();

  const centerMap = (coords) => {
    mapRef.current?.centerMapTo(coords);
  };

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 text-center">
        Alerts and Map Dashboard
      </h1>
      <MapSection ref={mapRef} markers={alerts} setMarkers={setAlerts} />
      <IconLegend />
      <AlertsPanel alerts={alerts} setAlerts={setAlerts} centerMap={centerMap} />
      <TipSubmission />
      <SearchParty />
      <PartnerFeed />
      <PrivacyNotice />
    </div>
  );
};

export default AlertsMaps;
