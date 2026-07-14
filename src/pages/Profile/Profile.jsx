import React, { useEffect, useState } from "react";

const Profile = () => {
  const defaultProfile = {
    fullName: "John Smith",
    email: "john@tcscargo.com",
    phone: "03001234567",
    office: "Lahore",
    designation: "Administrator",
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile Updated Successfully!");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Profile & Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account information.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mt-4">
          {profile.fullName}
        </h2>

        <p className="text-gray-500">
          {profile.designation}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Office
              </label>

              <input
                type="text"
                name="office"
                value={profile.office}
                onChange={handleChange}
                placeholder="Enter Office"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Designation
              </label>

              <select
                name="designation"
                value={profile.designation}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Administrator</option>
                <option>Manager</option>
                <option>Operator</option>
                <option>Dispatcher</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3  transition rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;