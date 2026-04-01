import React from "react";
import blogs from "./Chandan/blogData"; // ✅ import shared data

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { useNavigate } from "react-router-dom";
import "./BlogSlider.css";

function BlogSlider() {
  const navigate = useNavigate();
  return (
    <div className="blog-container">
      <h2>Latest Blogs</h2>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {blogs.slice(0, 6).map(
          (
            blog,
            index, // ✅ limit for home
          ) => (
            <SwiperSlide key={index}>
              <div
                className="blog-card"
                onClick={() => navigate("/Blog")}
                style={{ cursor: "pointer" }}
              >
                <img src={blog.img} alt={blog.title} /> {/* ✅ img not image */}
                <h3>{blog.title}</h3>
                <p>{blog.date}</p>
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </div>
  );
}

export default BlogSlider;
