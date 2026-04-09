import React, { useState } from "react";

function OpReviewsView({
  ops,
  loadingOps,
  notes,
  setNotes,
  handleOpDecision,
  setSelectedOp,
}) {
  const [submittingId, setSubmittingId] = useState(null);

  const handleConfirm = async (opId) => {
    if (!notes[opId]?.trim()) {
      alert("⚠️ Please enter doctor notes before confirming");
      return;
    }
    setSubmittingId(opId);
    try {
      await handleOpDecision(opId, "Confirmed");
    } finally {
      setSubmittingId(null);
    }
  };

  const handleReject = async (opId) => {
    if (!notes[opId]?.trim()) {
      alert("⚠️ Please enter doctor notes before rejecting");
      return;
    }
    setSubmittingId(opId);
    try {
      await handleOpDecision(opId, "Rejected");
    } finally {
      setSubmittingId(null);
    }
  };

  // Filter only pending OPs (not reviewed/rejected)
  const pendingOps = ops.filter(
    (op) => op.opStatus !== "Reviewed" && op.opStatus !== "Rejected",
  );

  const reviewedOps = ops.filter(
    (op) => op.opStatus === "Reviewed" || op.opStatus === "Rejected",
  );

  if (loadingOps) {
    return (
      <div className="loading-container_Dashboard">
        <div className="spinner_Dashboard"></div>
        <p>Loading OPs...</p>
      </div>
    );
  }

  return (
    <div className="ops-section_Dashboard animate-fadeInUp_Dashboard">
      <div className="section-header_Dashboard">
        <h2>🩺 OP Reviews</h2>
        <p>Review and manage patient operation requests</p>
      </div>

      {/* Pending OPs Section */}
      {pendingOps.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px", marginBottom: "15px" }}>
            ⏳ Pending Reviews ({pendingOps.length})
          </h3>
          <div className="appointments-grid_Dashboard">
            {pendingOps.map((op, index) => (
              <div
                key={op._id}
                className="appointment-card_Dashboard op-card_Dashboard"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Card content for pending OPs */}
                <div className="card-header_Dashboard">
                  <div className="patient-info_Dashboard">
                    <div className="patient-avatar_Dashboard">
                      {op.patient?.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="patient-name_Dashboard">
                        {op.patient?.name || "Unknown"}
                      </h3>
                      <p className="patient-email_Dashboard">
                        {op.patient?.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <span className="status-badge_Dashboard status-pending_Dashboard">
                    <span className="status-dot_Dashboard"></span>
                    Pending
                  </span>
                </div>

                <div className="card-body_Dashboard">
                  <div className="info-grid_Dashboard">
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">📅</span>
                      <div>
                        <p className="info-label_Dashboard">Date</p>
                        <p className="info-value_Dashboard">
                          {op.appointment?.appointmentDate
                            ? new Date(
                                op.appointment.appointmentDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">⏰</span>
                      <div>
                        <p className="info-label_Dashboard">Time</p>
                        <p className="info-value_Dashboard">
                          {op.appointment?.appointmentTime || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">⚖️</span>
                      <div>
                        <p className="info-label_Dashboard">Weight</p>
                        <p className="info-value_Dashboard">
                          {op.weight ? `${op.weight} kg` : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">🩺</span>
                      <div>
                        <p className="info-label_Dashboard">Checkup Type</p>
                        <p className="info-value_Dashboard">
                          {op.healthCheckupType || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="medical-info_Dashboard">
                    <div className="medical-row_Dashboard">
                      <span className="medical-icon_Dashboard">🤒</span>
                      <div>
                        <p className="info-label_Dashboard">Symptoms</p>
                        <p className="info-value_Dashboard">
                          {op.symptoms || "No symptoms reported"}
                        </p>
                      </div>
                    </div>
                    <div className="medical-row_Dashboard">
                      <span className="medical-icon_Dashboard">📜</span>
                      <div>
                        <p className="info-label_Dashboard">Medical History</p>
                        <p className="info-value_Dashboard">
                          {op.medicalHistory || "No medical history"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {op.uploadedReports?.length > 0 && (
                    <div className="reports-section_Dashboard">
                      <p className="reports-label_Dashboard">
                        📎 Attached Reports:
                      </p>
                      {op.uploadedReports.map((report, idx) => (
                        <a
                          key={idx}
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="report-link_Dashboard"
                        >
                          📄 View Report {idx + 1}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Doctor Notes Textarea - Only for pending OPs */}
                  <textarea
                    className="notes-textarea_Dashboard"
                    placeholder="Enter doctor notes (required)..."
                    value={notes[op._id] || ""}
                    onChange={(e) =>
                      setNotes({ ...notes, [op._id]: e.target.value })
                    }
                    rows="4"
                  />
                  {(!notes[op._id] || !notes[op._id].trim()) && (
                    <p
                      className="validation-hint"
                      style={{
                        color: "#ff9800",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      ⚠️ Doctor notes are required
                    </p>
                  )}
                </div>

                <div className="card-actions_Dashboard">
                  <button
                    className="action-btn_Dashboard accept-btn_Dashboard"
                    onClick={() => handleConfirm(op._id)}
                    disabled={submittingId === op._id || !notes[op._id]?.trim()}
                  >
                    {submittingId === op._id ? "⏳ Processing..." : "✔ Confirm"}
                  </button>
                  <button
                    className="action-btn_Dashboard reject-btn_Dashboard"
                    onClick={() => handleReject(op._id)}
                    disabled={submittingId === op._id || !notes[op._id]?.trim()}
                  >
                    {submittingId === op._id ? "⏳ Processing..." : "✖ Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Reviewed OPs Section */}
      {reviewedOps.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>
            ✅ Reviewed OPs ({reviewedOps.length})
          </h3>
          <div className="appointments-grid_Dashboard">
            {reviewedOps.map((op, index) => (
              <div
                key={op._id}
                className="appointment-card_Dashboard op-card_Dashboard"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="card-header_Dashboard">
                  <div className="patient-info_Dashboard">
                    <div className="patient-avatar_Dashboard">
                      {op.patient?.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="patient-name_Dashboard">
                        {op.patient?.name || "Unknown"}
                      </h3>
                      <p className="patient-email_Dashboard">
                        {op.patient?.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`status-badge_Dashboard ${
                      op.opStatus === "Reviewed"
                        ? "status-accepted_Dashboard"
                        : "status-rejected_Dashboard"
                    }`}
                  >
                    <span className="status-dot_Dashboard"></span>
                    {op.opStatus}
                  </span>
                </div>

                <div className="card-body_Dashboard">
                  <div className="info-grid_Dashboard">
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">📅</span>
                      <div>
                        <p className="info-label_Dashboard">Date</p>
                        <p className="info-value_Dashboard">
                          {new Date(
                            op.appointment?.appointmentDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="info-item_Dashboard">
                      <span className="info-icon_Dashboard">⏰</span>
                      <div>
                        <p className="info-label_Dashboard">Time</p>
                        <p className="info-value_Dashboard">
                          {op.appointment?.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`status-footer_Dashboard ${
                    op.opStatus === "Reviewed"
                      ? "accepted-footer_Dashboard"
                      : "rejected-footer_Dashboard"
                  }`}
                >
                  {op.opStatus === "Reviewed" ? "✅" : "❌"}
                  {op.doctorNotes || "No notes provided"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {pendingOps.length === 0 && reviewedOps.length === 0 && (
        <div className="empty-state_Dashboard">
          <div className="empty-emoji_Dashboard">📋</div>
          <h3>No OPs available</h3>
          <p>When patients submit OPs, they'll appear here</p>
        </div>
      )}
    </div>
  );
}

export default OpReviewsView;
