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
  return (
    <>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h1>Analitycs</h1>
        <p>Details about the view count interactions etc.</p>
      </div>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h2>Development</h2>
        <h4>List Of Projects</h4>
        <button className="col-2 my-3">
          <Link to={"/addDeveloperProject"}>Add New Project</Link>
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Stack</th>
              <th>Color Code</th>
              <th>Href 1.</th>
              <th>Href 2.</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            {/* Show all the elements from the response. */}
            {projects.map((project) => (
              <tr className="project" key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.date}</td>
                <td>{project.stack}</td>
                <td>{project.colorcode}</td>
                <td>{project.href1}</td>
                <td>{project.href2}</td>
                <td id="functions">
                  <button className="m">
                    <Link to={`/updateDeveloperProject/${project.id}`}>
                      Update
                    </Link>
                  </button>
                  {/* <button
                    className="m"
                    onClick={() => handleDelete(project.idcars)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section d-flex justify-content-center flex-column col-12">
        <h1>Photography</h1>
        <h3>Create a Project</h3>
        <span>To-Do</span>
        <br />
        <h3>Edit/Delete Existing Projects</h3>
        <span>To-Do</span>
      </div>
    </>
  );
}

export default Dashboard;
