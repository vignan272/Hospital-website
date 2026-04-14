// LeaveSlotBook.jsx
import React, { useState } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../utils.jsx"; // Update the import path
import "./LeaveSlotBook.css";

function LeaveSlotBook() {
  const [date, setDate] = useState("");
  const [option, setOption] = useState("leave"); // ✅ FIXED: Default value set to "leave"
  const [confirm, setConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Leave fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  // Block fields
  const [type, setType] = useState("FULL_DAY");
  const [slots, setSlots] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    // 🚨 DEBUG: Check if button click works
    console.log("🚨 Button Clicked");

    // 🚨 DEBUG: Log all values before submission
    console.log("📊 Form Values:", {
      option: option,
      confirm: confirm,
      from: from,
      to: to,
      date: date,
      reason: reason,
      token: token ? "✅ Present" : "❌ Missing",
    });

    // Check confirmation
    if (!confirm) {
      handleError("Please confirm before submitting");
      return;
    }

    // Validate based on option
    if (option === "leave" && (!from || !to || !reason)) {
      handleError("Please fill all leave details");
      return;
    }

    if (option === "block" && !date) {
      handleError("Please select a date");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🚀 Calling API...");

      if (option === "leave") {
        const leaveData = { from, to, reason };
        console.log("📤 Sending Leave Data:", leaveData);

        const res = await axios.post(
          "http://localhost:8080/api/doctor/leave",
          leaveData,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        console.log("✅ Leave API Response:", res.data);
        handleSuccess("✅ Leave Applied Successfully");
      }

      if (option === "block") {
        const blockData = {
          date,
          type,
          slots: slots ? slots.split(",").map((s) => s.trim()) : [],
          reason,
        };
        console.log("📤 Sending Block Data:", blockData);

        const res = await axios.post(
          "http://localhost:8080/api/doctor/block",
          blockData,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        console.log("✅ Block API Response:", res.data);
        handleSuccess("✅ Slot Blocked Successfully");
      }

      console.log("✅ API Success - Resetting form");

      // Reset form on success
      setConfirm(false);
      setOption("leave"); // ✅ Reset to default "leave" instead of empty
      setDate("");
      setFrom("");
      setTo("");
      setReason("");
      setSlots("");
      setType("FULL_DAY");
    } catch (err) {
      console.log("❌ ERROR DETAILS:", err);
      console.log("❌ Error Response:", err.response?.data);
      console.log("❌ Error Status:", err.response?.status);

      // IMPROVED ERROR HANDLING WITH TOAST
      const message = err.response?.data?.message;

      if (message) {
        // Backend sent a specific validation message
        handleError(`⚠️ ${message}`);
      } else if (err.response?.status === 401) {
        handleError("⚠️ Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        handleError("⚠️ You don't have permission to do this.");
      } else if (err.code === "ECONNREFUSED") {
        handleError("❌ Cannot connect to server. Is the backend running?");
      } else {
        // Generic server error
        console.error("Full error object:", err);
        handleError("❌ Server error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setOption("leave"); // ✅ Reset to default "leave"
    setDate("");
    setFrom("");
    setTo("");
    setReason("");
    setSlots("");
    setType("FULL_DAY");
    setConfirm(false);
    handleSuccess("Form reset successfully");
  };

  return (
    <div className="container_leaves">
      <div className="card_leaves">
        <div className="header_leaves">
          <h2 className="title_leaves">📅 Leave & Slot Management</h2>
          <p className="subtitle_leaves">
            Manage your availability efficiently
          </p>
        </div>

        <div className="form_leaves">
          {/* Date Selection - Only show for block option */}
          {option === "block" && (
            <div className="formGroup_leaves">
              <label className="label_leaves">
                <span className="labelIcon_leaves">📆</span>
                Select Date
              </label>
              <input
                type="date"
                className="input_leaves"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          {/* Option Selection */}
          <div className="formGroup_leaves">
            <label className="label_leaves">
              <span className="labelIcon_leaves">⚙️</span>
              Select Option
            </label>
            <select
              className="select_leaves"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="leave">🏖️ Apply Leave</option>
              <option value="block">🚫 Block Slot</option>
            </select>
          </div>

          {/* Conditional Forms */}
          {option === "leave" && (
            <div className="section_leaves fadeIn_leaves">
              <div className="sectionHeader_leaves">
                <span className="sectionIcon_leaves">🏖️</span>
                <h3 className="sectionTitle_leaves">Leave Application</h3>
              </div>

              <div className="formGroup_leaves">
                <label className="label_leaves">From Date</label>
                <input
                  type="date"
                  className="input_leaves"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div className="formGroup_leaves">
                <label className="label_leaves">To Date</label>
                <input
                  type="date"
                  className="input_leaves"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="formGroup_leaves">
                <label className="label_leaves">Reason</label>
                <textarea
                  className="textarea_leaves"
                  placeholder="Please provide reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="3"
                />
              </div>
            </div>
          )}

          {option === "block" && (
            <div className="section_leaves fadeIn_leaves">
              <div className="sectionHeader_leaves">
                <span className="sectionIcon_leaves">🚫</span>
                <h3 className="sectionTitle_leaves">Block Slot</h3>
              </div>

              <div className="formGroup_leaves">
                <label className="label_leaves">Block Type</label>
                <select
                  className="select_leaves"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="FULL_DAY">📆 Full Day</option>
                  <option value="PARTIAL">⏰ Partial</option>
                  <option value="SURGERY">🏥 Surgery</option>
                </select>
              </div>

              {type === "PARTIAL" && (
                <div className="formGroup_leaves slideDown_leaves">
                  <label className="label_leaves">Time Slots</label>
                  <input
                    type="text"
                    className="input_leaves"
                    placeholder="e.g., 10:00 AM, 11:00 AM, 2:00 PM"
                    value={slots}
                    onChange={(e) => setSlots(e.target.value)}
                  />
                  <small className="hint_leaves">
                    Separate multiple slots with commas
                  </small>
                </div>
              )}

              <div className="formGroup_leaves">
                <label className="label_leaves">Reason</label>
                <textarea
                  className="textarea_leaves"
                  placeholder="Reason for blocking slot..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Confirmation Checkbox */}
          <div className="confirmWrapper_leaves">
            <label className="checkboxLabel_leaves">
              <input
                type="checkbox"
                className="checkbox_leaves"
                checked={confirm}
                onChange={() => setConfirm(!confirm)}
              />
              <span className="checkboxText_leaves">
                I confirm that all information provided is accurate
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="buttonGroup_leaves">
            <button
              className="button_leaves buttonSecondary_leaves"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              className="button_leaves buttonPrimary_leaves"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm & Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveSlotBook;
