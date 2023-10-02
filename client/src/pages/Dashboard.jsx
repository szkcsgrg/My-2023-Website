import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  //Get all the rows from the database.
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Async fucntion is needed to communicate with the backend.
    const fecthAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8800/reviews");
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

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
    fecthAllReviews();
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

  return (
    <>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h1>Analitycs</h1>
        <p>Details about the view count interactions etc.</p>
      </div>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h2>Software Development - Section</h2>

        <button className="col-2 my-3 button">
          <Link to={"/addDeveloperProject"}>Add New Project</Link>
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Stack</th>
              <th>Position</th>
              <th>GitHub URL</th>
              <th>Real URL</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            {/* Show all the elements from the response. */}
            {projects.map((project) => (
              <tr className="project" key={project.id}>
                <td>{project.name}</td>
                <td>
                  {project.dateStart}-{project.dateEnd}
                </td>
                <td>{project.stack}</td>
                <td>{project.position}</td>
                <td>{project.href1}</td>
                <td>{project.href2}</td>
                <td id="functions">
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
