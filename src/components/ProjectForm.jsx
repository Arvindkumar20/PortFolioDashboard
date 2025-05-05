import { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("link", formData.link);
    data.append(
      "technologies",
      JSON.stringify(formData.technologies.split(","))
    );
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/project/add",
        data
      );
      onProjectCreated(res.data.project);
      setFormData({
        title: "",
        description: "",
        technologies: "",
        link: "",
        image: null,
      });
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-20"
    >
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="text"
        name="technologies"
        placeholder="Technologies (comma separated)"
        value={formData.technologies}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        type="url"
        name="link"
        placeholder="Project Link"
        value={formData.link}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
