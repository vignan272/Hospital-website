import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaves.css";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/api/admin/leave-requests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setLeaves(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (doctorId, leaveId) => {
    try {
      await axios.put(
        "http://localhost:8080/api/admin/approve-leave",
        { doctorId, leaveId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // Refresh the list after approval
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Failed to approve leave request");
    }
  };

  const handleReject = async (doctorId, leaveId) => {
    try {
      await axios.put(
        "http://localhost:8080/api/admin/reject-leave",
        { doctorId, leaveId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // Refresh the list after rejection
      fetchLeaves();
    } catch (err) {
      console.error(err);
      alert("Failed to reject leave request");
    }
  };

  if (loading) {
    return (
      <div className="leaves-container">
        <h2>Leave Requests</h2>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaves-container">
        <h2>Leave Requests</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="leaves-container">
      <h2>Leave Requests</h2>

      {leaves.length === 0 ? (
        <p className="no-requests">No pending leave requests</p>
      ) : (
        <div className="leaves-grid">
          {leaves.map((leave) => (
            <div key={leave.leaveId} className="leave-card">
              <h3>{leave.doctorName}</h3>
              <p>
                <strong>From:</strong> {new Date(leave.from).toDateString()}
              </p>
              <p>
                <strong>To:</strong> {new Date(leave.to).toDateString()}
              </p>
              <p>
                <strong>Reason:</strong> {leave.reason}
              </p>

              <div className="buttons">
                <button
                  className="approve"
                  onClick={() => handleApprove(leave.doctorId, leave.leaveId)}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => handleReject(leave.doctorId, leave.leaveId)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaves;
