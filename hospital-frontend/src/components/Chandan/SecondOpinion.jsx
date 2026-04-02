import React, { useState } from "react";
import "./SecondOpinion.css";
import { useNavigate } from "react-router-dom";

function SecondOpinion() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || phone.length !== 10) {
      alert("Enter valid details");
      return;
    }

    setStep(2);
  };

  return (
    <section className="second-opinion_secondOpinion">
      {/* SVG FLOW */}

      <svg className="flow-svg_secondOpinion" viewBox="0 0 1200 120">
        <defs>
          <marker
            id="arrow_secondOpinion"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#2c7c88" />
          </marker>
        </defs>

        {/* FLOW PATHS */}
        <path
          d="M180 60 Q315 -20 450 60"
          className={`flow_secondOpinion ${step >= 2 ? "active_secondOpinion" : ""}`}
          markerEnd="url(#arrow_secondOpinion)"
        />

        <path
          d="M450 60 Q600 140 750 60"
          className={`flow_secondOpinion ${step >= 3 ? "active_secondOpinion" : ""}`}
          markerEnd="url(#arrow_secondOpinion)"
        />

        <path
          d="M750 60 Q885 -20 1020 60"
          className={`flow_secondOpinion ${step >= 4 ? "active_secondOpinion" : ""}`}
          markerEnd="url(#arrow_secondOpinion)"
        />
      </svg>
      {/* STEPS */}
      <div className="steps_secondOpinion">
        <div
          className={`step_secondOpinion ${step >= 1 ? "active_secondOpinion" : ""}`}
        >
          <div className="circle_secondOpinion">📝</div>
          <p>Fill the Request Callback Form</p>
        </div>

        <div
          className={`step_secondOpinion ${step >= 2 ? "active_secondOpinion" : ""}`}
        >
          <div className="circle_secondOpinion">👩‍⚕️</div>
          <p>Medical expert will contact you</p>
        </div>

        <div
          className={`step_secondOpinion ${step >= 3 ? "active_secondOpinion" : ""}`}
        >
          <div className="circle_secondOpinion">📞</div>
          <p>We’ll get you the best doctor</p>
        </div>

        <div
          className={`step_secondOpinion ${step >= 4 ? "active_secondOpinion" : ""}`}
        >
          <div className="circle_secondOpinion">🏥</div>
          <p>Decide further treatment</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content_secondOpinion">
        {step === 1 && (
          <div className="form-card_secondOpinion">
            <h2>Request Callback</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val);
              }}
            />

            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
        {step === 2 && (
          <div className="process-card_secondOpinion">
            <div className="card-left_secondOpinion">
              <h2>Connecting to Expert</h2>
              <p>Assigning a specialist</p>

              <button className="btn_secondOpinion" onClick={() => setStep(3)}>
                Next →
              </button>
            </div>

            <div className="arrow_secondOpinion">➡️</div>

            <div className="card-right_secondOpinion">
              <div className="pulse_secondOpinion">👩‍⚕️</div>
              <p>Connecting...</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="process-card_secondOpinion">
            <div className="card-left_secondOpinion">
              <h2>Calling & Matching Doctors</h2>
              <p>Finding the best doctor based on your case</p>

              <button className="btn_secondOpinion" onClick={() => setStep(4)}>
                Next →
              </button>
            </div>

            <div className="arrow_secondOpinion">→</div>

            <div className="card-right_secondOpinion">
              <div className="icon_secondOpinion">📞</div>
              <p>Calling doctors</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="process-card_secondOpinion">
            <div className="card-left_secondOpinion">
              <h2>Doctors Ready</h2>
              <p>Click below to view</p>
            </div>

            <div className="arrow_secondOpinion">➡️</div>

            <div className="card-right_secondOpinion success_secondOpinion">
              <div className="tick_secondOpinion">✅</div>
              <button
                className="btn_secondOpinion"
                onClick={() => navigate("/doctors")}
              >
                View Doctors
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SecondOpinion;
