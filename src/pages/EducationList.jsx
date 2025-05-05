import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EducationList = () => {
    const [educationData, setEducationData] = useState([]);
    const navigate = useNavigate();

    const fetchEducation = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/education/get");
            setEducationData(res.data.education);
        } catch (err) {
            console.error("Error fetching education data:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this education?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/education/${id}`);
            setEducationData((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error("Error deleting education:", err);
            alert("Failed to delete education");
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-800">🎓 Education Timeline</h1>
                <button
                    onClick={() => navigate("/dashboard/education/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Education
                </button>
            </div>

            {educationData?.length === 0 ? (
                <p className="text-center text-gray-500">No education records found.</p>
            ) : (
                <div className="space-y-6">
                    {educationData?.map((edu) => (
                        <div
                            key={edu._id}
                            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 relative"
                        >
                            <div className="absolute top-4 right-4 text-sm text-gray-400">
                                {new Date(edu.year).getFullYear()}
                            </div>
                            <h2 className="text-xl font-semibold text-blue-700">{edu.title}</h2>
                            <p className="text-sm text-gray-600 font-medium mt-1">{edu.institution}</p>
                            <p className="text-gray-700 mt-2">{edu.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                Duration: <span className="font-medium">{edu.duration}</span>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => navigate(`/dashboard/education/edit/${edu._id}`)}
                                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(edu._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducationList;
