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
// 1. ADMIN EMAIL
// ========================
const sendAdminAppointmentEmail = async (patient, doctor, appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Appointment Booking",
    html: `
      <h2>New Appointment Request</h2>

      <p><b>Patient Name:</b> ${patient.name}</p>
      <p><b>Doctor Name:</b> ${doctor.name}</p>
      <p><b>Hospital:</b> ${appointment.hospital?.name || "N/A"}</p>

      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <br>

      <p><b>Description:</b></p>
      <blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">
        ${appointment.description}
      </blockquote>

      <br>

      <a href="http://localhost:5173/patient-login">Go to Admin Panel</a>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// ========================
// 2. DOCTOR EMAIL
// ========================
const sendDoctorAppointmentEmail = async (doctor, patient, appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: doctor.email,
    subject: "New Appointment Approved by Admin",
    html: `
      <h2>Appointment Request</h2>

      <p><b>Patient Name:</b> ${patient.name}</p>
      <p><b>Doctor Name:</b> ${doctor.name}</p>
      <p><b>Hospital:</b> ${appointment.hospital?.name || "N/A"}</p>

      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <br>

      <p><b>Description:</b></p>
      <blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">
        ${appointment.description}
      </blockquote>

      <br>

      <p><b>Status:</b> Waiting for your approval</p>

      <a href="http://localhost:5173/patient-login">Doctor Dashboard</a>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// ========================
// 3. PATIENT EMAIL
// ========================
const sendPatientAppointmentEmail = async (patient, doctor, appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patient.email,
    subject: "Appointment Confirmed",
    html: `
      <h2>Your Appointment is Confirmed</h2>

      <p><b>Patient:</b> ${patient.name}</p>
      <p><b>Doctor:</b> ${doctor.name}</p>
      <p><b>Hospital:</b> ${appointment.hospital?.name || "N/A"}</p>

      <p><b>Date:</b> ${new Date(
        appointment.appointmentDate,
      ).toLocaleDateString()}</p>
      <p><b>Time:</b> ${appointment.appointmentTime}</p>

      <p><b>Your Description:</b> ${appointment.description}</p>

      <br>

      <p style="color:green;"><b>Status:</b> Confirmed</p>

      <p>Please arrive 10 minutes early.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ========================
// 4. CONTACT EMAIL
// ========================
const sendContactEmail = async (contact) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Message",
    html: `
      <h2>New Contact Message</h2>

      <p><b>Name:</b> ${contact.name}</p>
      <p><b>Email:</b> ${contact.email}</p>

      <p><b>Description:</b></p>
      <p>${contact.description}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendAdminAppointmentEmail,
  sendDoctorAppointmentEmail,
  sendPatientAppointmentEmail,
  sendContactEmail,
};
