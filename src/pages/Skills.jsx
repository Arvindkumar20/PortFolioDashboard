import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);
    const navigate = useNavigate();

    const fetchSkills = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/skill");
            setSkillsData(res.data.skills);
        } catch (err) {
            console.error("Failed to fetch skills:", err);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Skill Categories</h1>
                <button
                    onClick={() => navigate("/dashboard/skill/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                    + Add Skill
                </button>
            </div>

            {skillsData.length === 0 ? (
                <p className="text-gray-600">No skills found. Add one using the button above.</p>
            ) : (
                <div className="space-y-6">
                    {skillsData.map((item) => (
                        <div key={item._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                            <h2 className="text-xl font-semibold text-blue-700 mb-3">{item.category}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {item.skills.map((skill, index) => (
                                    <div key={index} className="bg-gray-100 p-3 rounded-lg flex items-center gap-3 shadow-sm">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-8 h-8 object-contain"
                                        />
                                        <div>
                                            <h4 className="font-medium">{skill.name}</h4>
                                            <p className="text-sm text-gray-600">{skill.level}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Skills;
