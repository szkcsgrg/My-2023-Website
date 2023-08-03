import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <article>
      <section className="landing row d-flex justify-content-center flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5">
        <div className="col-12 col-md-10 col-lg-8">
          <h1>Gergő Szakács</h1>
          <p>
            A passionate <Link to="/development">Developer</Link> and{" "}
            <Link to="/photography">Photographer</Link> from Hungary. <br />
          </p>
        </div>
      </section>
      <section className="section row d-flex flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5">
        <h2>
          <Link to="/development">Sofware Development</Link>
        </h2>
        <h2 className="d-none d-lg-block">
          <span>Sofware Development</span>
        </h2>
        <p>
          After learning the basics of Programming, I met with the lovely HTML
          and CSS. At first view, I know they will be the one. Throughout my
          way, I started to go deeper and deeper. Like every other Website
          Developer, I also had the usual ways around every aspect. I tried both
          the backend and frontend as well. In the beginning, I put more effort
          into the Frontend side. At the moment, I am putting 100% of my power
          into learning React and Node with Express. I also tried Firebase and
          some Database solutions such as MySQL and MongoDB.
        </p>
      </section>
      <section className="section row d-flex flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5">
        <h2>
          <Link to="/photography">Photography</Link>
        </h2>
        <h2 className="d-none d-lg-block">
          <span>Photography</span>
        </h2>
        <p>
          The other passion is in connection with art. Since I know myself, I
          always wanted to create something for the world. Simplicity is the key
          for me. From that point, you can build out anything crowded or noisy.
          I tried to implement this method in my photography journey as well. I
          got my first camera from one of my family members. Shortly it became
          one of my favorite hobbies. Now I am spending my time on special
          events or taking portraits of other people. Of course, product
          photography is on the list as well. When I do not need to focus on
          objects or people, I love to take a digital version of the moment.
          Street photography and nature puts me in my comfort zone.
        </p>
      </section>
    </article>
  );
}

export default Home;
