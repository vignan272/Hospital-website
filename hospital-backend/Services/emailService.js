const nodemailer = require("nodemailer");

// ========================
// MAIL TRANSPORT
// ========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ========================
// COMMON TEMPLATE
// ========================
const baseTemplate = (title, content) => `
  <div style="font-family:Arial;padding:20px">
    <h2>${title}</h2>
    ${content}
    <br/>
    <hr/>
    <p style="font-size:12px;color:gray;">
      Hospital Management System
    </p>
  </div>
`;

// ========================
// 1. ADMIN EMAIL (Booking)
// ========================
const sendAdminAppointmentEmail = async (patient, doctor, appointment) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Appointment Booking",
    html: baseTemplate(
      "New Appointment Request",
      `
      <p><b>Patient Name:</b> ${patient.name}</p>
      <p><b>Doctor Name:</b> ${doctor.name}</p>
      <p><b>Hospital:</b> ${appointment.hospital?.name || "N/A"}</p>

      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <p><b>Description:</b> ${appointment.description}</p>

      <br/>
      <a href="http://localhost:5173/admin">Go to Admin Panel</a>
    `,
    ),
  });
};

// ========================
// 2. DOCTOR EMAIL (Admin Approved)
// ========================
const sendDoctorAppointmentEmail = async (doctor, patient, appointment) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: doctor.email,
    subject: "New Appointment Assigned",
    html: baseTemplate(
      "Appointment Assigned",
      `
      <p><b>Patient:</b> ${patient.name}</p>
      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <p>Please review and accept/reject.</p>

      <a href="http://localhost:5173/doctor">Doctor Dashboard</a>
    `,
    ),
  });
};

// ========================
// 3. PATIENT EMAIL (Final Confirm)
// ========================
const sendPatientAppointmentEmail = async (patient, doctor, appointment) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: patient.email,
    subject: "Appointment Confirmed",
    html: baseTemplate(
      "Appointment Confirmed",
      `
      <p><b>Patient:</b> ${patient.name}</p>
      <p><b>Doctor:</b> ${doctor.name}</p>

      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <p style="color:green;"><b>Status:</b> Confirmed</p>
    `,
    ),
  });
};

// ========================
// 4. OP SUBMITTED (PATIENT)
// ========================
const sendOpSubmittedEmail = async (patient) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: patient.email,
    subject: "OP Submitted",
    html: baseTemplate(
      "OP Submitted Successfully",
      `
      <p>Dear ${patient.name},</p>
      <p>Your OP form has been submitted successfully.</p>
      <p>Doctor will review shortly.</p>
    `,
    ),
  });
};

// ========================
// 5. OP READY (DOCTOR)
// ========================
const sendDoctorOpReadyEmail = async (doctor, patient) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: doctor.email,
    subject: "OP Ready for Review",
    html: baseTemplate(
      "OP Ready",
      `
      <p><b>Patient:</b> ${patient.name}</p>
      <p>OP form is ready for review.</p>

      <a href="http://localhost:5173/doctor">Open Dashboard</a>
    `,
    ),
  });
};

// ========================
// 6. FINAL DECISION EMAIL
// ========================
const sendFinalDecisionEmail = async (patient, doctor, decision) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: patient.email,
    subject: "Appointment Update",
    html: baseTemplate(
      "Appointment Status Update",
      `
      <p><b>Doctor:</b> ${doctor.name}</p>
      <p>Status: 
        <b style="color:${decision === "Confirmed" ? "green" : "red"}">
          ${decision}
        </b>
      </p>
    `,
    ),
  });
};

// ========================
// 7. CONTACT EMAIL
// ========================
const sendContactEmail = async (contact) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Message",
    html: baseTemplate(
      "New Contact Message",
      `
      <p><b>Name:</b> ${contact.name}</p>
      <p><b>Email:</b> ${contact.email}</p>
      <p>${contact.description}</p>
    `,
    ),
  });
};

// ========================
// EXPORTS
// ========================
module.exports = {
  sendAdminAppointmentEmail,
  sendDoctorAppointmentEmail,
  sendPatientAppointmentEmail,
  sendOpSubmittedEmail,
  sendDoctorOpReadyEmail,
  sendFinalDecisionEmail,
  sendContactEmail,
};
