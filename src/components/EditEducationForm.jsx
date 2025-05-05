import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEducationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        year: "",
        title: "",
        description: "",
        institution: "",
        duration: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchEducation = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/education/get/${id}`);
            const { year, title, description, institution, duration } = res.data.education;
            setFormData({
                year: new Date(year).toISOString().split("T")[0],
                title,
                description,
                institution,
                duration
            });
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch education:", err);
            alert("Failed to load education data.");
            navigate("/dashboard/education");
        }
    };

    useEffect(() => {
        fetchEducation();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/education/${id}`, formData);
            alert("Education updated successfully!");
            navigate("/dashboard/education");
        } catch (err) {
            console.error("Failed to update education:", err);
            alert("Failed to update education.");
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">✏️ Edit Education</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
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
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/education")}
                        className="text-gray-600 underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEducationForm;
