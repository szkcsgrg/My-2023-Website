import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  //Get all the rows from the database.
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Async fucntion is needed to communicate with the backend.
    const fecthAllProjects = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/projectsdevelopment"
        );
        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call the function.
    fecthAllProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/developerprojects/` + id);
      window.location.reload();
      //setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cv", e.target.files[0]);

      const response = await axios.post("http://localhost:8800/cv", formData);
      if (response.status === 200) {
        console.log("CV has been successfully uploaded.");
        navigate("/login");
      } else {
        console.error("CV upload failed.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h1>Analitycs</h1>
        <p>Details about the view count interactions etc.</p>
      </div>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h2>Software Development - Section</h2>

        <div className="d-flex gap-3 my-2 mb-4">
          <button className="col-6 col-lg-2 button">
            <Link to={"/addDeveloperProject"}>Add New Project</Link>
          </button>
          <input
            onChange={handleFileUpload}
            placeholder="CV"
            className="col-2 col-md-4 buttonClone"
            type="file"
            name="cv"
            id="cv"
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Date</th>
              <th className="d-none d-md-table-cell">Stack</th>
              <th className="d-none d-md-table-cell">Position</th>
              <th className="d-none d-md-table-cell">GitHub URL</th>
              <th className="d-none d-md-table-cell">Real URL</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            {/* Show all the elements from the response. */}
            {projects.map((project) => (
              <tr className="project" key={project.id}>
                <td>{project.name}</td>
                <td className="d-none d-md-block">
                  {project.dateStart}-{project.dateEnd}
                </td>
                <td className="d-none d-md-table-cell">{project.stack}</td>
                <td className="d-none d-md-table-cell">{project.position}</td>
                <td className="d-none d-md-table-cell">{project.href1}</td>
                <td className="d-none d-md-table-cell">{project.href2}</td>
                <td id="functions" className="d-flex">
                  <button className="button m">
                    <Link to={`/updateDeveloperProject/${project.id}`}>
                      Update
                    </Link>
                  </button>
                  <button
                    className="button m"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h2>Photography - Section</h2>
      </div>
    </>
  );
}

export default Dashboard;
