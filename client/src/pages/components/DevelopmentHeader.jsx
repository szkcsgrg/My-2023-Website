import React from "react";
import { Link } from "react-router-dom";
import { headerEnter, headerExit } from "../../components/cursor";

function DevelopmentHeader() {
  const CV = `${process.env.REACT_APP_BACKEND_SERVER}/public/cv/Gergo%20Szakacs%20-%20CV.pdf`;
  return (
    <header
      onMouseEnter={headerEnter}
      onMouseLeave={headerExit}
      className="z-3 py-2 top-0 position-fixed d-flex flex-row row w-100"
    >
      <div className="d-flex flex-row col-6 px-2 px-lg-5 py-lg-3">
        <p className="no-effect-link logo">
          <Link to="/">Gergő Szakács</Link>
        </p>
      </div>
      <div className="d-flex flex-lg-row gap-1 gap-md-3 col-6 justify-content-end px-2 py-lg-3 px-lg-5">
        <p className="simple-link">
          <Link target="_blank" to={CV}>
            Resume
          </Link>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/development#contact">Contact</a>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/development#reviews">Reviews</a>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/development#projects">Projects</a>
        </p>
        <p>/</p>
        <p className="simple-link">
          <Link to="/photography">Photography</Link>
        </p>
      </div>
    </header>
  );
}

export default DevelopmentHeader;
