"use client";
import React, { FormEvent, useState } from "react";

const Organization = () => {
  const [organization, setOrganization] = useState({
    id: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({
      ...organization,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Organization: ", organization);

    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
      });
      const data = await response.json();
      console.log("sucess: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={organization.name}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Organization;
