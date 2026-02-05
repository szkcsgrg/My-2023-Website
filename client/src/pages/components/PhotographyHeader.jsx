import React from "react";
import { Link } from "react-router-dom";

function PhotographyHeader() {
  return (
    <header className="z-3 py-2 top-0 position-fixed d-flex flex-row row w-100">
      <div className="d-flex flex-row col-6 px-3 px-lg-5 py-lg-3">
        <p className="no-effect-link logo">
          <Link to="/">Gergő Szakács</Link>
        </p>
      </div>
      <div className="d-flex flex-row gap-1 gap-md-3 col-6 justify-content-end px-2 py-lg-3 px-lg-5">
        <p className="simple-link d-none d-md-block">
          <a href="/photography#portraits">Portraits</a>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/photography#weddings">Weddings</a>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/photography#products">Products</a>
        </p>
        <p className="simple-link d-none d-md-block">
          <a href="/photography#lifestyle">Lifestyle</a>
        </p> 
        <p className="d-none d-md-block">/</p>
        <p className="simple-link">
          <Link to="/development">Development</Link>
        </p>
      </div>
    </header>
  );
}

export default PhotographyHeader;
