import React from 'react';

const PrivacyNotice = () => {
  return (
    <section className="p-6 bg-gray-200 rounded-md shadow-md max-w-3xl mx-auto mt-6">
      <p className="text-gray-700 text-sm">
        Location sharing is optional. Your data is encrypted in compliance with Ethiopian law to ensure your privacy.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        For more details, refer to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </p>
    </section>
  );
};

export default PrivacyNotice;
