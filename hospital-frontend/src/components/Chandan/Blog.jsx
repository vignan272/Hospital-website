import React, { useState, useEffect } from "react";
import "./Blog.css";
import blogs from "./blogData";

const Blog = () => {
  const [index, setIndex] = useState(0);

  const categories = [
    {
      name: "Cardiology",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format",
    },
    {
      name: "ENT",
      img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&auto=format",
    },
    {
      name: "Fertility",
      img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&auto=format",
    },
    {
      name: "Gastroenterology",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&auto=format",
    },
    {
      name: "Orthopedics",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format",
    },
    {
      name: "Neurology",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format",
    },
    {
      name: "Pediatrics",
      img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&auto=format",
    },
    {
      name: "Gynecology",
      img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&auto=format",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < categories.length - 4 ? prev + 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, []); // ✅ no need for dependency

  return (
    <div className="chandan">
      <h1 style={{ textAlign: "center" }}>Blogs</h1>

      {/* HERO */}
      <div className="heroB-wrapper">
        <div className="heroB-left">
          <h3 className="tag">Trending</h3>
          <h1>Heart Blockage After Bypass Surgery</h1>

          <p className="meta">Ecstasy Hospitals</p>
          <p className="meta">⏱ 2–3.5 Mins | 📅 2025-11-25</p>
        </div>

        <div className="heroB-right">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format"
            alt="hero"
          />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="categories-wrapper">
        <div
          className="categories-container"
          style={{
            transform: `translateX(-${index * 25}%)`,
          }}
        >
          {categories.map((cat, i) => (
            <div className="cat-card" key={i}>
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}>
            Prev
          </button>

          <button
            onClick={() =>
              setIndex((prev) => (prev < categories.length - 4 ? prev + 1 : 0))
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* BLOGS */}
      <h2 className="section-title">Latest Blogs</h2>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.img} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
