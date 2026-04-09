import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./patient-portal.css";

function PatientPortal() {
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // State for dynamic data
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for notifications
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastViewedAppointments, setLastViewedAppointments] = useState(0);

  // ========== MODAL STATE ==========
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);

  // Get auth token
  const getAuthToken = () => localStorage.getItem("token");

  // ========== HANDLE VIEW RECORD ==========
  const handleViewRecord = async (appointmentId) => {
    setLoadingRecord(true);
    setShowRecordModal(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/medical-record/${appointmentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setSelectedRecord(data);
      } else {
        alert(data.message || "Record not found");
        setShowRecordModal(false);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
      setShowRecordModal(false);
    } finally {
      setLoadingRecord(false);
    }
  };

  // Fetch Medical Records
  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/patient/my-medical-records",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      let records = [];
      if (data.records && Array.isArray(data.records)) {
        records = data.records;
      } else if (data.data && Array.isArray(data.data)) {
        records = data.data;
      } else if (Array.isArray(data)) {
        records = data;
      }

      setMedicalRecords(records);

      // ========== FIXED: Extract reports from nested medicalRecord object ==========
      const allReports = [];
      records.forEach((record) => {
        // Access the nested medicalRecord property
        const medicalRecordData = record.medicalRecord;

        if (
          medicalRecordData &&
          medicalRecordData.testReports &&
          Array.isArray(medicalRecordData.testReports)
        ) {
          medicalRecordData.testReports.forEach((report) => {
            allReports.push({
              _id: report._id,
              name: `${medicalRecordData.diseases?.[0] || "Medical"} Report`,
              date: medicalRecordData.createdAt || new Date().toISOString(),
              url: report.url,
              public_id: report.public_id,
              doctorName: record.doctor?.name,
              specialization: record.doctor?.specialization,
              recordId: medicalRecordData._id,
            });
          });
        }
      });
      setReports(allReports);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      setMedicalRecords([]);
      setReports([]);
    }
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/patient/my-appointments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      let appointmentsData = [];
      if (Array.isArray(data)) {
        appointmentsData = data;
      } else if (data.appointments && Array.isArray(data.appointments)) {
        appointmentsData = data.appointments;
      } else if (data.data && Array.isArray(data.data)) {
        appointmentsData = data.data;
      }

      setAppointments(appointmentsData);

      // Calculate new appointments count
      calculateNewAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
  };

  // Calculate new appointments (confirmed appointments that are not viewed)
  const calculateNewAppointments = (appointmentsData) => {
    // Get last viewed timestamp from localStorage
    const lastViewed = localStorage.getItem("lastViewedAppointments");
    const lastViewedTime = lastViewed ? parseInt(lastViewed) : 0;

    // Count new confirmed appointments created after last viewed time
    const newAppointments = appointmentsData.filter((apt) => {
      const appointmentDate = new Date(apt.createdAt || apt.appointmentDate);
      return (
        apt.finalStatus === "Confirmed" &&
        appointmentDate.getTime() > lastViewedTime
      );
    });

    setNotificationCount(newAppointments.length);
    setLastViewedAppointments(lastViewedTime);
  };

  // Mark notifications as read when viewing appointments
  const markAppointmentsAsRead = () => {
    const currentTime = Date.now();
    localStorage.setItem("lastViewedAppointments", currentTime.toString());
    setNotificationCount(0);
    setLastViewedAppointments(currentTime);
  };

  useEffect(() => {
    try {
      const patientData = localStorage.getItem("patient");
      if (!patientData) {
        navigate("/patient-login");
        return;
      }
      setPatient(JSON.parse(patientData));

      // Fetch dynamic data
      const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchMedicalRecords(), fetchAppointments()]);
        setLoading(false);
      };
      fetchData();

      // Set up polling for new appointments every 30 seconds
      const intervalId = setInterval(() => {
        if (patientData) {
          fetchAppointments();
        }
      }, 30000);

      return () => clearInterval(intervalId);
    } catch (err) {
      console.error("Invalid data");
      localStorage.removeItem("patient");
      navigate("/patient-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("patient");
    navigate("/patient-login");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // If clicking on appointments tab, mark notifications as read
    if (tabId === "appointments") {
      markAppointmentsAsRead();
    }
  };

  const navItems = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "medical", label: "Medical History", icon: "📋" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "appointments", label: "My Appointments", icon: "📅" },
  ];

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDayNumber = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birth = new Date(dob);
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  if (!patient || loading) {
    return (
      <div className="loading_patient_portal">
        <div className="loader_patient_portal">
          <div className="spinner_patient_portal"></div>
          <p>{!patient ? "Redirecting..." : "Loading your health data..."}</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <div className="profile-card_patient_portal">
              <div className="profile-header_patient_portal">
                <div className="profile-avatar_patient_portal">
                  <img
                    src={
                      patient.photo ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(patient.name) +
                        "&background=00d4ff&color=fff&size=110"
                    }
                    alt="profile"
                    className="avatar-image_patient_portal"
                  />
                  <div className="avatar-badge_patient_portal">✓</div>
                </div>
                <div className="profile-info_patient_portal">
                  <div className="profile-name_patient_portal">
                    {patient.name}
                  </div>
                  <div className="profile-role_patient_portal">
                    Verified Patient
                  </div>
                  <div className="stats-grid_patient_portal">
                    <div className="stat-item_patient_portal">
                      <span className="stat-icon_patient_portal">🩺</span>
                      <span className="stat-label_patient_portal">
                        Patient ID
                      </span>
                      <span className="stat-value_patient_portal">
                        #P-{patient.id?.slice(-5).toUpperCase()}
                      </span>
                    </div>
                    <div className="stat-item_patient_portal">
                      <span className="stat-icon_patient_portal">📅</span>
                      <span className="stat-label_patient_portal">
                        Member Since
                      </span>
                      <span className="stat-value_patient_portal">
                        {patient.createdAt?.split("-")[0]?.toUpperCase() ||
                          "2024"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-grid_patient_portal">
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🎂</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">Age</div>
                    <div className="info-card-value_patient_portal">
                      {calculateAge(patient.dateOfBirth)} years
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🚻</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">Gender</div>
                    <div className="info-card-value_patient_portal">
                      {patient.gender}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🩸</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">
                      Blood Type
                    </div>
                    <div className="info-card-value_patient_portal">
                      {patient.bloodType || "O+"}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">📅</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">
                      Date of Birth
                    </div>
                    <div className="info-card-value_patient_portal">
                      {formatDate(patient.dateOfBirth)}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">📧</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">Email</div>
                    <div className="info-card-value_patient_portal">
                      {patient.email}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">📞</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">Phone</div>
                    <div className="info-card-value_patient_portal">
                      {patient.phone}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🏠</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">
                      Address
                    </div>
                    <div className="info-card-value_patient_portal">
                      {patient.address}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🛡️</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">
                      Insurance
                    </div>
                    <div className="info-card-value_patient_portal">
                      {patient.insurance
                        ? patient.insuranceCompany
                        : "Not Available"}
                    </div>
                  </div>
                </div>
                <div className="info-card_patient_portal">
                  <div className="info-card-icon_patient_portal">🚨</div>
                  <div className="info-card-content_patient_portal">
                    <div className="info-card-label_patient_portal">
                      Emergency Contact
                    </div>
                    <div className="info-card-value_patient_portal">
                      {patient.emergencyContact}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      // ==================== MEDICAL HISTORY - WITH VIEW DETAILS BUTTON ====================
      case "medical":
        return (
          <div className="section_patient_portal">
            <div className="section-header_patient_portal">
              <div className="section-title_patient_portal">
                <span className="section-title-icon_patient_portal">🩺</span>
                Medical History
              </div>
              <div className="view-all_patient_portal">
                {medicalRecords.length} Records
              </div>
            </div>
            {medicalRecords.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6c7a91",
                }}
              >
                <span style={{ fontSize: "3rem" }}>📭</span>
                <p>No medical records found</p>
              </div>
            ) : (
              <div className="history-timeline_patient_portal">
                {medicalRecords.map((record, index) => {
                  // Get the nested medical record data
                  const medicalData = record.medicalRecord || {};
                  return (
                    <div
                      key={record.appointmentId || index}
                      className="timeline-item_patient_portal"
                    >
                      <div className="timeline-icon_patient_portal">
                        {record.doctor?.specialization === "Neurology"
                          ? "🧠"
                          : "🩺"}
                      </div>
                      <div className="timeline-content_patient_portal">
                        <div className="timeline-title_patient_portal">
                          {record.doctor?.name || "Doctor"} -{" "}
                          {record.doctor?.specialization || "Consultation"}
                        </div>
                        <div className="timeline-date_patient_portal">
                          {formatDate(medicalData.createdAt)} •{" "}
                          {record.doctor?.name}
                        </div>

                        {/* Diseases Section */}
                        {medicalData.diseases &&
                          medicalData.diseases.length > 0 && (
                            <div className="timeline-diseases_patient_portal">
                              <strong>Diseases:</strong>{" "}
                              {medicalData.diseases.join(", ")}
                            </div>
                          )}

                        {/* Treatments Section */}
                        {medicalData.treatments &&
                          medicalData.treatments.length > 0 && (
                            <div className="timeline-treatments_patient_portal">
                              <strong>Treatments:</strong>{" "}
                              {medicalData.treatments.join(", ")}
                            </div>
                          )}

                        {/* Prescriptions Section */}
                        {medicalData.prescriptions &&
                          medicalData.prescriptions.length > 0 && (
                            <div className="timeline-prescriptions_patient_portal">
                              <strong>Prescriptions:</strong>{" "}
                              {medicalData.prescriptions.join(", ")}
                            </div>
                          )}

                        {/* Notes Section */}
                        {medicalData.notes && (
                          <div className="timeline-notes_patient_portal">
                            <strong>Notes:</strong> {medicalData.notes}
                          </div>
                        )}

                        {/* Test Reports Info */}
                        <div className="timeline-desc_patient_portal">
                          📄 {medicalData.testReports?.length || 0} test
                          report(s) available
                        </div>

                        {/* ========== VIEW DETAILS BUTTON ========== */}
                        <button
                          className="view-details-btn_patient_portal"
                          onClick={() => handleViewRecord(record.appointmentId)}
                        >
                          👁️ View Full Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      // ==================== REPORTS - FIXED VERSION ====================
      case "reports":
        // ========== FIXED: Extract test reports from nested medicalRecord object ==========
        const allReports = medicalRecords
          .filter(
            (item) => item.medicalRecord && item.medicalRecord.testReports,
          )
          .flatMap((item) => {
            const medicalData = item.medicalRecord;
            return medicalData.testReports.map((testReport, idx) => ({
              _id: testReport._id || `${medicalData._id}_${idx}`,
              name: `${medicalData.diseases?.[0] || "Medical"} Report - ${formatDate(medicalData.createdAt)}`,
              diseaseName:
                medicalData.diseases?.join(", ") || "General Checkup",
              url: testReport.url,
              date: medicalData.createdAt,
              doctorName: item.doctor?.name,
              specialization: item.doctor?.specialization,
              recordId: medicalData._id,
              prescriptions: medicalData.prescriptions,
              treatments: medicalData.treatments,
            }));
          });

        // Handle view report
        const handleViewReport = (url) => {
          window.open(url, "_blank");
        };

        // Handle download report
        const handleDownloadReport = async (url, fileName) => {
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName || "medical-report.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
          } catch (error) {
            console.error("Error downloading report:", error);
            alert("Failed to download report. Please try again.");
          }
        };

        return (
          <div className="section_patient_portal">
            <div className="section-header_patient_portal">
              <div className="section-title_patient_portal">
                <span className="section-title-icon_patient_portal">📄</span>
                Medical Reports
              </div>
              <div className="view-all_patient_portal">
                {allReports.length} Reports
              </div>
            </div>
            {allReports.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6c7a91",
                }}
              >
                <span style={{ fontSize: "3rem" }}>📭</span>
                <p>No reports found</p>
                <p style={{ fontSize: "0.85rem", marginTop: "10px" }}>
                  Reports will appear here once doctors upload test results.
                </p>
              </div>
            ) : (
              <div className="reports-list_patient_portal">
                {allReports.map((report) => (
                  <div key={report._id} className="report-card_patient_portal">
                    <div className="report-card-header_patient_portal">
                      <div className="report-icon_patient_portal">
                        {report.url?.includes(".pdf") ? "📑" : "🖼️"}
                      </div>
                      <div className="report-main-info_patient_portal">
                        <div className="report-title_patient_portal">
                          {report.name}
                        </div>
                        <div className="report-meta_patient_portal">
                          <span className="report-disease_patient_portal">
                            🏥 {report.diseaseName}
                          </span>
                          <span className="report-date_patient_portal">
                            📅 {formatDate(report.date)}
                          </span>
                        </div>
                        <div className="report-doctor_patient_portal">
                          👨‍⚕️ Dr. {report.doctorName} ({report.specialization})
                        </div>
                      </div>
                    </div>
                    <div className="report-card-actions_patient_portal">
                      <button
                        className="view-btn_patient_portal"
                        onClick={() => handleViewReport(report.url)}
                      >
                        👁️ View Report
                      </button>
                      <button
                        className="download-btn_patient_portal"
                        onClick={() =>
                          handleDownloadReport(
                            report.url,
                            `${report.diseaseName}_Report_${formatDate(report.date)}.pdf`,
                          )
                        }
                      >
                        ⬇️ Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      // ==================== APPOINTMENTS - DYNAMIC ====================
      case "appointments":
        return (
          <div className="section_patient_portal">
            <div className="section-header_patient_portal">
              <div className="section-title_patient_portal">
                <span className="section-title-icon_patient_portal">📅</span>
                My Appointments
              </div>
              <div className="view-all_patient_portal">
                {appointments.length} Total
              </div>
            </div>
            {appointments.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6c7a91",
                }}
              >
                <span style={{ fontSize: "3rem" }}>📭</span>
                <p>No appointments found</p>
              </div>
            ) : (
              <div className="appointments-list_patient_portal">
                {appointments.map((appointment, index) => (
                  <div
                    key={appointment._id || index}
                    className="appointment-card_patient_portal"
                  >
                    <div className="appointment-date_patient_portal">
                      <div className="appointment-day_patient_portal">
                        {getDayNumber(appointment.appointmentDate)}
                      </div>
                      <div className="appointment-month_patient_portal">
                        {getMonthName(appointment.appointmentDate)}
                      </div>
                    </div>
                    <div className="appointment-details_patient_portal">
                      <div className="appointment-doctor_patient_portal">
                        {appointment.doctor?.name || "Doctor"}
                      </div>
                      <div className="appointment-type_patient_portal">
                        {appointment.doctor?.specialization || "Consultation"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#8a99b0",
                          marginTop: "2px",
                        }}
                      >
                        {appointment.hospital?.name || "Hospital"}
                      </div>
                    </div>
                    <div className="appointment-time_patient_portal">
                      {appointment.appointmentTime}
                    </div>
                    <div
                      className={`status-badge_patient_portal ${
                        appointment.finalStatus === "Confirmed"
                          ? "status-confirmed_patient_portal"
                          : "status-pending_patient_portal"
                      }`}
                    >
                      {appointment.finalStatus === "Confirmed"
                        ? "✓ Confirmed"
                        : "⏳ Pending"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="patient-portal-container_patient_portal">
      {/* Animated Background */}
      <div className="animated-bg_patient_portal">
        <div className="floating-element_patient_portal floating-1_patient_portal">
          🩺
        </div>
        <div className="floating-element_patient_portal floating-2_patient_portal">
          💊
        </div>
        <div className="floating-element_patient_portal floating-3_patient_portal">
          🏥
        </div>
        <div className="floating-element_patient_portal floating-4_patient_portal">
          ❤️
        </div>
      </div>

      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left_patient_portal">
          <div
            className="profile-circle_patient_portal"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {patient.photo ? (
              <img
                src={patient.photo}
                alt={patient.name}
                className="profile-circle-img_patient_portal"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="profile-circle-initial_patient_portal"
              style={{ display: patient.photo ? "none" : "flex" }}
            >
              {patient.name ? patient.name.charAt(0).toUpperCase() : "P"}
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="profile-dropdown_patient_portal">
              <div className="dropdown-item_patient_portal">
                <span>👤</span> My Profile
              </div>
              <div className="dropdown-item_patient_portal">
                <span>⚙️</span> Settings
              </div>
              <hr className="dropdown-divider_patient_portal" />
              <div
                className="dropdown-item_patient_portal"
                onClick={handleLogout}
              >
                <span>🚪</span> Log Out
              </div>
            </div>
          )}

          <div className="welcome-text_patient_portal">
            <span className="welcome-greeting_patient_portal">
              Welcome back,
            </span>
            <span className="welcome-name_patient_portal">
              {patient.name?.split(" ")[1] || patient.name}!
            </span>
          </div>
        </div>

        <div className="topbar-right_patient_portal">
          <div className="top-tabs_patient_portal">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={
                  activeTab === item.id ? "active-tab_patient_portal" : ""
                }
                onClick={() => handleTabChange(item.id)}
              >
                <span className="tab-icon_patient_portal">{item.icon}</span>
                <span className="tab-text_patient_portal">{item.label}</span>
              </button>
            ))}
          </div>

          <button className="notification-btn_patient_portal">
            🔔
            {notificationCount > 0 && (
              <span className="notification-badge_patient_portal">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content_patient_portal">{renderContent()}</main>

      {/* ========== MEDICAL RECORD POPUP MODAL ========== */}
      {showRecordModal && (
        <div
          className="modal-overlay_patient_portal"
          onClick={() => setShowRecordModal(false)}
        >
          <div
            className="modal-card_patient_portal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header_patient_portal">
              <h3>📋 Medical Record Details</h3>
              <button
                className="close-modal_patient_portal"
                onClick={() => setShowRecordModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body_patient_portal">
              {loadingRecord ? (
                <div className="spinner_patient_portal"></div>
              ) : selectedRecord ? (
                <div className="record-details_patient_portal">
                  <div className="detail-row_patient_portal">
                    <strong>👨‍⚕️ Doctor:</strong>{" "}
                    {selectedRecord.doctor?.name || "N/A"}
                  </div>
                  <div className="detail-row_patient_portal">
                    <strong>🏥 Specialization:</strong>{" "}
                    {selectedRecord.doctor?.specialization || "N/A"}
                  </div>

                  {selectedRecord.diseases &&
                    selectedRecord.diseases.length > 0 && (
                      <div className="detail-section_patient_portal">
                        <strong>🦠 Diseases:</strong>
                        <div className="tags_patient_portal">
                          {selectedRecord.diseases.map((d, i) => (
                            <span key={i} className="tag_patient_portal">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedRecord.treatments &&
                    selectedRecord.treatments.length > 0 && (
                      <div className="detail-section_patient_portal">
                        <strong>🏥 Treatments:</strong>
                        <div className="tags_patient_portal">
                          {selectedRecord.treatments.map((t, i) => (
                            <span
                              key={i}
                              className="tag-treatment_patient_portal"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedRecord.prescriptions &&
                    selectedRecord.prescriptions.length > 0 && (
                      <div className="detail-section_patient_portal">
                        <strong>💊 Prescriptions:</strong>
                        <ul className="prescription-list_patient_portal">
                          {selectedRecord.prescriptions.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {selectedRecord.notes && (
                    <div className="detail-section_patient_portal">
                      <strong>📝 Doctor Notes:</strong>
                      <p className="notes-box_patient_portal">
                        {selectedRecord.notes}
                      </p>
                    </div>
                  )}

                  {selectedRecord.testReports &&
                    selectedRecord.testReports.length > 0 && (
                      <div className="detail-section_patient_portal">
                        <strong>📂 Attached Reports:</strong>
                        <div className="report-links_patient_portal">
                          {selectedRecord.testReports.map((report, i) => (
                            <a
                              key={i}
                              href={report.url}
                              target="_blank"
                              rel="noreferrer"
                              className="report-link_patient_portal"
                            >
                              📄 View Report {i + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <p className="no-data_patient_portal">
                  No medical record data available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPortal;
