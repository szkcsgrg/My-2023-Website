import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Scrollbar,
  A11y,
  FreeMode,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";


function Photography() {

  const [portraits, setPortraits] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [products, setProducts] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);

  useEffect(() => {
    const fetchAllPortraits = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/portraits`
        );
        setPortraits(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllWeddings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/weddings`
        );
        setWeddings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllLifestyle = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/lifestyle`
        );
        setLifestyle(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPortraits();
    fetchAllWeddings();
    fetchAllProducts();
    fetchAllLifestyle();

  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5 position-relative"
      >
        <h2 className="z-1 mt-5 title-lower">Portraits</h2>
        <Swiper
          modules={[
            Zoom,
            Autoplay,
            Pagination,
            Navigation,
            Scrollbar,
            A11y,
            EffectFade,
            FreeMode,
          ]}
          zoom={true}
          spaceBetween={50}
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {portraits.map((portrait) => (
            <SwiperSlide key={portrait.id} className="text-center">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-around gap-2 gap-lg-1">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-3 mt-md-5 my-lg-0">
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
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover1}`}
                      alt={portrait.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(portrait.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center">
                    {(portrait.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover1}`}
                      alt={portrait.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(portrait.cover2 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover2}`}
                    alt={portrait.name}
                    className="photo-card-img"
                    />
                  )}
                  {(portrait.cover3 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${portrait.cover3}`}
                    alt={portrait.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Weddings */}
      <motion.section 
        id="weddings"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5 position-relative"
      >
        <h2 className="z-1 mt-5 title-lower">Weddings</h2>
        <Swiper
          modules={[
            Zoom,
            Autoplay,
            Pagination,
            Navigation,
            Scrollbar,
            A11y,
            EffectFade,
            FreeMode,
          ]}
          zoom={true}
          spaceBetween={50}
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {weddings.map((weddings) => (
            <SwiperSlide key={weddings.id} className="text-center">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-around gap-2 gap-lg-1">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-3 mt-md-5 my-lg-0">
                      <h3 className="d-none d-md-block bold">{weddings.name}</h3>
                      <h4 className="bold d-md-none">{weddings.name}</h4>
                      <p className="smaller-text italic">{weddings.date}</p>
                      {(weddings.clickable === "true") &&
                        <button className="button mx-auto my-2 d-none d-md-block"><Link>Open</Link></button>
                      }
                    </motion.div>
                  </div>
                  <div className="col-md-12 d-lg-none">
                    {(weddings.cover1 !== null) && (
                      <motion.img 
                      loading="lazy"
                      initial={{ opacity: 0, x: -90 }}
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${weddings.cover1}`}
                      alt={weddings.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(weddings.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center">
                    {(weddings.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${weddings.cover1}`}
                      alt={weddings.name}
                      className="photo-card-img card-img-smaller-lg d-none d-lg-block"
                      />
                    )}
                  {(weddings.cover2 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: 100 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${weddings.cover2}`}
                    alt={weddings.name}
                    className="photo-card-img"
                    />
                  )}
                  {(weddings.cover3 !== null) && (
                    <motion.img
                    loading="lazy"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 1000 }}
                    whileFocus={{ scale: 1.2, zIndex: 1000 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${weddings.cover3}`}
                    alt={weddings.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section> 

      {/* Products */}
      <motion.section 
        id="products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5 position-relative"
      >
        <h2 className="z-1 mt-5 title-lower">Products</h2>
        <Swiper
          modules={[
            Zoom,
            Autoplay,
            Pagination,
            Navigation,
            Scrollbar,
            A11y,
            EffectFade,
            FreeMode,
          ]}
          zoom={true}
          spaceBetween={50}
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="text-center">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-around gap-2 gap-lg-1">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-3 mt-md-5 my-lg-0">
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
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover1}`}
                      alt={product.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(product.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center">
                    {(product.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover1}`}
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
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover2}`}
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
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${product.cover3}`}
                    alt={product.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Lifestyle */}
      <motion.section 
        id="lifestyle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5 position-relative"
      >
        <h2 className="z-1 mt-5 title-lower">Lifestyle</h2>
        <Swiper
          modules={[
            Zoom,
            Autoplay,
            Pagination,
            Navigation,
            Scrollbar,
            A11y,
            EffectFade,
            FreeMode,
          ]}
          zoom={true}
          spaceBetween={50}
          slidesPerView={1}
          grabCursor={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
          scrollbar={{ draggable: true }}
          loopPreventsSliding={false}
        >
          {lifestyle.map((life) => (
            <SwiperSlide key={life.id} className="text-center">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center justify-content-lg-around gap-2 gap-lg-1">
                <div className="col-6 col-md-7 col-lg-1 d-flex flex-column flex-lg-row">
                  <div className="col-md-12 col-lg-1 d-flex flex-column align-items-center justify-content-center"> 
                    <motion.div 
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 2 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      className="my-3 mt-md-5 my-lg-0">
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
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover1}`}
                      alt={life.name}
                      className="photo-card-img card-img-smaller-lg"
                      />
                    )}
                  </div>
                  {(life.clickable === "true") &&
                    <button className="button mx-auto my-3 d-md-none"><Link>Open</Link></button>
                  }
                </div>
                <div className="col-6 col-md-5 col-lg-6 d-flex flex-column flex-lg-row gap-2 gap-md-1 gap-lg-2 gap-xl-4 align-items-center justify-content-center">
                    {(life.cover1 !== null) && (
                      <motion.img
                      loading="lazy"
                      initial={{ opacity: 0, y: -100 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.5 }}
                      whileFocus={{ scale: 1.2, zIndex: 1000 }}
                      whileHover={{ scale: 1.2, zIndex: 1000 }}
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover1}`}
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
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover2}`}
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
                    src={`${process.env.REACT_APP_BACKEND_SERVER}/${life.cover3}`}
                    alt={life.name}
                    className="photo-card-img card-img-smaller-lg"
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
    </>
  );
}

export default Photography;
