import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Stethoscope,
  FileText,
  Filter,
  X,
  Search,
} from "lucide-react";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/patient-login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8080/api/patient/my-appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setAppointments(sorted);
        setFiltered(sorted);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.response?.data?.message || "Failed to load appointments");

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/patient-login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // Filter appointments
  useEffect(() => {
    let data = [...appointments];

    if (searchDate) {
      data = data.filter(
        (appt) =>
          new Date(appt.appointmentDate).toISOString().split("T")[0] ===
          searchDate,
      );
    }

    if (selectedDoctor) {
      data = data.filter((appt) => appt.doctor?.name === selectedDoctor);
    }

    if (selectedStatus) {
      data = data.filter((appt) => getStatusText(appt) === selectedStatus);
    }

    setFiltered(data);
  }, [searchDate, selectedDoctor, selectedStatus, appointments]);

  const doctorList = [
    ...new Set(
      appointments
        .filter((appt) => appt.doctor && appt.doctor.name)
        .map((a) => a.doctor.name),
    ),
  ];

  const statusList = [
    "✅ Confirmed",
    "⏳ Waiting for Admin",
    "⏳ Waiting for Doctor",
    "❌ Rejected by Admin",
    "❌ Rejected by Doctor",
  ];

  const getStatusStyle = (appt) => {
    if (appt.finalStatus === "Confirmed") {
      return {
        className: "status_confirmed_appointment",
        icon: "✅",
        text: "Confirmed",
      };
    }
    if (appt.doctorStatus === "Rejected") {
      return {
        className: "status_rejected_appointment",
        icon: "❌",
        text: "Rejected by Doctor",
      };
    }
    if (appt.adminStatus === "Rejected") {
      return {
        className: "status_rejected_appointment",
        icon: "❌",
        text: "Rejected by Admin",
      };
    }
    if (appt.adminStatus === "Pending") {
      return {
        className: "status_pending_admin_appointment",
        icon: "⏳",
        text: "Waiting for Admin",
      };
    }
    if (appt.doctorStatus === "Pending") {
      return {
        className: "status_pending_doctor_appointment",
        icon: "⏳",
        text: "Waiting for Doctor",
      };
    }
    return {
      className: "status_pending_appointment",
      icon: "⏳",
      text: "Pending",
    };
  };

  const getStatusText = (appt) => {
    if (appt.finalStatus === "Confirmed") return "✅ Confirmed";
    if (appt.doctorStatus === "Rejected") return "❌ Rejected by Doctor";
    if (appt.adminStatus === "Rejected") return "❌ Rejected by Admin";
    if (appt.adminStatus === "Pending") return "⏳ Waiting for Admin";
    if (appt.doctorStatus === "Pending") return "⏳ Waiting for Doctor";
    return "⏳ Pending";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isPastAppointment = (dateString) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  };

  const clearFilters = () => {
    setSearchDate("");
    setSelectedDoctor("");
    setSelectedStatus("");
  };

  if (loading) {
    return (
      <div className="container_appointment">
        <div className="loading_container_appointment">
          <div className="spinner_appointment"></div>
          <p>Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container_appointment">
        <div className="error_container_appointment">
          <div className="error_icon_appointment">⚠️</div>
          <h3>Error Loading Appointments</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry_btn_appointment"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container_appointment">
      <div className="header_appointment">
        <div>
          <h1 className="page_title_appointment">My Appointments</h1>
          <p className="page_subtitle_appointment">
            View and manage your medical appointments
          </p>
        </div>
        <div className="header_actions_appointment">
          <button
            className="new_appointment_btn_appointment"
            onClick={() => navigate("/book-appointment")}
          >
            + Book New Appointment
          </button>
          <button
            className="filter_toggle_btn_appointment"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
          </button>
          <div className="view_toggle_appointment">
            <button
              className={`view_btn_appointment ${viewMode === "grid" ? "active_appointment" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              ⊞
            </button>
            <button
              className={`view_btn_appointment ${viewMode === "list" ? "active_appointment" : ""}`}
              onClick={() => setViewMode("list")}
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters_panel_appointment">
          <div className="filters_header_appointment">
            <h3>Filter Appointments</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="close_filters_appointment"
            >
              <X size={20} />
            </button>
          </div>
          <div className="filters_grid_appointment">
            <div className="filter_group_appointment">
              <label>Date</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="filter_input_appointment"
              />
            </div>
            <div className="filter_group_appointment">
              <label>Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="filter_select_appointment"
              >
                <option value="">All Doctors</option>
                {doctorList.map((doc, i) => (
                  <option key={i} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter_group_appointment">
              <label>Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter_select_appointment"
              >
                <option value="">All Status</option>
                {statusList.map((status, i) => (
                  <option key={i} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(searchDate || selectedDoctor || selectedStatus) && (
            <div className="filters_actions_appointment">
              <button
                onClick={clearFilters}
                className="clear_filters_btn_appointment"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stats Summary */}
      <div className="stats_summary_appointment">
        <div className="stat_card_appointment">
          <div className="stat_value_appointment">{appointments.length}</div>
          <div className="stat_label_appointment">Total Appointments</div>
        </div>
        <div className="stat_card_appointment">
          <div className="stat_value_appointment">
            {appointments.filter((a) => a.finalStatus === "Confirmed").length}
          </div>
          <div className="stat_label_appointment">Confirmed</div>
        </div>
        <div className="stat_card_appointment">
          <div className="stat_value_appointment">
            {
              appointments.filter(
                (a) =>
                  a.adminStatus === "Pending" || a.doctorStatus === "Pending",
              ).length
            }
          </div>
          <div className="stat_label_appointment">Pending</div>
        </div>
        <div className="stat_card_appointment">
          <div className="stat_value_appointment">
            {
              appointments.filter(
                (a) =>
                  a.doctorStatus === "Rejected" || a.adminStatus === "Rejected",
              ).length
            }
          </div>
          <div className="stat_label_appointment">Rejected</div>
        </div>
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div className="empty_state_appointment">
          <div className="empty_icon_appointment">📅</div>
          <h3>No Appointments Found</h3>
          <p>
            {appointments.length === 0
              ? "You haven't booked any appointments yet."
              : "No appointments match your filters."}
          </p>
          {appointments.length === 0 && (
            <button
              onClick={() => navigate("/book-appointment")}
              className="book_first_btn_appointment"
            >
              Book Your First Appointment
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="results_info_appointment">
            <span>
              Showing {filtered.length} of {appointments.length} appointments
            </span>
          </div>
          <div className={`appointments_${viewMode}_appointment`}>
            {filtered.map((appt) => {
              const status = getStatusStyle(appt);
              const isPast = isPastAppointment(appt.appointmentDate);

              return (
                <div
                  key={appt._id}
                  className={`appointment_card_appointment ${isPast ? "past_appointment" : ""}`}
                >
                  <div className="card_header_appointment">
                    <div className="doctor_info_appointment">
                      <div className="doctor_avatar_appointment">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="doctor_name_appointment">
                          Dr. {appt.doctor?.name || "Doctor Name"}
                        </h3>
                        <p className="doctor_specialty_appointment">
                          <Stethoscope size={14} />
                          {appt.doctor?.specialization || "General Medicine"}
                        </p>
                      </div>
                    </div>
                    <div className={status.className}>
                      <span className="status_icon_appointment">
                        {status.icon}
                      </span>
                      <span className="status_text_appointment">
                        {status.text}
                      </span>
                    </div>
                  </div>

                  <div className="card_details_appointment">
                    <div className="detail_item_appointment">
                      <MapPin size={16} />
                      <span>{appt.hospital?.name || "Hospital Name"}</span>
                    </div>
                    <div className="detail_item_appointment">
                      <Calendar size={16} />
                      <span>{formatDate(appt.appointmentDate)}</span>
                    </div>
                    <div className="detail_item_appointment">
                      <Clock size={16} />
                      <span>{appt.appointmentTime}</span>
                    </div>
                    <div className="detail_item_appointment description_appointment">
                      <FileText size={16} />
                      <span>
                        {appt.description || "No description provided"}
                      </span>
                    </div>
                  </div>

                  {!isPast && status.text !== "Confirmed" && (
                    <div className="card_footer_appointment">
                      <div className="status_message_appointment">
                        Your appointment is being processed
                      </div>
                    </div>
                  )}
                  {/* ✅ FILL OP BUTTON */}
                  {appt.finalStatus === "Confirmed" && !appt.op && (
                    <div className="card_footer_appointment">
                      <button
                        className="fill_op_btn"
                        onClick={() => navigate(`/fill-op/${appt._id}`)}
                      >
                        📝 Fill OP
                      </button>
                    </div>
                  )}
                  {/* ✅ OP STATUS */}
                  {appt.op && (
                    <div className="op_status_container">
                      {appt.op.opStatus === "Pending" ? (
                        <span className="op_pending">🟡 Not Reviewed</span>
                      ) : (
                        <span className="op_reviewed">🟢 Reviewed</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyAppointments;
