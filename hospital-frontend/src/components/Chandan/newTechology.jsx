import React from "react";
import "./newTechology.css";

const technologies = [
  {
    title: "MRI Scan",
    img: "https://storage.googleapis.com/treatspace-prod-media/pracimg/u-2740/shutterstock_2323721305_1.jpeg",
    desc: "Advanced imaging technology for precise internal diagnosis.",
  },
  {
    title: "AI Diagnosis",
    img: "https://www.impactqa.com/wp-content/uploads/2022/02/Artificial-Intelligence-AI-and-its-Assistance-in-Medical-Diagnosis-Blog.png",
    desc: "Artificial intelligence helps doctors make faster decisions.",
  },
  {
    title: "Patient Monitoring",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    desc: "24/7 smart monitoring systems for critical patients.",
  },
  {
    title: "Robotic Surgery",
    img: "https://www.asterhospitals.in/sites/default/files/2022-10/robotic-heart-surgery.jpg",
    desc: "High precision robotic systems for complex surgeries.",
  },
  {
    title: "Telemedicine",
    img: "https://www.medicaldevice-network.com/wp-content/uploads/sites/23/2023/03/Shutterstock_Buravleva_stock-scaled.jpg",
    desc: "Consult doctors remotely using secure video technology.",
  },
  {
    title: "CT Scan",
    img: "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/4808-ct-computed-tomography-scan",
    desc: "Detailed cross-sectional imaging for better diagnosis.",
  },
  {
    title: "Wearable Devices",
    img: "https://hospitalsmagazine.com/wp-content/uploads/2023/01/The-Best-Wearable-Devices-in-Healthcare.jpg",
    desc: "Smart health trackers to monitor patient vitals in real-time.",
  },
  {
    title: "Lab Automation",
    img: "https://clpmag.com/wp-content/uploads/2024/02/lab-automation.jpg",
    desc: "Automated lab systems for faster and accurate reports.",
  },
];

const HospitalTechnology = () => {
  return (
    <div>
      <header className="main-header_newTechnology">
        <h1>Hospital Technology</h1>
        <p>Advanced Healthcare & Smart Medical Solutions</p>
      </header>

      <div className="hero-section_newTechnology">
        Future of Healthcare Technology
      </div>

      <div className="main-container_newTechnology">
        <h2 className="title-text_newTechnology">Our Advanced Technologies</h2>

        <div className="technology-grid_newTechnology">
          {technologies.map((tech, index) => (
            <div className="technology-card_newTechnology" key={index}>
              <img
                className="tech-image_newTechnology"
                src={tech.img}
                alt={tech.title}
              />
              <div className="tech-content_newTechnology">
                <h3>{tech.title}</h3>
                <p>{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalTechnology;
