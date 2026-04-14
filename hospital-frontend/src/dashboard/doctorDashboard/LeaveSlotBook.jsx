import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../utils.jsx";
import "./LeaveSlotBook.css";

// Time slots available (same as booking page)
const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function LeaveSlotBook() {
  const [date, setDate] = useState("");
  const [option, setOption] = useState("leave");
  const [confirm, setConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Leave fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  // Block fields
  const [slots, setSlots] = useState([]);

  const token = localStorage.getItem("token");

  // Trigger animation on option change
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [option]);

  const handleSlotToggle = (slot) => {
    setSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  const handleSelectAllSlots = () => {
    if (slots.length === TIME_SLOTS.length) {
      setSlots([]);
    } else {
      setSlots([...TIME_SLOTS]);
    }
  };

  const handleSubmit = async () => {
    if (!confirm) {
      handleError("Please confirm before submitting");
      return;
    }

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
      if (option === "leave") {
        const leaveData = { from, to, reason };
        await axios.post("http://localhost:8080/api/doctor/leave", leaveData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        handleSuccess("✅ Leave Applied Successfully");
      }

      if (option === "block") {
        const blockData = { date, slots, reason };
        await axios.post("http://localhost:8080/api/doctor/block", blockData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        handleSuccess("✅ Slot Blocked Successfully");
      }

      setDate("");
      setFrom("");
      setTo("");
      setReason("");
      setSlots([]);
      setConfirm(false);
    } catch (err) {
      const message = err.response?.data?.message;
      if (message) {
        handleError(`⚠️ ${message}`);
      } else if (err.response?.status === 401) {
        handleError("⚠️ Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        handleError("⚠️ You don't have permission to do this.");
      } else if (err.code === "ECONNREFUSED") {
        handleError("❌ Cannot connect to server. Is the backend running?");
      } else {
        handleError("❌ Server error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setDate("");
    setFrom("");
    setTo("");
    setReason("");
    setSlots([]);
    setConfirm(false);
    handleSuccess("Form reset successfully");
  };

  const isFullDayBlock = slots.length === 0;
  const selectedCount = slots.length;
  const totalSlots = TIME_SLOTS.length;

  return (
    <div className="container_leaveBlock">
      <div className="background_leaveBlock">
        <div className="bgShape1_leaveBlock"></div>
        <div className="bgShape2_leaveBlock"></div>
        <div className="bgShape3_leaveBlock"></div>
      </div>

      <div className="card_leaveBlock">
        <div className="header_leaveBlock">
          <div className="headerIcon_leaveBlock">📅</div>
          <h2 className="title_leaveBlock">Leave & Slot Management</h2>
          <p className="subtitle_leaveBlock">
            Manage your availability efficiently
          </p>
        </div>

        <div className="form_leaveBlock">
          {/* Option Selection Cards */}
          <div className="optionCards_leaveBlock">
            <div
              className={`optionCard_leaveBlock ${option === "leave" ? "active_leaveBlock" : ""}`}
              onClick={() => {
                setOption("leave");
                setDate("");
                setFrom("");
                setTo("");
                setReason("");
                setSlots([]);
                setConfirm(false);
              }}
            >
              <div className="optionIcon_leaveBlock">🏖️</div>
              <div className="optionTitle_leaveBlock">Apply Leave</div>
              <div className="optionDesc_leaveBlock">Request time off</div>
            </div>
            <div
              className={`optionCard_leaveBlock ${option === "block" ? "active_leaveBlock" : ""}`}
              onClick={() => {
                setOption("block");
                setDate("");
                setFrom("");
                setTo("");
                setReason("");
                setSlots([]);
                setConfirm(false);
              }}
            >
              <div className="optionIcon_leaveBlock">🚫</div>
              <div className="optionTitle_leaveBlock">Block Slots</div>
              <div className="optionDesc_leaveBlock">Block time slots</div>
            </div>
          </div>

          {/* Conditional Forms with Animation */}
          <div
            className={`formContent_leaveBlock ${animate ? "fadeOut_leaveBlock" : "fadeIn_leaveBlock"}`}
          >
            {option === "leave" && (
              <div className="section_leaveBlock">
                <div className="sectionHeader_leaveBlock">
                  <span className="sectionIcon_leaveBlock">🏖️</span>
                  <h3 className="sectionTitle_leaveBlock">Leave Application</h3>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">📅</span>
                    From Date
                  </label>
                  <input
                    type="date"
                    className="input_leaveBlock"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <div className="inputFocus_leaveBlock"></div>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">📅</span>
                    To Date
                  </label>
                  <input
                    type="date"
                    className="input_leaveBlock"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    min={from || new Date().toISOString().split("T")[0]}
                  />
                  <div className="inputFocus_leaveBlock"></div>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">💬</span>
                    Reason
                  </label>
                  <textarea
                    className="textarea_leaveBlock"
                    placeholder="Please provide reason for leave..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="3"
                  />
                  <div className="inputFocus_leaveBlock"></div>
                </div>
              </div>
            )}

            {option === "block" && (
              <div className="section_leaveBlock">
                <div className="sectionHeader_leaveBlock">
                  <span className="sectionIcon_leaveBlock">🚫</span>
                  <h3 className="sectionTitle_leaveBlock">Block Time Slots</h3>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">📆</span>
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="input_leaveBlock"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <div className="inputFocus_leaveBlock"></div>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">⏰</span>
                    Time Slots
                  </label>

                  <div className="statsBar_leaveBlock">
                    <div className="stat_leaveBlock">
                      <span className="statValue_leaveBlock">
                        {selectedCount}
                      </span>
                      <span className="statLabel_leaveBlock">Selected</span>
                    </div>
                    <div className="stat_leaveBlock">
                      <span className="statValue_leaveBlock">
                        {totalSlots - selectedCount}
                      </span>
                      <span className="statLabel_leaveBlock">Available</span>
                    </div>
                    <div className="stat_leaveBlock">
                      <span className="statValue_leaveBlock">{totalSlots}</span>
                      <span className="statLabel_leaveBlock">Total</span>
                    </div>
                  </div>

                  <div className="slotsGrid_leaveBlock">
                    <button
                      type="button"
                      className={`slotSelectBtn_leaveBlock ${isFullDayBlock ? "fullDayActive_leaveBlock" : ""}`}
                      onClick={handleSelectAllSlots}
                    >
                      <span>
                        {slots.length === totalSlots
                          ? "📆 Clear All"
                          : "📆 Select All"}
                      </span>
                    </button>

                    {TIME_SLOTS.map((slot, index) => (
                      <button
                        key={slot}
                        type="button"
                        className={`slotSelectBtn_leaveBlock ${slots.includes(slot) ? "slotSelected_leaveBlock" : ""}`}
                        onClick={() => handleSlotToggle(slot)}
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <span className="slotIcon_leaveBlock">
                          {slots.includes(slot) ? "✅" : "⭕"}
                        </span>
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div
                    className={`hint_leaveBlock ${isFullDayBlock ? "warning_leaveBlock" : "info_leaveBlock"}`}
                  >
                    <span className="hintIcon_leaveBlock">💡</span>
                    {isFullDayBlock
                      ? "No slots selected = FULL DAY BLOCK (All slots will be blocked)"
                      : `Selected ${selectedCount} slot(s) to block`}
                  </div>
                </div>

                <div className="formGroup_leaveBlock">
                  <label className="label_leaveBlock">
                    <span className="labelIcon_leaveBlock">📝</span>
                    Reason (Optional)
                  </label>
                  <textarea
                    className="textarea_leaveBlock"
                    placeholder="Reason for blocking slot..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="2"
                  />
                  <div className="inputFocus_leaveBlock"></div>
                </div>

                {/* Preview Section */}
                <div className="preview_leaveBlock">
                  <div className="previewHeader_leaveBlock">
                    <span>📋</span>
                    <strong>Summary</strong>
                  </div>
                  {isFullDayBlock ? (
                    <div className="fullDayPreview_leaveBlock">
                      <span>🔴</span> FULL DAY BLOCK - All slots will be
                      unavailable
                    </div>
                  ) : (
                    <div className="slotsPreview_leaveBlock">
                      {slots.length === 0 ? (
                        <div className="emptyPreview_leaveBlock">
                          ⚠️ No slots selected
                        </div>
                      ) : (
                        slots.map((slot) => (
                          <span key={slot} className="previewSlot_leaveBlock">
                            🚫 {slot}
                          </span>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Confirmation Checkbox */}
          <div className="confirmWrapper_leaveBlock">
            <label className="checkboxLabel_leaveBlock">
              <input
                type="checkbox"
                className="checkbox_leaveBlock"
                checked={confirm}
                onChange={() => setConfirm(!confirm)}
              />
              <span className="checkboxCustom_leaveBlock"></span>
              <span className="checkboxText_leaveBlock">
                I confirm that all information provided is accurate
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="buttonGroup_leaveBlock">
            <button
              className="button_leaveBlock buttonSecondary_leaveBlock"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              <span>🔄</span> Reset
            </button>
            <button
              className="button_leaveBlock buttonPrimary_leaveBlock"
              onClick={handleSubmit}
              disabled={isSubmitting || (option === "block" && !date)}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner_leaveBlock"></span> Processing...
                </>
              ) : (
                <>
                  <span>✓</span> Confirm & Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveSlotBook;
