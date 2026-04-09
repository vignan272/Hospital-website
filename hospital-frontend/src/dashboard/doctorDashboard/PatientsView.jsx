import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleError } from "../../utils";

function PatientsView({ searchTerm, token }) {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientMedicalRecords, setPatientMedicalRecords] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingMedicalRecords, setLoadingMedicalRecords] = useState(false);
  const [modalType, setModalType] = useState(null); // 'history' or 'medical'

  const fetchPatients = async () => {
    setLoadingPatients(true);
    try {
      const res = await axios.get("http://localhost:8080/api/doctor/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data.patients);
    } catch {
      handleError("Failed to load patients");
    } finally {
      setLoadingPatients(false);
    }
  };

  const fetchPatientHistory = async (patientId) => {
    setLoadingHistory(true);
    setModalType("history");
    setSelectedPatient(patientId);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/doctor/patients/${patientId}/history`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setPatientHistory(res.data);
    } catch {
      handleError("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchMedicalRecords = async (patientId) => {
    setLoadingMedicalRecords(true);
    setModalType("medical");
    setSelectedPatient(patientId);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/doctor/patients/${patientId}/medical-records`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setPatientMedicalRecords(res.data);
    } catch {
      handleError("Failed to load medical records");
    } finally {
      setLoadingMedicalRecords(false);
    }
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setModalType(null);
    setPatientHistory([]);
    setPatientMedicalRecords([]);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone?.includes(searchTerm) ||
      p._id?.slice(-5).includes(searchTerm),
  );

  return (
    <div className="appointments-section_Dashboard animate-fadeInUp_Dashboard">
      <div className="section-header_Dashboard">
        <h2>👥 My Patients</h2>
        <p>All patients treated by you</p>
      </div>

      {loadingPatients ? (
        <div className="loading-container_Dashboard">
          <div className="spinner_Dashboard"></div>
          <p>Loading patients...</p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="empty-state_Dashboard">
          <div className="empty-emoji_Dashboard">👤</div>
          <h3>No Patients Found</h3>
        </div>
      ) : (
        <div className="appointments-grid_Dashboard">
          {filteredPatients.map((p, index) => (
            <div
              key={p._id}
              className="appointment-card_Dashboard animate-card_Dashboard"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-header_Dashboard">
                <div className="patient-info_Dashboard">
                  <img
                    src={
                      p.photo || `https://ui-avatars.com/api/?name=${p.name}`
                    }
                    alt="patient"
                    className="patient-avatar_Dashboard"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="patient-name_Dashboard">{p.name}</h3>
                    <p className="patient-email_Dashboard">{p.email}</p>
                  </div>
                </div>
                <span className="status-badge_Dashboard status-accepted_Dashboard">
                  ID: {p._id.slice(-5)}
                </span>
              </div>

              <div className="card-body_Dashboard">
                <div className="info-grid_Dashboard">
                  <div className="info-item_Dashboard">
                    <span>📞</span>
                    <div>
                      <p className="info-label_Dashboard">Phone</p>
                      <p className="info-value_Dashboard">{p.phone}</p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>📍</span>
                    <div>
                      <p className="info-label_Dashboard">Address</p>
                      <p className="info-value_Dashboard">
                        {p.address || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>🎂</span>
                    <div>
                      <p className="info-label_Dashboard">DOB</p>
                      <p className="info-value_Dashboard">
                        {p.dateOfBirth
                          ? new Date(p.dateOfBirth).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>⚧️</span>
                    <div>
                      <p className="info-label_Dashboard">Gender</p>
                      <p className="info-value_Dashboard">
                        {p.gender || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>🩸</span>
                    <div>
                      <p className="info-label_Dashboard">Blood</p>
                      <p className="info-value_Dashboard">
                        {p.bloodType || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>🚨</span>
                    <div>
                      <p className="info-label_Dashboard">Emergency</p>
                      <p className="info-value_Dashboard">
                        {p.emergencyContact || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="info-item_Dashboard">
                    <span>🏥</span>
                    <div>
                      <p className="info-label_Dashboard">Insurance</p>
                      <p className="info-value_Dashboard">
                        {p.insurance
                          ? p.insuranceCompany || "Yes"
                          : "No Insurance"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="card-actions_Dashboard"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    className="action-btn_Dashboard review-btn_Dashboard"
                    onClick={() => fetchPatientHistory(p._id)}
                  >
                    📅 Appointment History
                  </button>
                  <button
                    className="action-btn_Dashboard review-btn_Dashboard"
                    onClick={() => fetchMedicalRecords(p._id)}
                    style={{ backgroundColor: "#4CAF50" }}
                  >
                    🏥 View Medical Records
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Patient History or Medical Records */}
      {selectedPatient && (
        <div className="op-modal-overlay_Dashboard" onClick={closeModal}>
          <div
            className="op-modal_Dashboard"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px", width: "90%" }}
          >
            <div className="op-modal-header_Dashboard">
              <h2>
                {modalType === "history"
                  ? "📅 Appointment History"
                  : "🏥 Medical Records"}
              </h2>
              <button className="modal-close_Dashboard" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="op-modal-body_Dashboard">
              {modalType === "history" && (
                <>
                  {loadingHistory ? (
                    <div className="loading-container_Dashboard">
                      <div className="spinner_Dashboard"></div>
                      <p>Loading history...</p>
                    </div>
                  ) : patientHistory.length === 0 ? (
                    <div className="empty-state_Dashboard">
                      <div className="empty-emoji_Dashboard">📅</div>
                      <h3>No History Found</h3>
                      <p>This patient has no past appointments</p>
                    </div>
                  ) : (
                    patientHistory.map((h) => (
                      <div
                        key={h._id}
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid var(--border)",
                          marginBottom: "12px",
                          background: "var(--gray-bg)",
                          borderRadius: "var(--radius)",
                        }}
                      >
                        <p>
                          <strong>👨‍⚕️ Doctor:</strong> {h.doctor?.name}
                        </p>
                        <p>
                          <strong>🎯 Specialization:</strong>{" "}
                          {h.doctor?.specialization}
                        </p>
                        <p>
                          <strong>🏥 Hospital:</strong> {h.hospital?.name}
                        </p>
                        <p>
                          <strong>📅 Date:</strong>{" "}
                          {new Date(h.appointmentDate).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>⏰ Time:</strong> {h.appointmentTime}
                        </p>
                        <p>
                          <strong>📊 Status:</strong>{" "}
                          <span
                            className={`status-badge_Dashboard ${getHistoryStatusClass(
                              h.finalStatus,
                            )}`}
                            style={{ display: "inline-flex", marginTop: "4px" }}
                          >
                            <span className="status-dot_Dashboard"></span>
                            {h.finalStatus}
                          </span>
                        </p>
                        {h.opStatus && (
                          <p>
                            <strong>🩺 OP Status:</strong> {h.opStatus}
                          </p>
                        )}
                        {h.doctorNotes && (
                          <p>
                            <strong>📝 Doctor Notes:</strong> {h.doctorNotes}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}

              {modalType === "medical" && (
                <>
                  {loadingMedicalRecords ? (
                    <div className="loading-container_Dashboard">
                      <div className="spinner_Dashboard"></div>
                      <p>Loading medical records...</p>
                    </div>
                  ) : patientMedicalRecords.length === 0 ? (
                    <div className="empty-state_Dashboard">
                      <div className="empty-emoji_Dashboard">🏥</div>
                      <h3>No Medical Records Found</h3>
                      <p>This patient has no medical records yet</p>
                    </div>
                  ) : (
                    patientMedicalRecords.map((record, index) => (
                      <div
                        key={record._id}
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid var(--border)",
                          marginBottom: "16px",
                          background: "var(--gray-bg)",
                          borderRadius: "var(--radius)",
                        }}
                      >
                        <div style={{ marginBottom: "12px" }}>
                          <strong style={{ fontSize: "16px" }}>
                            📋 Record #{index + 1}
                          </strong>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              marginTop: "4px",
                            }}
                          >
                            Created:{" "}
                            {new Date(record.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <p>
                          <strong>👨‍⚕️ Doctor:</strong> {record.doctor?.name} (
                          {record.doctor?.specialization})
                        </p>

                        {record.diseases && record.diseases.length > 0 && (
                          <div style={{ marginTop: "12px" }}>
                            <strong>🦠 Diseases:</strong>
                            <ul
                              style={{ marginTop: "4px", marginLeft: "20px" }}
                            >
                              {record.diseases.map((disease, i) => (
                                <li key={i}>{disease}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {record.treatments && record.treatments.length > 0 && (
                          <div style={{ marginTop: "12px" }}>
                            <strong>💊 Treatments:</strong>
                            <ul
                              style={{ marginTop: "4px", marginLeft: "20px" }}
                            >
                              {record.treatments.map((treatment, i) => (
                                <li key={i}>{treatment}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {record.prescriptions &&
                          record.prescriptions.length > 0 && (
                            <div style={{ marginTop: "12px" }}>
                              <strong>📝 Prescriptions:</strong>
                              <ul
                                style={{ marginTop: "4px", marginLeft: "20px" }}
                              >
                                {record.prescriptions.map((prescription, i) => (
                                  <li key={i}>{prescription}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {record.notes && (
                          <p style={{ marginTop: "12px" }}>
                            <strong>📌 Notes:</strong> {record.notes}
                          </p>
                        )}

                        {record.testReports &&
                          record.testReports.length > 0 && (
                            <div style={{ marginTop: "12px" }}>
                              <strong>📎 Test Reports:</strong>
                              <ul
                                style={{ marginTop: "4px", marginLeft: "20px" }}
                              >
                                {record.testReports.map((report, i) => (
                                  <li key={i}>
                                    <a
                                      href={report.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: "var(--primary-color)",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      View Report {i + 1}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const getHistoryStatusClass = (status) => {
  const s = status?.toLowerCase();
  if (s === "accepted" || s === "confirmed") return "status-accepted_Dashboard";
  if (s === "rejected") return "status-rejected_Dashboard";
  return "status-pending_Dashboard";
};

export default PatientsView;
