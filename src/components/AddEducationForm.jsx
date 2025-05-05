import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEducationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        year: "",
        title: "",
        institution: "",
        description: "",
        duration: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/education", formData);
            alert("Education added successfully!");
            navigate("/dashboard/education"); // redirect after submission
        } catch (err) {
            console.error("Error adding education:", err);
            alert("Failed to add education.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded mt-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Education</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Year</label>
                    <input
                        type="date"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., B.Tech in CSE"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Institution</label>
                    <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 2018 - 2022"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Add Education
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEducationForm;
