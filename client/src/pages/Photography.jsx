import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

import { Splide, SplideSlide } from "@splidejs/react-splide";
// import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
// import "@splidejs/splide/dist/css/splide.min.css";

function Photography() {
  const [portraits, setPortraits] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [products, setProducts] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [customGap, setCustomGap] = useState(0);

  const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 607) {
          setCustomGap(-300);
      } else {
          setCustomGap(0);
      }
  };
  useEffect(() => { 
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }
  , []);

  useEffect(() => {
    const fetchAllPortraits = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/portraits`
        );
        // console.log(res.data);

        const sortedData = res.data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
    
          const dateA = new Date(yearA, monthA - 1, dayA); // Months are 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
    
          return dateB - dateA; // Sort in descending order
        });

        // console.log(sortedData);
        setPortraits(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllWeddings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/weddings`
        );

        const sortedData = res.data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
    
          const dateA = new Date(yearA, monthA - 1, dayA); // Months are 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
    
          return dateB - dateA; // Sort in descending order
        });

        setWeddings(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/products`
        );
        const sortedData = res.data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
    
          const dateA = new Date(yearA, monthA - 1, dayA); // Months are 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
    
          return dateB - dateA; // Sort in descending order
        });
        setProducts(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllLifestyle = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/lifestyle`
        );
        const sortedData = res.data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.').map(Number);
          const [dayB, monthB, yearB] = b.date.split('.').map(Number);
    
          const dateA = new Date(yearA, monthA - 1, dayA); // Months are 0-indexed
          const dateB = new Date(yearB, monthB - 1, dayB);
    
          return dateB - dateA; // Sort in descending order
        });
        setLifestyle(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => { 
      fetchAllPortraits();
    }, 1000);
    setTimeout(() => {
      fetchAllWeddings();
     }, 2000);
    setTimeout(() => {
      fetchAllProducts();
    }, 3000);
    setTimeout(() => {
      fetchAllLifestyle();
    }, 4000);

  }, []);

  return (
    <>
      <motion.section
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
        >
        <h2 className="z-1 my-5">Photography</h2>
        <p>Capturing your story through portraits, weddings, and products. <br />
          Passionate about capturing life's moments, from streets to nature. <br />
          Reach me at {" "} <Link to="mailto:work@szakacsgergo.com">
                work@szakacsgergo.com
              </Link>, {" "}
              <Link to="tel:+43 676 950 8332">+43 676 950 8332</Link>,
              or on {" "}
              <Link target="_blank" to="https://www.instagram.com/szkcsgrg.raw">
                Instagram
              </Link>.
            </p>
      </motion.section>

      {/* Portraits */}
      <motion.section 
        id="portraits"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="s-swiper section row d-flex flex-column justify-content-center  position-relative"
      >
        <h2 className="z-1 ms-lg-5 ps-lg-5 ms-1 ps-1 mt-5 title-lower">Portraits</h2>
        <Splide className="slide" options={{
            type: "loop", // Loop back to the beginning when reaching the end
            autoScroll: {
                pauseOnHover: false, //s Do not pause scrolling when hovering over the carousel
                pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                rewind: true, // Rewind to start when the end is reached
                speed: 1.5 // Scrolling speed
            },
            drag: false, // Free dragging
            focus: "center", // Center the focused slide
            arrows: portraits.length > 1 ? true : false, // Hide navigation arrows
            pagination: portraits.length > 1 ? true : false, // Hide pagination dots
            fixedWidth: '800px', // Fixed width for each slide
            gap: Number(customGap)+"px", // Gap between slides
        }}
        // extensions={[AutoScroll]}
        >
          {portraits.map((portrait) => (
            <SplideSlide key={portrait.id} className="text-center m-5 h-100 w-100">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-evenly gap-3">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center gap-2"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-5 my-lg-3 mt-md-5 my-lg-0">
                      <h3 className="d-none d-md-block bold">{portrait.name}</h3>
                      <h4 className="bold d-md-none">{portrait.name}</h4>
                      <p className="smaller-text italic">{portrait.date}</p>
                      {(portrait.clickable === "true") &&
                        <button className="button mx-auto my-2 d-none d-md-block"><Link>Open</Link></button>
                      }
                    </motion.div>
                  </div>
                  <div className="col-md-12 d-lg-none">
                    {(portrait.cover1 !== null) && (
                      <motion.img
                      initial={{ opacity: 0, x: -90 }}
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={portrait.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(portrait.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="ms-0 ms-lg-5 col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center me-5 pe-5">
                    {(portrait.cover1 !== null) && (
                      <motion.img
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={portrait.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(portrait.cover2 !== null) && (
                    <motion.img
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover2.replace('_medium.webp', '_thumb.webp')}`}
                    alt={portrait.name}
                    className="photo-card-img"
                    />
                  )}
                  {(portrait.cover3 !== null) && (
                    <motion.img
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover3.replace('_medium.webp', '_thumb.webp')}`}
                    alt={portrait.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </motion.section>

      {/* Weddings */}
      <motion.section 
        id="weddings"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="s-swiper section row d-flex flex-column justify-content-center  position-relative"
      >
        <h2 className="z-1 ms-lg-5 ps-lg-5 ms-1 ps-1 mt-5 title-lower">Weddings</h2>
        <Splide className="slide" options={{
            type: "loop", // Loop back to the beginning when reaching the end
            autoScroll: {
                pauseOnHover: false, //s Do not pause scrolling when hovering over the carousel
                pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                rewind: true, // Rewind to start when the end is reached
                speed: 1.5 // Scrolling speed
            },
            drag: false, // Free dragging
            focus: "center", // Center the focused slide
            arrows: weddings.length > 1 ? true : false, // Hide navigation arrows
            pagination: weddings.length > 1 ? true : false, // Hide pagination dots
            fixedWidth: '800px', // Fixed width for each slide
            gap: Number(customGap)+"px", // Gap between slides
        }}
        // extensions={[AutoScroll]}
        >
          {weddings.map((wedding) => (
            <SplideSlide key={wedding.id} className="text-center m-5 h-100 w-100">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-evenly gap-3">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center gap-2"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-5 my-lg-3 mt-md-5 my-lg-0">
                      <h3 className="d-none d-md-block bold">{wedding.name}</h3>
                      <h4 className="bold d-md-none">{wedding.name}</h4>
                      <p className="smaller-text italic">{wedding.date}</p>
                      {(wedding.clickable === "true") &&
                        <button className="button mx-auto my-2 d-none d-md-block"><Link>Open</Link></button>
                      }
                    </motion.div>
                  </div>
                  <div className="col-md-12 d-lg-none">
                    {(wedding.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, x: -90 }}
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${wedding.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={wedding.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(wedding.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="ms-0 ms-lg-5 col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center me-5 pe-5">
                    {(wedding.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${wedding.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={wedding.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(wedding.cover2 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${wedding.cover2.replace('_medium.webp', '_thumb.webp')}`}
                    alt={wedding.name}
                    className="photo-card-img"
                    />
                  )}
                  {(wedding.cover3 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${wedding.cover3.replace('_medium.webp', '_thumb.webp')}`}
                    alt={wedding.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </motion.section>

      {/* Products */}
      <motion.section 
        id="products"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="s-swiper section row d-flex flex-column justify-content-center  position-relative"
      >
        <h2 className="z-1 ms-lg-5 ps-lg-5 ms-1 ps-1 mt-5 title-lower">Products</h2>
        <Splide className="slide" options={{
            type: "loop", // Loop back to the beginning when reaching the end
            autoScroll: {
                pauseOnHover: false, //s Do not pause scrolling when hovering over the carousel
                pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                rewind: true, // Rewind to start when the end is reached
                speed: 1.5 // Scrolling speed
            },
            drag: false, // Free dragging
            focus: "center", // Center the focused slide
            arrows: products.length > 1 ? true : false, // Hide navigation arrows
            pagination: products.length > 1 ? true : false, // Hide pagination dots
            fixedWidth: '800px', // Fixed width for each slide
            gap: Number(customGap)+"px", // Gap between slides
        }}
        // extensions={[AutoScroll]}
        >
          {products.map((product) => (
            <SplideSlide key={product.id} className="text-center m-5 h-100 w-100">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-evenly gap-3">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center gap-2"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-5 my-lg-3 mt-md-5 my-lg-0">
                      <h3 className="d-none d-md-block bold">{product.name}</h3>
                      <h4 className="bold d-md-none">{product.name}</h4>
                      <p className="smaller-text italic">{product.date}</p>
                      {(product.clickable === "true") &&
                        <button className="button mx-auto my-2 d-none d-md-block"><Link>Open</Link></button>
                      }
                    </motion.div>
                  </div>
                  <div className="col-md-12 d-lg-none">
                    {(product.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, x: -90 }}
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={product.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(product.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="ms-0 ms-lg-5 col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center me-5 pe-5">
                    {(product.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={product.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(product.cover2 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover2.replace('_medium.webp', '_thumb.webp')}`}
                    alt={product.name}
                    className="photo-card-img"
                    />
                  )}
                  {(product.cover3 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover3.replace('_medium.webp', '_thumb.webp')}`}
                    alt={product.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </motion.section>

      {/* Lifestyle */}
      <motion.section 
        id="lifestlye"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="s-swiper section row d-flex flex-column justify-content-center  position-relative"
      >
        <h2 className="z-1 ms-lg-5 ps-lg-5 ms-1 ps-1 mt-5 title-lower">Lifestyle</h2>
        <Splide className="slide" options={{
            type: "loop", // Loop back to the beginning when reaching the end
            autoScroll: {
                pauseOnHover: false, //s Do not pause scrolling when hovering over the carousel
                pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                rewind: true, // Rewind to start when the end is reached
                speed: 1.5 // Scrolling speed
            },
            drag: false, // Free dragging
            focus: "center", // Center the focused slide
            arrows: lifestyle.length > 1 ? true : false, // Hide navigation arrows
            pagination: lifestyle.length > 1 ? true : false,// Hide pagination dots
            fixedWidth: '800px', // Fixed width for each slide
            gap: Number(customGap)+"px", // Gap between slides
        }}
        // extensions={[AutoScroll]}
        >
          {lifestyle.map((life) => (
            <SplideSlide key={life.id} className="text-center m-5 h-100 w-100">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-evenly gap-3">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center gap-2"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-5 my-lg-3 mt-md-5 my-lg-0">
                      <h3 className="d-none d-md-block bold">{life.name}</h3>
                      <h4 className="bold d-md-none">{life.name}</h4>
                      <p className="smaller-text italic">{life.date}</p>
                      {(life.clickable === "true") &&
                        <button className="button mx-auto my-2 d-none d-md-block"><Link>Open</Link></button>
                      }
                    </motion.div>
                  </div>
                  <div className="col-md-12 d-lg-none">
                    {(life.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, x: -90 }}
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={life.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(life.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="ms-0 ms-lg-5 col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center me-5 pe-5">
                    {(life.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover1.replace('_medium.webp', '_thumb.webp')}`}
                      alt={life.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(life.cover2 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover2.replace('_medium.webp', '_thumb.webp')}`}
                    alt={life.name}
                    className="photo-card-img"
                    />
                  )}
                  {(life.cover3 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover3.replace('_medium.webp', '_thumb.webp')}`}
                    alt={life.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </motion.section>
    </>
  );
}

export default Photography;