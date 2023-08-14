import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="z-3 top-0 position-fixed d-flex flex-row row w-100">
      <div className="d-flex flex-row col-6 px-4">
        <p className="no-effect-link">
          <Link to="/">Gergő Szakács</Link>
        </p>
      </div>
      <div className="d-flex flex-row gap-3 col-6 justify-content-end">
        <p className="simple-link">
          <Link to="/development">Development</Link>
        </p>
        <p className="simple-link">
          <Link to="/photography">Photography</Link>
        </p>
      </div>
    </header>
  );
}

export default Header;
