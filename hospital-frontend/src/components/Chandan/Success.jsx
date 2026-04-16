import React, { useState } from "react";
import "./Success.css";
import img1 from "../../images/img1.png";
import img2 from "../../images/img4.png";
import img3 from "../../images/img5.png";
import img4 from "../../images/img6.png";
import img5 from "../../images/img7.png";
import img6 from "../../images/img8.png";
import img7 from "../../images/img9.png";
import img8 from "../../images/img10.png";
import img9 from "../../images/img11.png";

const Success = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [searchText, setSearchText] = useState("");
  const [readMoreOpen, setReadMoreOpen] = useState({});

  const successStories = [
    {
      id: 1,
      title: "Successful Breast Cancer Treatment",
      hospital: "Medicover Hyderabad",
      date: "15 Apr, 2026",
      description:
        "A 40-year-old woman successfully overcame Stage 2 breast cancer.",
      image: img1,
      fullContent:
        "📋 Full Story:\nPatient: 40-year-old female.\nDiagnosis: Stage 2 Breast Cancer.\nTreatment: Multidisciplinary approach including surgery, chemotherapy, and targeted therapy.\nOutcome: Complete remission. Patient is cancer-free for 18 months and back to normal life.\n🏆 Result: Successful recovery with regular follow-ups.",
    },
    {
      id: 2,
      title: "Neuro Endoscopic Surgery",
      hospital: "Medicover Secunderabad",
      date: "13 Apr, 2026",
      description: "Complex brain surgery using advanced techniques.",
      image: img2,
      fullContent:
        "📋 Full Story:\nPatient: 52-year-old male with intraventricular tumor.\nProcedure: Neuro Endoscopic Surgery (minimally invasive).\nOutcome: Tumor completely excised. No neurological deficits. Discharged in 5 days.\n🏆 Result: Successful surgery with rapid recovery.",
    },
    {
      id: 3,
      title: "Uterine Treatment Case",
      hospital: "Medicover Vizag",
      date: "09 Apr, 2026",
      description: "Gynecology treatment using modern procedure.",
      image: img5,
      fullContent:
        "📋 Full Story:\nPatient: 38-year-old with symptomatic uterine fibroids.\nProcedure: Laparoscopic myomectomy (modern keyhole surgery).\nOutcome: Fibroids removed, uterus preserved. Normal menstrual cycle restored.\n🏆 Result: Successful fertility-preserving treatment.",
    },
    {
      id: 4,
      title: "Rare Brain Disease Treated",
      hospital: "Medicover Vizag",
      date: "05 Apr, 2026",
      description: "Child treated for rare brain disease.",
      image: img4,
      fullContent:
        "📋 Full Story:\nPatient: 7-year-old child with rare neurological disorder.\nTreatment: Advanced immunotherapy and rehabilitation.\nOutcome: Significant improvement in motor functions and cognitive abilities.\n🏆 Result: Child returned to school with normal activities.",
    },
    {
      id: 5,
      title: "Kidney Transplant Success",
      hospital: "Medicover Nellore",
      date: "02 Apr, 2026",
      description: "Successful kidney transplant.",
      image: img3,
      fullContent:
        "📋 Full Story:\nPatient: 45-year-old with end-stage renal disease.\nProcedure: Living donor kidney transplant.\nOutcome: 100% graft function at 1 year. No rejection episodes.\n🏆 Result: Patient returned to normal work within 3 months.",
    },
    {
      id: 6,
      title: "Spine Surgery Success",
      hospital: "Medicover Mumbai",
      date: "28 Mar, 2026",
      description: "Advanced spine surgery completed.",
      image: img6,
      fullContent:
        "📋 Full Story:\nPatient: 60-year-old with severe lumbar disc herniation.\nProcedure: Minimally invasive spine surgery.\nOutcome: Complete pain relief. Walking independently next day.\n🏆 Result: Full recovery within 4 weeks.",
    },
    {
      id: 7,
      title: "Heart Surgery Recovery",
      hospital: "Medicover Chennai",
      date: "25 Mar, 2026",
      description: "Cardiac surgery success.",
      image: img7,
      fullContent:
        "📋 Full Story:\nPatient: 55-year-old with triple vessel disease.\nProcedure: Coronary artery bypass grafting (CABG).\nOutcome: Successful surgery. Heart function improved significantly.\n🏆 Result: Patient resumed normal activities within 2 months.",
    },
    {
      id: 8,
      title: "Knee Replacement Surgery",
      hospital: "Medicover Whitefield",
      date: "20 Mar, 2026",
      description: "Patient regained mobility.",
      image: img8,
      fullContent:
        "📋 Full Story:\nPatient: 70-year-old with severe osteoarthritis.\nProcedure: Total knee replacement.\nOutcome: Walking without support in 3 weeks.\n🏆 Result: High patient satisfaction, zero complications.",
    },
    {
      id: 9,
      title: "Bone Marrow Transplantation",
      hospital: "Medicover Hyderabad",
      date: "15 Mar, 2026",
      description: "Life-saving transplant performed.",
      image: img9,
      fullContent:
        "📋 Full Story:\nPatient: 30-year-old with leukemia.\nProcedure: Allogeneic bone marrow transplant.\nOutcome: Complete donor engraftment. Cancer-free at 6 months.\n🏆 Result: Patient returned to normal life.",
    },
  ];

  const toggleReadMore = (id) => {
    setReadMoreOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredStories = successStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchText.toLowerCase()) ||
      story.hospital.toLowerCase().includes(searchText.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = filteredStories.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="success_wrapper">
      <div className="success_container">
        {/* Header */}
        <div className="success_header">
          <h1 className="success_title">Success Stories</h1>
          <p className="success_subtitle">
            Inspiring journeys of recovery and hope at Medicover Hospitals
          </p>
        </div>

        {/* Search Section */}
        <div className="success_search_section">
          <div className="success_search_bar">
            <span className="success_search_icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title, hospital or category..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="success_search_input"
            />
          </div>
          <div className="success_results_count">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredStories.length)} of{" "}
            {filteredStories.length} results
          </div>
        </div>

        {/* Stories Grid */}
        <div className="success_stories_grid">
          {currentStories.map((story) => (
            <div className="success_story_card" key={story.id}>
              <div className="success_card_image">
                <img src={story.image} alt={story.title} />
                <span className="success_category_badge">✨ Success</span>
              </div>
              <div className="success_card_content">
                <div className="success_hospital_info">
                  <span className="success_hospital_icon">🏥</span>
                  <span className="success_hospital_name">
                    {story.hospital}
                  </span>
                  <span className="success_date">{story.date}</span>
                </div>
                <h3 className="success_story_title">{story.title}</h3>
                <p className="success_story_description">{story.description}</p>

                {readMoreOpen[story.id] && (
                  <div className="success_full_content">
                    {story.fullContent.split("\n").map((line, idx) => (
                      <p key={idx} className="success_full_content_line">
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                <button
                  className="success_read_more_btn"
                  onClick={() => toggleReadMore(story.id)}
                >
                  {readMoreOpen[story.id] ? "Read Less ↑" : "Read More →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="success_pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="success_page_btn"
            >
              ← Previous
            </button>
            <div className="success_page_numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`success_page_num ${currentPage === index + 1 ? "active_page" : ""}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="success_page_btn"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
