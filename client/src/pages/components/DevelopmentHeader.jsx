import React from "react";
import { Link } from "react-router-dom";

function DevelopmentHeader() {
  return (
    <header className="z-3 my-2 top-0 position-fixed d-flex flex-row row w-100">
      <div className="d-flex flex-row col-6 px-3 px-lg-4">
        <p className="no-effect-link logo">
          <Link to="/">Gergő Szakács</Link>
        </p>
      </div>
      <div className="d-flex flex-row gap-1 gap-md-3 col-6 justify-content-end px-0">
        <p className="simple-link">
          <Link to="/photography">Photography</Link>
        </p>
      </div>
    </header>
  );
}

export default DevelopmentHeader;
