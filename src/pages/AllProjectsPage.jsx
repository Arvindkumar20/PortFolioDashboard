import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/project/get");
      console.log(res.data.projects);
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/project/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleView = (project) => {
    alert(`
Title: ${project.title}
Description: ${project.description}
Technologies: ${project.technologies?.join(", ")}
Link: ${project.link}
    `);
  };

  const handleEdit = (project) => {
    setEditProject(project);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/project/${editProject._id}`,
        editProject
      );
      setEditProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
       
        <div className="flex items-center justify-center mx-auto">
          <Link to="/dashboard/project/add" className="w-48 py-3 font-medium bg-blue-500 text-white text-center rounded-2xl">Add project</Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500 my-10">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {project.image?.url && (
                  <img
                    src={project.image.url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {project.description}
                  </p>
                  {project.technologies?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2 text-sm">
                    <button
                      onClick={() => handleView(project)}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Form */}
        {editProject && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-lg font-bold mb-4">Edit Project</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="title"
                  value={editProject.title}
                  onChange={handleEditChange}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={editProject.description}
                  onChange={handleEditChange}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Description"
                />
                <input
                  name="technologies"
                  value={editProject.technologies?.join(", ")}
                  onChange={(e) =>
                    setEditProject((prev) => ({
                      ...prev,
                      technologies: e.target.value.split(","),
                    }))
                  }
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Technologies (comma separated)"
                />
                <input
                  name="link"
                  value={editProject.link}
                  onChange={handleEditChange}
                  className="w-full border px-4 py-2 rounded"
                  placeholder="Link"
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditProject(null)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
