import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
    {message}
    <button onClick={onClose} className="ml-2 text-white font-bold">
      X
    </button>
  </div>
);

const AlertsPanel = ({ alerts, setAlerts, centerMap }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    setToastMessage("Alert successfully deleted!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleEdit = (alert) => {
    setEditingId(alert.id);
    setEditName(alert.name);
  };

  const handleSaveEdit = (id) => {
    if (!editName.trim()) return;
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, name: editName.trim() } : alert
      )
    );
    setEditingId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const toggleStatus = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: alert.status === "verified" ? "unverified" : "verified",
            }
          : alert
      )
    );
  };

  const handleCenterMap = (position) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    centerMap(position);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl max-h-[600px] overflow-y-auto">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
        Active Alerts
      </h2>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-all"
          >
            <div
              className="flex-1"
              onClick={() => handleCenterMap(alert.position)}
            >
              {editingId === alert.id ? (
                <input
                  className="w-full border border-blue-300 px-4 py-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveEdit(alert.id)}
                />
              ) : (
                <>
                  <p className="font-medium text-lg text-blue-900">{alert.name}</p>
                  <p className="text-xs text-gray-600 italic">
                    {alert.position[0].toFixed(4)}, {alert.position[1].toFixed(4)}
                  </p>
                </>
              )}

              <p className="text-sm mt-2 text-gray-500">
                Status:{" "}
                <span
                  className={
                    alert.status === "verified"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {alert.status}
                </span>
              </p>
            </div>

            <div className="flex space-x-3 items-center">
              {editingId === alert.id ? (
                <>
                  <Check
                    size={20}
                    className="cursor-pointer text-green-500 hover:text-green-600"
                    onClick={() => handleSaveEdit(alert.id)}
                  />
                  <X
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-600"
                    onClick={handleCancelEdit}
                  />
                </>
              ) : (
                <>
                  <Pencil
                    size={20}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(alert)}
                  />
                  <Trash2
                    size={20}
                    className="cursor-pointer text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(alert.id)}
                  />
                  {alert.status === "unverified" ? (
                    <Check
                      size={20}
                      className="cursor-pointer text-green-500 hover:text-green-600"
                      onClick={() => toggleStatus(alert.id)}
                    />
                  ) : (
                    <X
                      size={20}
                      className="cursor-pointer text-gray-500 hover:text-gray-600"
                      onClick={() => toggleStatus(alert.id)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
