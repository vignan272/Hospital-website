// Leadership.jsx - Completely Redesigned with New Attractive Elements
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Leadership.css";

// Images are in src/images/ folder
import Doctor1 from "../../images/Doctor1.png";
import Doctor2 from "../../images/Doctor2.png";
import Doctor3 from "../../images/Doctor3.png";
import Doctor4 from "../../images/Doctor4.png";

const Leadership = () => {
  const navigate = useNavigate();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");

  const leaders = [
    {
      id: 1,
      name: "Dr. G. Anil Krishna",
      title: "Chairman - Managing Director",
      subtitle: "Medicover Hospitals, India",
      description:
        "Dr. Anil Krishna is one of the leading specialists in Interventional Cardiology and has headed many successful procedures related to reopening blocked coronaries. He is well-known for handling critical situations and has performed a number of complex interventional procedures.",
      quote:
        "Our aim is to expand pan-India and overseas, and deliver European standard healthcare excellence through quality healthcare.",
      image: Doctor1,
      alt: "Dr. G. Anil Krishna",
      experience: "25+ Years",
      procedures: "10,000+",
      awards: "15+",
      specialty: "Interventional Cardiology",
    },
    {
      id: 2,
      name: "Mr. P. Hari Krishna",
      title: "Executive Director",
      subtitle: "Medicover Hospitals, India",
      description:
        "Mr. Hari Krishna is the Executive Director of Medicover Hospitals in India and has over 18 years of consumer and healthcare marketing experience. With his in-depth knowledge in all aspects of hospital operations, he is known for spearheading the company's vision and managing the entire administration and marketing of Medicover Hospitals.",
      image: Doctor2,
      alt: "Mr. P. Hari Krishna",
      experience: "18+ Years",
      procedures: "500+",
      awards: "8+",
      specialty: "Healthcare Administration",
    },
    {
      id: 3,
      name: "Dr. A. Sharath Reddy",
      title: "Executive Director",
      subtitle: "Senior Interventional Cardiologist",
      description:
        "With an unparalleled track record, Dr. Sharath Reddy is one of the few to be ranked in the league of eminent cardiologists. He specialises in interventional cardiology & echocardiography. He has fellowships in various international cardiac societies.",
      image: Doctor3,
      alt: "Dr. A. Sharath Reddy",
      experience: "20+ Years",
      procedures: "8,000+",
      awards: "25+",
      specialty: "Interventional Cardiology",
    },
    {
      id: 4,
      name: "Dr. A. R. Krishna Prasad",
      title: "Director and Chief Consultant",
      subtitle: "Cardiothoracic Surgeon",
      description:
        "Dr. A. R. Krishna Prasad is working as the Director and Chief Cardiothoracic Surgeon at Medicover Hospitals, Hyderabad. He has extensive knowledge and wide 20 Years of experience.",
      image: Doctor4,
      alt: "Dr. A. R. Krishna Prasad",
      experience: "20+ Years",
      procedures: "5,000+",
      awards: "12+",
      specialty: "Cardiothoracic Surgery",
    },
  ];

  const openModal = (leader) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="leadership-container_leadership">
      {/* Hero Section */}
      <div className="leadership-hero_leadership">
        <div className="hero-particles_leadership">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle_leadership"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="hero-overlay_leadership"></div>
        <div className="hero-content_leadership">
          <div className="hero-badge_leadership">
            <span className="badge-icon_leadership">🏥</span>
            <span>20+ Years of Excellence</span>
          </div>
          <h1 className="hero-title_leadership">
            <span className="title-gradient_leadership">Leadership</span>
            <span className="title-highlight_leadership"> Team</span>
          </h1>
          <p className="hero-tagline_leadership">
            Meet the visionaries driving healthcare transformation across India
          </p>
          <div className="hero-stats_leadership">
            <div className="stat_leadership">
              <span className="stat-number_leadership">50+</span>
              <span className="stat-label_leadership">
                Years Combined Experience
              </span>
            </div>
            <div className="stat-divider_leadership"></div>
            <div className="stat_leadership">
              <span className="stat-number_leadership">23K+</span>
              <span className="stat-label_leadership">
                Successful Procedures
              </span>
            </div>
            <div className="stat-divider_leadership"></div>
            <div className="stat_leadership">
              <span className="stat-number_leadership">100+</span>
              <span className="stat-label_leadership">
                Awards & Recognition
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Vision Values Section - NEW */}
      <div className="mission-vision-section_leadership">
        <div className="section-header_leadership">
          <span className="section-subtitle_leadership">Our Foundation</span>
          <h2 className="section-title_leadership">
            Mission, Vision &{" "}
            <span className="title-accent_leadership">Values</span>
          </h2>
          <p className="section-description_leadership">
            Guiding principles that drive our commitment to healthcare
            excellence
          </p>
        </div>

        <div className="tabs-container_leadership">
          <div className="tabs_leadership">
            <button
              className={`tab-btn_leadership ${activeTab === "vision" ? "active_leadership" : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              <span className="tab-icon_leadership">👁️</span> Our Vision
            </button>
            <button
              className={`tab-btn_leadership ${activeTab === "mission" ? "active_leadership" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              <span className="tab-icon_leadership">🎯</span> Our Mission
            </button>
            <button
              className={`tab-btn_leadership ${activeTab === "values" ? "active_leadership" : ""}`}
              onClick={() => setActiveTab("values")}
            >
              <span className="tab-icon_leadership">💎</span> Our Values
            </button>
          </div>

          <div className="tab-content_leadership">
            {activeTab === "vision" && (
              <div className="vision-content_leadership">
                <div className="vision-icon_leadership">🌟</div>
                <h3>To be India's most trusted healthcare provider</h3>
                <p>
                  We envision a future where every individual has access to
                  world-class healthcare that is compassionate, innovative, and
                  accessible to all. Our goal is to set new benchmarks in
                  medical excellence and patient care across the nation.
                </p>
                <div className="vision-stats_leadership">
                  <div>
                    <span>10+</span> Hospitals
                  </div>
                  <div>
                    <span>50+</span> Specialties
                  </div>
                  <div>
                    <span>1M+</span> Lives Touched
                  </div>
                </div>
              </div>
            )}
            {activeTab === "mission" && (
              <div className="mission-content_leadership">
                <div className="mission-icon_leadership">🎯</div>
                <h3>
                  Delivering European standard healthcare at affordable costs
                </h3>
                <p>
                  Our mission is to provide exceptional medical care using
                  cutting-edge technology, highly skilled professionals, and a
                  patient-first approach. We strive to make quality healthcare
                  accessible to every community we serve.
                </p>
                <div className="mission-points_leadership">
                  <div className="point_leadership">
                    ✅ Patient-Centered Care
                  </div>
                  <div className="point_leadership">✅ Clinical Excellence</div>
                  <div className="point_leadership">
                    ✅ Affordable Treatment
                  </div>
                  <div className="point_leadership">
                    ✅ Continuous Innovation
                  </div>
                </div>
              </div>
            )}
            {activeTab === "values" && (
              <div className="values-content_leadership">
                <div className="values-grid_leadership">
                  <div className="value-card_leadership">
                    <div className="value-icon_leadership">❤️</div>
                    <h4>Compassion</h4>
                    <p>Treating every patient with empathy and respect</p>
                  </div>
                  <div className="value-card_leadership">
                    <div className="value-icon_leadership">🔬</div>
                    <h4>Excellence</h4>
                    <p>Striving for the highest quality in everything we do</p>
                  </div>
                  <div className="value-card_leadership">
                    <div className="value-icon_leadership">🤝</div>
                    <h4>Integrity</h4>
                    <p>Honesty and transparency in all our dealings</p>
                  </div>
                  <div className="value-card_leadership">
                    <div className="value-icon_leadership">💡</div>
                    <h4>Innovation</h4>
                    <p>Embracing new ideas and technologies</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leaders Grid Section */}
      <div className="leaders-grid-section_leadership">
        <div className="section-header_leadership">
          <span className="section-subtitle_leadership">
            Our Esteemed Leaders
          </span>
          <h2 className="section-title_leadership">
            Meet Our <span className="title-accent_leadership">Leadership</span>
          </h2>
          <p className="section-description_leadership">
            Dedicated professionals committed to excellence in healthcare
          </p>
        </div>

        <div className="leaders-grid_leadership">
          {leaders.map((leader, index) => (
            <div
              className={`leader-grid-card_leadership ${index % 2 === 0 ? "slide-in-left_leadership" : "slide-in-right_leadership"}`}
              key={leader.id}
              onClick={() => openModal(leader)}
            >
              <div className="card-image-wrapper_leadership">
                <div className="card-image_leadership">
                  <img src={leader.image} alt={leader.name} />
                  <div className="card-overlay_leadership">
                    <button className="view-details-btn_leadership">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-content_leadership">
                <h3 className="card-name_leadership">{leader.name}</h3>
                <p className="card-title_leadership">{leader.title}</p>
                <p className="card-subtitle_leadership">{leader.subtitle}</p>
                <div className="card-stats_leadership">
                  <span>⭐ {leader.experience}</span>
                  <span>📊 {leader.procedures}</span>
                  <span>🏆 {leader.awards}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Timeline - NEW */}
      <div className="achievements-section_leadership">
        <div className="section-header_leadership">
          <span className="section-subtitle_leadership">Our Journey</span>
          <h2 className="section-title_leadership">
            Achievements &{" "}
            <span className="title-accent_leadership">Milestones</span>
          </h2>
          <p className="section-description_leadership">
            Celebrating our journey of excellence in healthcare
          </p>
        </div>

        <div className="timeline_leadership">
          <div className="timeline-item_leadership">
            <div className="timeline-year_leadership">2024</div>
            <div className="timeline-content_leadership">
              <h4>Best Multi-Specialty Hospital Award</h4>
              <p>
                Recognized for excellence in patient care and medical innovation
              </p>
            </div>
          </div>
          <div className="timeline-item_leadership">
            <div className="timeline-year_leadership">2023</div>
            <div className="timeline-content_leadership">
              <h4>10,000+ Successful Heart Surgeries</h4>
              <p>Milestone achievement in cardiac care excellence</p>
            </div>
          </div>
          <div className="timeline-item_leadership">
            <div className="timeline-year_leadership">2022</div>
            <div className="timeline-content_leadership">
              <h4>NABH Accreditation</h4>
              <p>National accreditation for quality and patient safety</p>
            </div>
          </div>
          <div className="timeline-item_leadership">
            <div className="timeline-year_leadership">2020</div>
            <div className="timeline-content_leadership">
              <h4>Expanded to 5 Cities</h4>
              <p>Bringing quality healthcare to more communities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us - NEW Section */}
      <div className="why-choose-section_leadership">
        <div className="section-header_leadership">
          <span className="section-subtitle_leadership">Why Choose Us</span>
          <h2 className="section-title_leadership">
            What Makes Us{" "}
            <span className="title-accent_leadership">Different</span>
          </h2>
          <p className="section-description_leadership">
            Discover the Medicover advantage
          </p>
        </div>

        <div className="why-grid_leadership">
          <div className="why-card_leadership">
            <div className="why-icon_leadership">🏆</div>
            <h3>20+ Years of Excellence</h3>
            <p>Decades of trust and successful patient outcomes</p>
          </div>
          <div className="why-card_leadership">
            <div className="why-icon_leadership">👨‍⚕️</div>
            <h3>Top Specialists</h3>
            <p>Renowned doctors from across the globe</p>
          </div>
          <div className="why-card_leadership">
            <div className="why-icon_leadership">🔬</div>
            <h3>Advanced Technology</h3>
            <p>Latest medical equipment and techniques</p>
          </div>
          <div className="why-card_leadership">
            <div className="why-icon_leadership">💊</div>
            <h3>Affordable Care</h3>
            <p>Quality treatment at reasonable costs</p>
          </div>
          <div className="why-card_leadership">
            <div className="why-icon_leadership">🌍</div>
            <h3>Global Standards</h3>
            <p>European standard healthcare in India</p>
          </div>
          <div className="why-card_leadership">
            <div className="why-icon_leadership">🤝</div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock patient assistance</p>
          </div>
        </div>
      </div>

      {/* CTA Banner - NEW Design */}
      <div className="cta-banner_leadership">
        <div className="cta-banner-content_leadership">
          <div className="cta-banner-text_leadership">
            <h2>Ready to experience world-class healthcare?</h2>
            <p>Book your consultation with our expert doctors today</p>
          </div>
          <button
            onClick={handleBookAppointment}
            className="cta-banner-btn_leadership"
          >
            Schedule Appointment →
          </button>
        </div>
      </div>

      {/* Modal for Leader Details */}
      {isModalOpen && selectedLeader && (
        <div className="modal-overlay_leadership" onClick={closeModal}>
          <div
            className="modal-content_leadership"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close_leadership" onClick={closeModal}>
              ×
            </button>
            <div className="modal-body_leadership">
              <div className="modal-image_leadership">
                <img src={selectedLeader.image} alt={selectedLeader.name} />
              </div>
              <div className="modal-info_leadership">
                <h2>{selectedLeader.name}</h2>
                <p className="modal-title_leadership">{selectedLeader.title}</p>
                <p className="modal-subtitle_leadership">
                  {selectedLeader.subtitle}
                </p>
                <div className="modal-stats_leadership">
                  <div className="modal-stat_leadership">
                    <span className="stat-value_leadership">
                      {selectedLeader.experience}
                    </span>
                    <span className="stat-name_leadership">Experience</span>
                  </div>
                  <div className="modal-stat_leadership">
                    <span className="stat-value_leadership">
                      {selectedLeader.procedures}
                    </span>
                    <span className="stat-name_leadership">Procedures</span>
                  </div>
                  <div className="modal-stat_leadership">
                    <span className="stat-value_leadership">
                      {selectedLeader.awards}
                    </span>
                    <span className="stat-name_leadership">Awards</span>
                  </div>
                </div>
                <p className="modal-description_leadership">
                  {selectedLeader.description}
                </p>
                {selectedLeader.quote && (
                  <div className="modal-quote_leadership">
                    <span className="quote-mark_leadership">"</span>
                    <p>{selectedLeader.quote}</p>
                  </div>
                )}
                <div className="modal-actions_leadership">
                  <a href="tel:+917013525030" className="modal-call_leadership">
                    📞 Call Now
                  </a>
                  <button
                    onClick={handleBookAppointment}
                    className="modal-book_leadership"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leadership;
