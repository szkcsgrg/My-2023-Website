import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectFade,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function Photography() {
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  const [portraits, setPortraits] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [products, setProducts] = useState([]);
  const [lifestyle, setLifestye] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portraitsRes, weddingsRes, productsRes, lifestyleRes] =
          await Promise.all([
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:8800/portraits`),
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:8800/weddings`),
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:8800/products`),
            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}:8800/lifestyle`),
          ]);

        setPortraits(portraitsRes.data);
        setWeddings(weddingsRes.data);
        setProducts(productsRes.data);
        setLifestye(lifestyleRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEventSelect = (eventName) => {
    setSelectedEvent(eventName);
  };

  if (loading) {
    return <p>Loading...</p>; // You can customize the loading message
  }

  const groupedPortraits = portraits.reduce((acc, portrait) => {
    const eventName = portrait.name;
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(portrait);
    return acc;
  }, {});
  // Weddings
  const groupedWeddings = weddings.reduce((acc, wedding) => {
    const eventName = wedding.name;
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(wedding);
    return acc;
  }, {});

  // Products
  const groupedProducts = products.reduce((acc, product) => {
    const eventName = product.name;
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(product);
    return acc;
  }, {});

  // Lifestyles
  const groupedLifestyles = lifestyle.reduce((acc, ls) => {
    const eventName = ls.name;
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(ls);
    return acc;
  }, {});

  // const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  // const [portraits, setPortraits] = useState([]);
  // const [weddings, setWeddings] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [lifestyle, setLifestye] = useState([]);
  // const [selectedEvent, setSelectedEvent] = useState(null);

  // useEffect(() => {
  //   //Async fucntion is needed to communicate with the backend.
  //   const fecthAllPortraits = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_SERVER}:8800/portraits`
  //       );
  //       setPortraits(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const fecthAllWeddigns = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_SERVER}:8800/weddings`
  //       );
  //       setWeddings(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const fecthAllProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_SERVER}:8800/products`
  //       );
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const fecthAllLifestyle = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_SERVER}:8800/lifestyle`
  //       );
  //       setLifestye(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   //Call the function.
  //   fecthAllPortraits();
  //   fecthAllWeddigns();
  //   fecthAllProducts();
  //   fecthAllLifestyle();
  // }, []);

  // // Group the topics by event
  // const groupedPortraits = portraits.reduce((acc, portrait) => {
  //   const eventName = portrait.name;
  //   if (!acc[eventName]) {
  //     acc[eventName] = [];
  //   }
  //   acc[eventName].push(portrait);
  //   return acc;
  // }, {});
  // const groupedWeddings = weddings.reduce((acc, wedding) => {
  //   const eventName = wedding.name;
  //   if (!acc[eventName]) {
  //     acc[eventName] = [];
  //   }
  //   acc[eventName].push(wedding);
  //   return acc;
  // }, {});
  // const groupedProducts = products.reduce((acc, product) => {
  //   const eventName = product.name;
  //   if (!acc[eventName]) {
  //     acc[eventName] = [];
  //   }
  //   acc[eventName].push(product);
  //   return acc;
  // }, {});
  // const groupedLifestyles = lifestyle.reduce((acc, ls) => {
  //   const eventName = ls.name;
  //   if (!acc[eventName]) {
  //     acc[eventName] = [];
  //   }
  //   acc[eventName].push(ls);
  //   return acc;
  // }, {});

  // const handleEventSelect = (eventName) => {
  //   setSelectedEvent(eventName);
  // };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">Photography</h2>
        <h2 className="d-none d-lg-block z-0">
          <span>Photography</span>
        </h2>
      </motion.section>
      {/* Overview */}
      <section className="section-longer row d-flex flex-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5">
        <div className="d-flex flex-column flex-lg-row gap-3">
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-lg-4"
          >
            <h3>Short Overview</h3>
            <p>
              I'm a dedicated hobby photographer, driven by a profound passion
              to capture the essence of extraordinary moments. <br />
              My photography journey began as a creative pursuit, showcasing a
              natural talent for transforming ordinary scenes into captivating
              visual stories.
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: "100%" }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-lg-8 smaller-text margin-top-075"
          >
            Every project is a unique canvas where collaboration sparks
            innovation, and my adaptable and holistic perspective enrich every
            shot I take. Whether capturing nuanced expressions in individual
            portraits, exploring the intricate details of dynamic product
            photography, immersing in the timeless beauty of weddings, or
            navigating the bustling streets in the passion-filled realm of
            street photography, my lens becomes a storyteller. It weaves
            narratives that go beyond the ordinary, inviting viewers to explore
            a world of emotions, textures, and moments frozen in time. Each
            click expresses my deep passion for visual storytelling, creating an
            immersive experience that resonates profoundly with those who
            encounter my work.
          </motion.p>
        </div>
        <br />
        <br />
        <p>
          <span>From ideas to prints, I've got you covered.</span>
        </p>
        <br />
        <br />
        <p className="smaller-text" id="contact">
          For any photography inquiries, reach out at{" "}
          <Link to="mailto:work@szakacsgergo.com">work@szakacsgergo.com</Link>{" "}
          or <Link to="tel:+43 676 950 8332">+43 676 950 8332</Link>. <br />{" "}
          Explore my portfolio for a visual journey through moments frozen in
          time.
        </p>
      </section>

      {/* Portraits */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="slider row d-flex flex-column"
        id="portraits"
      >
        <h2 className="mx-lg-5 px-lg-5 my-1">Portraits</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedPortraits).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>

        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedPortraits[selectedEvent]?.map((portrait) => (
              <SwiperSlide
                key={portrait.id}
                className="swiper-slide-custom text-center"
              >
                <img
                  src={`${backendServer}:8800/${portrait.path}`}
                  alt={portrait.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section>

      {/* Weddings */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="slider row d-flex flex-column"
        id="weddings"
      >
        <h2 className="mx-lg-5 px-lg-5 my-1">Weddings</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedWeddings).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>

        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedWeddings[selectedEvent]?.map((wedding) => (
              <SwiperSlide
                key={wedding.id}
                className="swiper-slide-custom text-center"
              >
                <img
                  src={`${backendServer}:8800/${wedding.path}`}
                  alt={wedding.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section>

      {/* Products */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="slider row d-flex flex-column"
        id="products"
      >
        <h2 className="mx-lg-5 px-lg-5 my-1">Products</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedProducts).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedProducts[selectedEvent]?.map((products) => (
              <SwiperSlide
                key={products.id}
                className="swiper-slide-custom text-center"
              >
                <img
                  src={`${backendServer}:8800/${products.path}`}
                  alt={products.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section>

      {/* Lifestyle */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="slider row d-flex flex-column"
        id="lifestyle"
      >
        <h2 className="mx-lg-5 px-lg-5 my-1">Lifestyle</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedLifestyles).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedLifestyles[selectedEvent]?.map((lifestyle) => (
              <SwiperSlide
                key={lifestyle.id}
                className="swiper-slide-custom text-center"
              >
                <img
                  src={`${backendServer}:8800/${lifestyle.path}`}
                  alt={lifestyle.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section>

      {/* MY CODE *}
      {/* Portraits */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="slider row d-flex flex-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
        id="portraits"
      >
        <h2 className="z-1">Portraits</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedPortraits).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedPortraits[selectedEvent].map((portrait) => (
              <SwiperSlide
                key={portrait.id}
                className="swiper-slide-custom d-flex flex-column jusitfy-content-center"
              >
                <img
                  src={`${backendServer}:8800/${portrait.path}`}
                  alt={portrait.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section> */}

      {/* Weddings */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="slider row d-flex flex-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
        id="weddings"
      >
        <h2 className="z-1">Weddings</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedWeddings).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedWeddings[selectedEvent].map((weddings) => (
              <SwiperSlide
                key={weddings.id}
                className="swiper-slide-custom d-flex flex-column jusitfy-content-center"
              >
                <img
                  src={`${backendServer}:8800/${weddings.path}`}
                  alt={weddings.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section> */}

      {/* Products */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="slider row d-flex flex-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
        id="products"
      >
        <h2 className="z-1">Products</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedProducts).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedProducts[selectedEvent].map((products) => (
              <SwiperSlide
                key={products.id}
                className="swiper-slide-custom d-flex flex-column jusitfy-content-center"
              >
                <img
                  src={`${backendServer}:8800/${products.path}`}
                  alt={products.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section> */}

      {/* Lifestyles */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="slider row d-flex flex-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
        id="lifestyle"
      >
        <h2 className="z-1">Lifestyle</h2>
        <div className="links d-flex flex-row justify-content-evenly">
          {Object.keys(groupedLifestyles).map((eventName) => (
            <p
              key={eventName}
              onClick={() => handleEventSelect(eventName)}
              className={selectedEvent === eventName ? "selected" : ""}
            >
              {eventName}
            </p>
          ))}
        </div>
        <Swiper
          className=""
          modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {selectedEvent ? (
            groupedLifestyles[selectedEvent].map((lifestyle) => (
              <SwiperSlide
                key={lifestyle.id}
                className="swiper-slide-custom d-flex flex-column jusitfy-content-center"
              >
                <img
                  src={`${backendServer}:8800/${lifestyle.path}`}
                  alt={lifestyle.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="swiper-slide-custom row d-flex flex-column justify-content-center">
              <h3>Choose one from above</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.section>  */}
    </>
  );
}

export default Photography;
