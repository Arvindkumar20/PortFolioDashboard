import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSkillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [skills, setSkills] = useState([{ name: "", level: "", icon: "" }]);
    const [loading, setLoading] = useState(true);

    // Fetch skill data
    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/skill/${id}`);
                setCategory(res.data.skill.category);
                setSkills(res.data.skill.skills);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch skill:", err);
                setLoading(false);
            }
        };
        fetchSkill();
    }, [id]);

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const addSkillField = () => {
        setSkills([...skills, { name: "", level: "", icon: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/skill/${id}`, { category, skills });
            alert("Skill updated successfully!");
            navigate("/dashboard/skill");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update skill.");
        }
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Skill Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="space-y-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center bg-gray-50 p-3 rounded">
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                                placeholder="Skill Name"
                                className="border px-2 py-1 rounded w-full"
                                required
                            />
                            <input
                                type="text"
                                value={skill.level}
                                onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                                placeholder="Level (e.g. Beginner)"
                                className="border px-2 py-1 rounded w-full"
                                required
                            />
                            <input
                                type="text"
                                value={skill.icon}
                                onChange={(e) => handleSkillChange(index, "icon", e.target.value)}
                                placeholder="Icon URL"
                                className="border px-2 py-1 rounded w-full"
                                required
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addSkillField}
                    className="text-sm bg-green-100 px-3 py-1 rounded hover:bg-green-200"
                >
                    + Add Another Skill
                </button>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Update Skill
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditSkillForm;
