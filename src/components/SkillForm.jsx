import React, { useState } from "react";
import axios from "axios";

const SkillForm = () => {
    const [category, setCategory] = useState("");
    const [skills, setSkills] = useState([{ name: "", level: "", icon: "" }]);
    const [message, setMessage] = useState("");

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const addSkillField = () => {
        setSkills([...skills, { name: "", level: "", icon: "" }]);
    };

    const removeSkillField = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/skill/add", {
                category,
                skills
            });
            setMessage("Skill added successfully!");
            setCategory("");
            setSkills([{ name: "", level: "", icon: "" }]);
        } catch (err) {
            setMessage("Error: " + err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Add Skill Category</h2>
            {message && <div className="mb-4 text-blue-600">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                {skills.map((skill, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 items-center">
                        <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                            placeholder="Skill Name"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                            placeholder="Skill Level"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            value={skill.icon}
                            onChange={(e) => handleSkillChange(index, "icon", e.target.value)}
                            placeholder="Skill Icon URL"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        {skills.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSkillField(index)}
                                className="col-span-3 text-red-600 underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSkillField}
                    className="text-green-600 underline"
                >
                    + Add More Skill
                </button>

                <button
                    type="submit"
                    className="block w-full bg-blue-600 text-white py-2 rounded mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SkillForm;
