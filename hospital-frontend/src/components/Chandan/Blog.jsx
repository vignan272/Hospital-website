import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blog = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev < categories.length - 4 ? prev + 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      name: "Cardiology",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop",
    },
    {
      name: "ENT",
      img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=250&fit=crop",
    },
    {
      name: "Fertility",
      img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&h=250&fit=crop",
    },
    {
      name: "Gastroenterology",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=250&fit=crop",
    },
    {
      name: "Orthopedics",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
    },
    {
      name: "Neurology",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    },
    {
      name: "Pediatrics",
      img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=250&fit=crop",
    },
    {
      name: "Gynecology",
      img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop",
    },
    {
      name: "Oncology",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
    },
    {
      name: "Dermatology",
      img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=250&fit=crop",
    },
    {
      name: "Urology",
      img: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=400&h=250&fit=crop",
    },
    {
      name: "Nephrology",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop",
    },
    {
      name: "Psychiatry",
      img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&h=250&fit=crop",
    },
    {
      name: "Radiology",
      img: "https://images.unsplash.com/photo-1588774069410-84ae30757c8e?w=400&h=250&fit=crop",
    },
    {
      name: "Anesthesiology",
      img: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=250&fit=crop",
    },
    {
      name: "Endocrinology",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=250&fit=crop",
    },
    {
      name: "Hematology",
      img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400&h=250&fit=crop",
    },
    {
      name: "Ophthalmology",
      img: "https://images.unsplash.com/photo-1588774069410-84ae30757c8e?w=400&h=250&fit=crop",
    },
    {
      name: "Pulmonology",
      img: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=400&h=250&fit=crop",
    },
    {
      name: "Public Health",
      img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=250&fit=crop",
    },
  ];
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
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200"
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

        {/* Buttons */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={() => setIndex(index - 1)}>Prev</button>
          <button onClick={() => setIndex(index + 1)}>Next</button>
        </div>
      </div>
      {/* BLOGS */}
      <h2 className="section-title">Latest Blogs</h2>

      <div className="blogs-grid" id="blogsGrid">
        {[
          {
            title: "Heart Healthy Lifestyle Tips",
            date: "18-03-2026",
            img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
          },
          {
            title: "Bone And Joint Health Tips",
            date: "18-03-2026",
            img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400",
          },
          {
            title: "Cancer Early Detection",
            date: "18-03-2026",
            img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
          },
          {
            title: "Knee Pain Treatment",
            date: "18-03-2026",
            img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
          },
          {
            title: "Autism Awareness",
            date: "16-03-2026",
            img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400",
          },
          {
            title: "Joint Pain Recovery",
            date: "16-03-2026",
            img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
          },
          {
            title: "Child Recovery Journey",
            date: "12-03-2026",
            img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400",
          },
          {
            title: "Skin Treatment Guide",
            date: "12-03-2026",
            img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400",
          },
        ].map((blog, index) => (
          <div className="blog-card" key={index}>
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
