import React, { useState, useEffect } from "react";
import "./success.css";

const Success = () => {
  const doctorImages = [
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800",
  ];

  const generateData = () => {
    const arr = [];
    for (let i = 1; i <= 45; i++) {
      arr.push({
        img: doctorImages[i % doctorImages.length],
        title: `Doctor Success Case ${i}`,
        desc: "Advanced treatment successfully completed.",
        year: 2023 + (i % 3),
      });
    }
    return arr;
  };

  const [data] = useState(generateData());
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  const itemsPerPage = 9;

  useEffect(() => {
    applyFilters();
  }, [searchText, yearFilter]);

  const applyFilters = () => {
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (yearFilter === "all" || item.year === Number(yearFilter)),
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="chandan">
      <h1 className="title">Success Stories</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="all">All Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div className="grid">
        {pageData.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.img} alt="doctor" className="mg" />
            <div className="card-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <small>{item.year}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div id="pageNumbers">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Success;
