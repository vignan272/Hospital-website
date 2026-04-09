import React, { useState } from "react";
import "./AppointmentsView.css";

function AppointmentsView({
  appointments,
  loading,
  stats,
  activeFilter,
  setActiveFilter,
  searchTerm,
  handleAccept,
  handleReject,
  getOpByAppointment,
  setSelectedOp,
  refreshAppointments,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    prescriptions: [""],
    diseases: [""],
    treatments: [""],
    notes: "",
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // View Record Modal States
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewRecordData, setViewRecordData] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);

  const normalizeStatus = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "confirmed") return "accepted";
    return s;
  };

  const handleUploadClick = (app) => {
    setSelectedAppointment(app);
    setShowModal(true);
  };

  const handleViewRecord = async (appointmentId) => {
    setLoadingRecord(true);
    setShowViewModal(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/doctor/medical-record/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setViewRecordData(data);
      } else {
        alert(data.message || "Failed to fetch record");
        setShowViewModal(false);
      }
    } catch (err) {
      console.error("Error fetching record:", err);
      alert("Failed to load medical record");
      setShowViewModal(false);
    } finally {
      setLoadingRecord(false);
    }
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleNotesChange = (e) => {
    setFormData({ ...formData, notes: e.target.value });
  };

  // ✅ FIXED: Handle file change with append functionality and duplicate prevention
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Check for duplicate files
    const existingFileNames = new Set(formData.files.map((f) => f.name));
    const uniqueNewFiles = newFiles.filter(
      (file) => !existingFileNames.has(file.name),
    );

    if (uniqueNewFiles.length !== newFiles.length) {
      const duplicateCount = newFiles.length - uniqueNewFiles.length;
      alert(`${duplicateCount} duplicate file(s) were skipped`);
    }

    // Check total files (existing + new unique files)
    const totalFiles = [...formData.files, ...uniqueNewFiles];

    if (totalFiles.length > 5) {
      alert(
        `Max 5 files allowed. You have ${formData.files.length} file(s) and tried to add ${uniqueNewFiles.length} new file(s).`,
      );
      e.target.value = null; // Reset input
      return;
    }

    // Validate PDFs only
    const invalidFiles = uniqueNewFiles.filter(
      (file) => file.type !== "application/pdf",
    );

    if (invalidFiles.length > 0) {
      alert(
        `Only PDF files are allowed. ${invalidFiles.length} file(s) were not added.`,
      );
      e.target.value = null; // Reset input
      return;
    }

    // ✅ Append new files to existing files
    setFormData({
      ...formData,
      files: totalFiles,
    });

    // 🔥 IMPORTANT: reset input so same file can be selected again
    e.target.value = null;
  };

  const removeFile = (index) => {
    const updated = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: updated });
  };

  const handleSubmit = async () => {
    // Validation
    if (
      formData.prescriptions.every((p) => p.trim() === "") &&
      formData.diseases.every((d) => d.trim() === "") &&
      formData.treatments.every((t) => t.trim() === "")
    ) {
      alert("⚠️ Please add at least one prescription, disease, or treatment");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();

    data.append(
      "prescriptions",
      JSON.stringify(formData.prescriptions.filter((p) => p.trim() !== "")),
    );
    data.append(
      "diseases",
      JSON.stringify(formData.diseases.filter((d) => d.trim() !== "")),
    );
    data.append(
      "treatments",
      JSON.stringify(formData.treatments.filter((t) => t.trim() !== "")),
    );
    data.append("notes", formData.notes);

    formData.files.forEach((file) => {
      data.append("reports", file);
    });

    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/api/doctor/add-record/${selectedAppointment._id}`;

      console.log("📤 Uploading to:", url);
      console.log("🔑 Token exists:", !!token);
      console.log("📋 Appointment ID:", selectedAppointment._id);
      console.log("📦 Form data contents:", {
        prescriptions: formData.prescriptions.filter((p) => p.trim()),
        diseases: formData.diseases.filter((d) => d.trim()),
        treatments: formData.treatments.filter((t) => t.trim()),
        notes: formData.notes,
        filesCount: formData.files.length,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response status text:", response.statusText);

      // Try to get response body for error details
      let responseBody;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseBody = await response.json();
        console.log("📡 Response body:", responseBody);
      } else {
        responseBody = await response.text();
        console.log("📡 Response text:", responseBody);
      }

      if (!response.ok) {
        const errorMessage =
          responseBody?.message || responseBody?.error || "Upload failed";
        throw new Error(errorMessage);
      }

      alert("✅ Record uploaded successfully!");

      if (refreshAppointments) {
        await refreshAppointments();
      } else {
        window.location.reload();
      }

      setShowModal(false);
      setFormData({
        prescriptions: [""],
        diseases: [""],
        treatments: [""],
        notes: "",
        files: [],
      });
      setSelectedAppointment(null);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert(`❌ Upload failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === "accepted" || s === "confirmed")
      return "status-accepted_appointment_view";
    if (s === "rejected") return "status-rejected_appointment_view";
    return "status-pending_appointment_view";
  };

  const filteredAppointments =
    activeFilter === "all"
      ? appointments.filter(
          (app) =>
            app.patient?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            app.patient?.email
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()),
        )
      : appointments
          .filter((a) => normalizeStatus(a.finalStatus) === activeFilter)
          .filter(
            (app) =>
              app.patient?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              app.patient?.email
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );

  return (
    <div className="appointments-section_appointment_view animate-fadeInUp_appointment_view">
      {/* STATS */}
      <div className="stats-container_appointment_view">
        <div className="stat-card_appointment_view stat-total_appointment_view">
          <div className="stat-icon_appointment_view">📊</div>
          <div className="stat-info_appointment_view">
            <h3 className="stat-value_appointment_view">{stats.total}</h3>
            <p className="stat-label_appointment_view">Total</p>
          </div>
          <div className="stat-trend_appointment_view trend-up_appointment_view">
            ↑ 12%
          </div>
        </div>
        <div className="stat-card_appointment_view stat-pending_appointment_view">
          <div className="stat-icon_appointment_view">⏳</div>
          <div className="stat-info_appointment_view">
            <h3 className="stat-value_appointment_view">{stats.pending}</h3>
            <p className="stat-label_appointment_view">Pending</p>
          </div>
        </div>
        <div className="stat-card_appointment_view stat-accepted_appointment_view">
          <div className="stat-icon_appointment_view">✅</div>
          <div className="stat-info_appointment_view">
            <h3 className="stat-value_appointment_view">{stats.accepted}</h3>
            <p className="stat-label_appointment_view">Accepted</p>
          </div>
        </div>
        <div className="stat-card_appointment_view stat-rejected_appointment_view">
          <div className="stat-icon_appointment_view">❌</div>
          <div className="stat-info_appointment_view">
            <h3 className="stat-value_appointment_view">{stats.rejected}</h3>
            <p className="stat-label_appointment_view">Rejected</p>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-section_appointment_view">
        <div className="filter-tabs_appointment_view">
          {["all", "pending", "accepted", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-tab_appointment_view ${
                activeFilter === f ? "active_appointment_view" : ""
              }`}
            >
              {f === "all" && "All"}
              {f === "pending" && "Pending"}
              {f === "accepted" && "Accepted"}
              {f === "rejected" && "Rejected"}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      {loading ? (
        <div className="loading-container_appointment_view">
          <div className="spinner_appointment_view"></div>
          <p>Loading appointments...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="empty-state_appointment_view">
          <div className="empty-emoji_appointment_view">📭</div>
          <h3>No Appointments Found</h3>
          <p>You're all caught up! 🎉</p>
        </div>
      ) : (
        <div className="appointments-grid_appointment_view">
          {filteredAppointments.map((app, index) => (
            <div
              key={app._id}
              className="appointment-card_appointment_view animate-card_appointment_view"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-header_appointment_view">
                <div className="patient-info_appointment_view">
                  <div
                    className="patient-avatar_appointment_view"
                    style={{
                      background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    }}
                  >
                    {app.patient?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="patient-name_appointment_view">
                      {app.patient?.name}
                    </h3>
                    <p className="patient-email_appointment_view">
                      {app.patient?.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`status-badge_appointment_view ${getStatusClass(app.finalStatus)}`}
                >
                  <span className="status-dot_appointment_view"></span>
                  {/* Show appropriate status text */}
                  {app.finalStatus === "Confirmed" &&
                  app.doctorStatus === "Accepted"
                    ? "Confirmed"
                    : app.finalStatus === "Pending" &&
                        app.adminStatus === "Accepted"
                      ? "Awaiting Doctor"
                      : app.finalStatus === "Rejected"
                        ? "Rejected"
                        : app.finalStatus}
                </span>
              </div>

              <div className="card-body_appointment_view">
                <div className="info-grid_appointment_view">
                  <div className="info-item_appointment_view">
                    <span className="info-icon_appointment_view">🏥</span>
                    <div>
                      <p className="info-label_appointment_view">Hospital</p>
                      <p className="info-value_appointment_view">
                        {app.hospital?.name}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_appointment_view">
                    <span className="info-icon_appointment_view">📝</span>
                    <div>
                      <p className="info-label_appointment_view">Description</p>
                      <p className="info-value_appointment_view">
                        {app.description || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_appointment_view">
                    <span className="info-icon_appointment_view">📅</span>
                    <div>
                      <p className="info-label_appointment_view">Date</p>
                      <p className="info-value_appointment_view">
                        {new Date(app.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_appointment_view">
                    <span className="info-icon_appointment_view">⏰</span>
                    <div>
                      <p className="info-label_appointment_view">Time</p>
                      <p className="info-value_appointment_view">
                        {app.appointmentTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Accept/Reject buttons for admin-approved appointments */}
              {app.adminStatus === "Accepted" &&
                app.doctorStatus === "Pending" &&
                app.finalStatus === "Pending" && (
                  <div
                    className="card-actions_appointment_view"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <button
                      className="action-btn_appointment_view accept-btn_doctor"
                      onClick={() => handleAccept(app._id)}
                      style={{ flex: 1 }}
                    >
                      ✅ Accept Appointment
                    </button>
                    <button
                      className="action-btn_appointment_view reject-btn_doctor"
                      onClick={() => handleReject(app._id)}
                      style={{ flex: 1 }}
                    >
                      ❌ Reject Appointment
                    </button>
                  </div>
                )}

              {/* Existing logic for Confirmed appointments */}
              {app.finalStatus === "Confirmed" && (
                <div className="card-actions_appointment_view">
                  {(() => {
                    const op = getOpByAppointment(app._id);

                    if (!op) {
                      return (
                        <button
                          disabled
                          className="action-btn_appointment_view disabled-btn_appointment_view"
                        >
                          ⏳ OP Not Filled
                        </button>
                      );
                    }

                    if (op.opStatus !== "Reviewed") {
                      return (
                        <button
                          className="action-btn_appointment_view review-btn_appointment_view"
                          onClick={() => setSelectedOp(op)}
                        >
                          🩺 Review OP
                        </button>
                      );
                    }

                    if (app.medicalRecord) {
                      return (
                        <button
                          className="action-btn_appointment_view view-btn_appointment_view"
                          onClick={() => handleViewRecord(app._id)}
                        >
                          👁 View Record
                        </button>
                      );
                    }

                    return (
                      <button
                        className="action-btn_appointment_view upload-btn_appointment_view"
                        onClick={() => handleUploadClick(app)}
                      >
                        ⬆ Upload Record
                      </button>
                    );
                  })()}
                </div>
              )}

              {/* Status footer for finalized appointments */}
              {app.finalStatus !== "Pending" && (
                <div
                  className={`status-footer_appointment_view ${
                    app.finalStatus === "Confirmed"
                      ? "accepted-footer_appointment_view"
                      : "rejected-footer_appointment_view"
                  }`}
                >
                  {app.finalStatus === "Confirmed"
                    ? "✔ Appointment Confirmed by Doctor"
                    : "✖ Appointment Declined by Doctor"}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MEDICAL RECORD MODAL */}
      {showModal && (
        <div className="modal-overlay_appointment_view">
          <div className="modal-box_appointment_view">
            <div className="modal-header_appointment_view">
              <h2>📋 Upload Medical Record</h2>
              <button
                className="modal-close_appointment_view"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body_appointment_view">
              {/* PRESCRIPTIONS */}
              <div className="form-section_appointment_view">
                <label className="form-label_appointment_view">
                  💊 Prescriptions
                </label>
                {formData.prescriptions.map((item, index) => (
                  <div
                    key={index}
                    className="array-input-group_appointment_view"
                  >
                    <input
                      type="text"
                      value={item}
                      className="form-input_appointment_view"
                      placeholder={`Prescription ${index + 1}`}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          "prescriptions",
                          e.target.value,
                        )
                      }
                    />
                    {formData.prescriptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField("prescriptions", index)}
                        className="remove-btn_appointment_view"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("prescriptions")}
                  className="add-btn_appointment_view"
                >
                  + Add Prescription
                </button>
              </div>

              {/* DISEASES */}
              <div className="form-section_appointment_view">
                <label className="form-label_appointment_view">
                  🦠 Diseases
                </label>
                {formData.diseases.map((item, index) => (
                  <div
                    key={index}
                    className="array-input-group_appointment_view"
                  >
                    <input
                      type="text"
                      value={item}
                      className="form-input_appointment_view"
                      placeholder={`Disease ${index + 1}`}
                      onChange={(e) =>
                        handleArrayChange(index, "diseases", e.target.value)
                      }
                    />
                    {formData.diseases.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField("diseases", index)}
                        className="remove-btn_appointment_view"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("diseases")}
                  className="add-btn_appointment_view"
                >
                  + Add Disease
                </button>
              </div>

              {/* TREATMENTS */}
              <div className="form-section_appointment_view">
                <label className="form-label_appointment_view">
                  🏥 Treatments
                </label>
                {formData.treatments.map((item, index) => (
                  <div
                    key={index}
                    className="array-input-group_appointment_view"
                  >
                    <input
                      type="text"
                      value={item}
                      className="form-input_appointment_view"
                      placeholder={`Treatment ${index + 1}`}
                      onChange={(e) =>
                        handleArrayChange(index, "treatments", e.target.value)
                      }
                    />
                    {formData.treatments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField("treatments", index)}
                        className="remove-btn_appointment_view"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("treatments")}
                  className="add-btn_appointment_view"
                >
                  + Add Treatment
                </button>
              </div>

              {/* NOTES */}
              <div className="form-section_appointment_view">
                <label className="form-label_appointment_view">📝 Notes</label>
                <textarea
                  name="notes"
                  className="form-textarea_appointment_view"
                  placeholder="Additional notes..."
                  value={formData.notes}
                  onChange={handleNotesChange}
                  rows="4"
                />
              </div>

              {/* FILE UPLOAD */}
              <div className="form-section_appointment_view">
                <label className="form-label_appointment_view">
                  📎 Reports (PDF only)
                </label>
                <div className="file-upload-area_appointment_view">
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    id="file-upload_appointment_view"
                    className="file-input_appointment_view"
                  />
                  <label
                    htmlFor="file-upload_appointment_view"
                    className={`file-label_appointment_view ${
                      formData.files.length >= 5
                        ? "disabled_appointment_view"
                        : ""
                    }`}
                    style={{
                      opacity: formData.files.length >= 5 ? 0.5 : 1,
                      cursor:
                        formData.files.length >= 5 ? "not-allowed" : "pointer",
                    }}
                  >
                    📁 Choose Files
                  </label>
                  <p className="file-hint_appointment_view">
                    Max 5 PDFs • {formData.files.length}/5 selected
                  </p>
                </div>
                {formData.files.length > 0 && (
                  <div className="file-list_appointment_view">
                    {formData.files.map((file, idx) => (
                      <div key={idx} className="file-item_appointment_view">
                        <span>📄 {file.name}</span>
                        <button
                          onClick={() => removeFile(idx)}
                          className="remove-file-btn_appointment_view"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer_appointment_view">
              <button
                onClick={handleSubmit}
                className="submit-btn_appointment_view"
                disabled={isSubmitting}
              >
                {isSubmitting ? "⏳ Uploading..." : "✅ Submit Record"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-btn_appointment_view"
                disabled={isSubmitting}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW RECORD MODAL */}
      {showViewModal && (
        <div className="modal-overlay_appointment_view">
          <div
            className="modal-box_appointment_view"
            style={{ maxWidth: "600px" }}
          >
            <div className="modal-header_appointment_view">
              <h2>📄 Medical Record Details</h2>
              <button
                className="modal-close_appointment_view"
                onClick={() => setShowViewModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body_appointment_view">
              {loadingRecord ? (
                <div className="loading-container_appointment_view">
                  <div className="spinner_appointment_view"></div>
                  <p>Loading record...</p>
                </div>
              ) : viewRecordData ? (
                <div className="view-record-content">
                  <div className="record-section">
                    <h4>💊 Prescriptions</h4>
                    <ul>
                      {viewRecordData.prescriptions?.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                      {(!viewRecordData.prescriptions ||
                        viewRecordData.prescriptions.length === 0) && (
                        <li className="no-data">No prescriptions recorded</li>
                      )}
                    </ul>
                  </div>

                  <div className="record-section">
                    <h4>🦠 Diagnosed Diseases</h4>
                    <ul>
                      {viewRecordData.diseases?.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                      {(!viewRecordData.diseases ||
                        viewRecordData.diseases.length === 0) && (
                        <li className="no-data">No diseases recorded</li>
                      )}
                    </ul>
                  </div>

                  <div className="record-section">
                    <h4>🏥 Treatments</h4>
                    <ul>
                      {viewRecordData.treatments?.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                      {(!viewRecordData.treatments ||
                        viewRecordData.treatments.length === 0) && (
                        <li className="no-data">No treatments recorded</li>
                      )}
                    </ul>
                  </div>

                  {viewRecordData.notes && (
                    <div className="record-section">
                      <h4>📝 Doctor's Notes</h4>
                      <p>{viewRecordData.notes}</p>
                    </div>
                  )}

                  {viewRecordData.testReports?.length > 0 && (
                    <div className="record-section">
                      <h4>📎 Test Reports</h4>
                      <div className="file-list_appointment_view">
                        {viewRecordData.testReports.map((report, idx) => (
                          <a
                            key={idx}
                            href={report.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-item_appointment_view"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>📄 Report {idx + 1}</span>
                            <span className="info-icon_appointment_view">
                              🔗
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-data">
                  No medical record found for this appointment.
                </p>
              )}
            </div>

            <div className="modal-footer_appointment_view">
              <button
                onClick={() => setShowViewModal(false)}
                className="submit-btn_appointment_view"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsView;
