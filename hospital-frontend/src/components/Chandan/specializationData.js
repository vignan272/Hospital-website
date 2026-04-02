import { partial } from "lodash";

const specializationData = {
  cardiology: {
    title: "Cardiology",
    para: "Cardiology is a medical specialty that focuses on the diagnosis, treatment, and prevention of diseases related to the heart and blood vessels. Cardiologists are trained to manage a wide range of cardiovascular conditions, including coronary artery disease, heart failure, arrhythmias, and hypertension. They utilize various diagnostic tools such as electrocardiograms (ECGs), echocardiograms, stress tests, and cardiac catheterization to assess heart function and identify abnormalities. Treatment options in cardiology may include lifestyle modifications, medications, interventional procedures like angioplasty, and surgical interventions such as bypass surgery. Cardiologists play a crucial role in improving cardiovascular health and preventing complications associated with heart diseases.",
    image:
      "https://jtsmedicalcentre.com/wp-content/uploads/2024/12/cardiology-clinic-in-dubai-best-cardiologists-in-dubai.webp",

    description: {
      About: {
        points: [
          "Heart and blood vessel care",
          "Diagnosis of cardiac conditions",
          "Advanced treatment techniques",
          "Patient monitoring and recovery",
        ],
        icon: "🫀",
      },

      Causes: {
        points: [
          "High cholesterol levels",
          "Smoking and alcohol",
          "Sedentary lifestyle",
          "Genetic factors",
        ],
        icon: "🚬",
      },

      Symptoms: {
        points: [
          "Chest pain or discomfort",
          "Shortness of breath",
          "Irregular heartbeat",
          "Fatigue",
        ],
        icon: "😮‍💨",
      },

      Prevention: {
        points: [
          "Regular exercise",
          "Healthy diet",
          "Avoid smoking",
          "Routine checkups",
        ],
        icon: "🏃‍♂️",
      },
    },

    Conditions: [
      { name: "Angina", desc: "Chest pain", icon: "❤️‍🩹" },
      { name: "Arrhythmia", desc: "Irregular heartbeat", icon: "💓" },
      { name: "Heart Failure", desc: "Weak heart", icon: "🫀" },
      { name: "Hypertension", desc: "High BP", icon: "📈" },
      { name: "Coronary Disease", desc: "Blocked arteries", icon: "🩸" },
      { name: "Heart Attack", desc: "Cardiac arrest", icon: "⚠️" },
    ],
  },

  neurology: {
    title: "Neurology",
    para: "Neurology is a medical specialty that focuses on the diagnosis and treatment of disorders affecting the nervous system, including the brain, spinal cord, and peripheral nerves. Neurologists are trained to manage a wide range of neurological conditions, from common issues like headaches and migraines to complex diseases such as epilepsy, multiple sclerosis, and Parkinson's disease. They utilize various diagnostic tools, including imaging studies and electrophysiological tests, to identify neurological disorders and develop personalized treatment plans. Neurology plays a crucial role in improving patients' quality of life by addressing neurological symptoms and providing comprehensive care for those with chronic neurological conditions.",
    image:
      "https://wallpaperbat.com/img/1957366-online-certification-program-in-chiropractic-neurology-ccn.jpg",

    description: {
      About: {
        icon: "🌸",
        points: [
          "Women's reproductive health care",
          "Hormonal balance management",
          "Pregnancy and fertility support",
          "Preventive screenings",
        ],
      },
      Causes: {
        icon: "⚖️",
        points: [
          "Hormonal imbalance",
          "Infections",
          "Genetic factors",
          "Lifestyle changes",
        ],
      },
      Symptoms: {
        icon: "🩸",
        points: [
          "Irregular periods",
          "Pelvic pain",
          "Hormonal changes",
          "Discomfort",
        ],
      },
      Prevention: {
        icon: "🧼",
        points: [
          "Personal hygiene",
          "Regular checkups",
          "Balanced diet",
          "Healthy lifestyle",
        ],
      },
      Diagnosis: {
        icon: "🧪",
        points: [
          "Ultrasound scans",
          "Lab tests",
          "Pelvic exams",
          "Hormone testing",
        ],
      },
      Treatment: {
        icon: "💊",
        points: [
          "Medication",
          "Hormonal therapy",
          "Surgical treatment",
          "Lifestyle guidance",
        ],
      },
    },

    Conditions: [
      { name: "Stroke", desc: "Brain blockage", icon: "🧠" },
      { name: "Epilepsy", desc: "Seizures", icon: "⚡" },
      { name: "Parkinson’s", desc: "Movement issue", icon: "🧍" },
      { name: "Alzheimer’s", desc: "Memory loss", icon: "🧠" },
      { name: "Migraine", desc: "Headache", icon: "💥" },
      { name: "MS", desc: "Nerve damage", icon: "🧬" },
    ],
  },
  gynecology: {
    title: "Gynecology",
    para: "Gynecology is a medical specialty that focuses on the health of the female reproductive system, including the uterus, ovaries, fallopian tubes, and breasts. Gynecologists are trained to provide comprehensive care for women at all stages of life, from adolescence to menopause and beyond. They diagnose and treat a wide range of conditions, including menstrual disorders, hormonal imbalances, infections, and reproductive health issues. Gynecologists also offer preventive care through regular screenings such as Pap smears and breast exams. Additionally, they provide support for pregnancy and fertility concerns, ensuring that  women receive personalized care to maintain their reproductive health and overall well-being.",
    image:
      "https://ohmhospital.com/wp-content/uploads/2024/09/Best-Obstetrics-Gynecology-Hospital-in-Ahmedabad.webp",

    description: {
      About: {
        icon: "🌸",
        points: [
          "Women's reproductive health care",
          "Focus on hormonal balance",
          "Pregnancy and fertility support",
          "Regular screening and prevention",
        ],
      },

      Causes: {
        icon: "⚖️",
        points: [
          "Hormonal imbalance",
          "Reproductive infections",
          "Lifestyle-related issues",
          "Genetic factors",
        ],
      },

      Symptoms: {
        icon: "🩸",
        points: [
          "Irregular menstrual cycles",
          "Pelvic pain or discomfort",
          "Heavy or missed periods",
          "Hormonal fluctuations",
        ],
      },

      Prevention: {
        icon: "🧼",
        points: [
          "Maintain personal hygiene",
          "Regular health checkups",
          "Balanced diet and exercise",
          "Early medical consultation",
        ],
      },

      Diagnosis: {
        icon: "🧪",
        points: [
          "Ultrasound scanning",
          "Blood and hormone tests",
          "Pelvic examination",
          "Medical history analysis",
        ],
      },

      Treatment: {
        icon: "💊",
        points: [
          "Medication and therapy",
          "Hormonal treatments",
          "Minimally invasive procedures",
          "Lifestyle modifications",
        ],
      },
    },

    Conditions: [
      { name: "PCOS", desc: "Hormonal disorder", icon: "🌺" },
      { name: "Pregnancy Care", desc: "Maternal support", icon: "🤰" },
      { name: "Fibroids", desc: "Uterus growth", icon: "⚠️" },
      { name: "Endometriosis", desc: "Tissue disorder", icon: "🔬" },
      { name: "Infertility", desc: "Conception issues", icon: "💔" },
      { name: "Menstrual Disorders", desc: "Cycle issues", icon: "📅" },
    ],
  },

  orthopedics: {
    title: "Orthopedics",
    para: "Orthopedics is a medical specialty that focuses on the diagnosis, treatment, and prevention of disorders affecting the musculoskeletal system, which includes bones, joints, muscles, ligaments, and tendons. Orthopedic surgeons are trained to manage a wide range of conditions, from fractures and sports injuries to chronic joint diseases like arthritis. They utilize various diagnostic tools such as X-rays, MRI scans, and physical examinations to assess musculoskeletal issues and develop personalized treatment plans. Treatment options in orthopedics may include non-surgical approaches like physical therapy and medication, as well as surgical interventions such as joint replacement or fracture repair. Orthopedics plays a crucial role in improving mobility and quality of life for patients with musculoskeletal conditions.",
    image:
      "https://productimages.withfloats.com/serviceimages/tile/66a72ae3da3b21ab3bd9ab19641c81bff32a256d5fc1119a_orthopedic-surgeon-in-dallas-explain-spine-surgery",

    description: {
      About: {
        icon: "🦴",
        points: [
          "Bone and joint care",
          "Treatment of injuries",
          "Mobility restoration",
          "Advanced surgical support",
        ],
      },
      Causes: {
        icon: "⚠️",
        points: [
          "Accidents or injuries",
          "Aging",
          "Overuse of joints",
          "Bone weakness",
        ],
      },
      Symptoms: {
        icon: "🧍",
        points: ["Joint pain", "Swelling", "Stiffness", "Limited movement"],
      },
      Prevention: {
        icon: "🏃‍♂️",
        points: [
          "Regular exercise",
          "Proper posture",
          "Healthy diet",
          "Avoid injuries",
        ],
      },
      Diagnosis: {
        icon: "📸",
        points: ["X-rays", "MRI scans", "CT scans", "Physical examination"],
      },
      Treatment: {
        icon: "🔧",
        points: [
          "Physiotherapy",
          "Medication",
          "Surgical procedures",
          "Rehabilitation",
        ],
      },
    },

    Conditions: [
      { name: "Fractures", desc: "Broken bones", icon: "🦵" },
      { name: "Arthritis", desc: "Joint inflammation", icon: "🦶" },
      { name: "Osteoporosis", desc: "Weak bones", icon: "📉" },
      { name: "Back Pain", desc: "Spinal issue", icon: "🧍‍♂️" },
      { name: "Ligament Injury", desc: "Torn ligaments", icon: "🔗" },
      { name: "Joint Replacement", desc: "Surgery", icon: "⚙️" },
    ],
  },

  cardiothoracic: {
    title: "Cardiothoracic",
    para: "Cardiothoracic surgery is a specialized field of medicine that focuses on surgical procedures involving the heart, lungs, esophagus, and other organs within the chest cavity. Cardiothoracic surgeons are trained to perform complex surgeries such as coronary artery bypass grafting (CABG), heart valve repair or replacement, lung resections, and esophageal surgeries. This specialty requires a deep understanding of cardiovascular and thoracic anatomy, as well as expertise in managing critical conditions that may arise during surgery. Cardiothoracic surgery plays a vital role in treating life-threatening conditions and improving the quality of life for patients with cardiac and thoracic diseases.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",

    description: {
      About: {
        icon: "🫀",
        points: [
          "Heart and chest surgery",
          "Advanced cardiac procedures",
          "Lung-related treatments",
          "Critical surgical care",
        ],
      },
      Causes: {
        icon: "🫁",
        points: [
          "Heart disease",
          "Lung conditions",
          "Smoking",
          "Genetic issues",
        ],
      },
      Symptoms: {
        icon: "😮‍💨",
        points: [
          "Chest pain",
          "Breathing difficulty",
          "Fatigue",
          "Irregular heartbeat",
        ],
      },
      Prevention: {
        icon: "🥗",
        points: [
          "Healthy diet",
          "Avoid smoking",
          "Regular exercise",
          "Routine checkups",
        ],
      },
      Diagnosis: {
        icon: "📊",
        points: ["CT scans", "ECG tests", "Blood tests", "Imaging techniques"],
      },
      Treatment: {
        icon: "🔪",
        points: [
          "Bypass surgery",
          "Valve repair",
          "Lung surgery",
          "Post-surgery care",
        ],
      },
    },

    Conditions: [
      { name: "Bypass Surgery", desc: "Restore flow", icon: "🔁" },
      { name: "Valve Repair", desc: "Heart valves", icon: "⚙️" },
      { name: "Lung Surgery", desc: "Thoracic care", icon: "🫁" },
      { name: "Tumor Removal", desc: "Chest tumor", icon: "🔬" },
      { name: "Transplant", desc: "Organ replace", icon: "🧬" },
      { name: "Aneurysm", desc: "Vessel repair", icon: "🩸" },
    ],
  },

  criticalcare: {
    title: "Critical Care",
    para: "Critical care, also known as intensive care medicine, is a specialized branch of healthcare that focuses on the management of patients with life-threatening conditions or severe illnesses. Critical care specialists, often called intensivists, are trained to provide comprehensive care for patients who require constant monitoring and support for vital functions. This includes managing respiratory failure, cardiac emergencies, sepsis, and other critical conditions. Critical care involves the use of advanced medical technologies, such as ventilators and hemodynamic monitoring, to stabilize patients and improve their chances of recovery. The goal of critical care is to provide timely and effective interventions to save lives and enhance the quality of life for critically ill patients.",
    image:
      "https://www.biomerieux.com/content/biomerieux/nl/en/our-offer/hospital-laboratory/specialty/emergency-and-critical-care-diagnostic-solutions-v2.thumb.800.480.png?ck=",

    description: {
      About: {
        icon: "🚑",
        points: [
          "Emergency intensive care",
          "Life-saving treatments",
          "24/7 monitoring",
          "Critical condition management",
        ],
      },
      Causes: {
        icon: "🦠",
        points: [
          "Severe infections",
          "Accidents",
          "Organ failure",
          "Medical emergencies",
        ],
      },
      Symptoms: {
        icon: "📉",
        points: [
          "Low blood pressure",
          "Breathing issues",
          "Unstable vitals",
          "Loss of consciousness",
        ],
      },
      Prevention: {
        icon: "⏱️",
        points: [
          "Early diagnosis",
          "Immediate treatment",
          "Regular health checks",
          "Avoid risk factors",
        ],
      },
      Diagnosis: {
        icon: "📊",
        points: [
          "Continuous monitoring",
          "Blood tests",
          "Imaging scans",
          "Vital tracking",
        ],
      },
      Treatment: {
        icon: "🛏️",
        points: [
          "ICU care",
          "Ventilator support",
          "Medication",
          "Emergency procedures",
        ],
      },
    },

    Conditions: [
      { name: "Sepsis", desc: "Severe infection", icon: "🦠" },
      { name: "Shock", desc: "Low circulation", icon: "💉" },
      { name: "Respiratory Failure", desc: "Breathing issue", icon: "🫁" },
      { name: "Organ Failure", desc: "Multiple damage", icon: "⚠️" },
      { name: "Trauma", desc: "Accident injuries", icon: "🚨" },
      { name: "ICU Monitoring", desc: "Continuous care", icon: "📡" },
    ],
  },

  generalsurgery: {
    title: "General Surgery",
    para: "General surgery is a medical specialty that focuses on the diagnosis, treatment, and management of a wide range of surgical conditions affecting various parts of the body. General surgeons are trained to perform surgeries on the abdomen, digestive tract, breast, skin, and soft tissues. They handle both elective and emergency surgical cases, including appendectomies, hernia repairs, gallbladder removals, and biopsies. General surgery requires a comprehensive understanding of surgical techniques, patient care, and post-operative management. The goal of general surgery is to provide effective surgical interventions while ensuring patient safety and promoting optimal recovery.",
    image:
      "https://www.jeevanjyotihospitals.com/images/all-specialties/department-of-general-surgery/image.png",

    description: {
      About: {
        icon: "🔪",
        points: [
          "Surgical treatments",
          "Minimally invasive procedures",
          "Emergency surgeries",
          "Post-operative care",
        ],
      },
      Causes: {
        icon: "⚠️",
        points: [
          "Infections",
          "Injuries",
          "Internal conditions",
          "Delayed treatment",
        ],
      },
      Symptoms: {
        icon: "😖",
        points: ["Pain", "Swelling", "Fever", "Discomfort"],
      },
      Prevention: {
        icon: "🔍",
        points: [
          "Early diagnosis",
          "Regular checkups",
          "Healthy lifestyle",
          "Timely treatment",
        ],
      },
      Diagnosis: {
        icon: "🧪",
        points: ["Blood tests", "Scans", "Biopsy", "Medical evaluation"],
      },
      Treatment: {
        icon: "🏥",
        points: [
          "Surgical procedures",
          "Medication",
          "Post-care recovery",
          "Monitoring",
        ],
      },
    },

    Conditions: [
      { name: "Appendectomy", desc: "Appendix removal", icon: "🧷" },
      { name: "Hernia", desc: "Tissue repair", icon: "🧵" },
      { name: "Gallbladder", desc: "Stone removal", icon: "⚠️" },
      { name: "Biopsy", desc: "Testing tissue", icon: "🔬" },
      { name: "Tumor Removal", desc: "Cancer surgery", icon: "🧬" },
      { name: "Wound Care", desc: "Healing care", icon: "🩹" },
    ],
  },

  andrology: {
    title: "Andrology",
    para: "Andrology is a medical specialty that focuses on the diagnosis and treatment of conditions related to male reproductive health and urological issues. Andrologists are trained to manage a wide range of conditions, including infertility, erectile dysfunction, hormonal imbalances, and prostate disorders. They utilize various diagnostic tools such as semen analysis, hormone testing, and imaging studies to assess male reproductive health and develop personalized treatment plans. Andrology plays a crucial role in improving men's health and addressing issues that can impact fertility, sexual function, and overall well-being.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",

    description: {
      About: {
        icon: "🧬",
        points: [
          "Male reproductive health",
          "Hormonal balance",
          "Fertility treatment",
          "Sexual health care",
        ],
      },
      Causes: {
        icon: "⚖️",
        points: [
          "Hormonal imbalance",
          "Stress",
          "Lifestyle issues",
          "Medical conditions",
        ],
      },
      Symptoms: {
        icon: "📉",
        points: [
          "Low fertility",
          "Reduced energy",
          "Hormonal changes",
          "Performance issues",
        ],
      },
      Prevention: {
        icon: "🏋️",
        points: [
          "Healthy diet",
          "Exercise",
          "Stress management",
          "Regular checkups",
        ],
      },
      Diagnosis: {
        icon: "🧪",
        points: [
          "Lab testing",
          "Hormone analysis",
          "Medical evaluation",
          "Screening tests",
        ],
      },
      Treatment: {
        icon: "💊",
        points: [
          "Medication",
          "Therapy",
          "Lifestyle changes",
          "Hormonal treatment",
        ],
      },
    },

    Conditions: [
      { name: "Infertility", desc: "Reproductive issue", icon: "🧬" },
      { name: "ED", desc: "Performance issue", icon: "⚠️" },
      { name: "Hormone Issues", desc: "Testosterone", icon: "⚖️" },
      { name: "Prostate", desc: "Gland disorder", icon: "🧪" },
      { name: "Low Libido", desc: "Reduced drive", icon: "💔" },
      { name: "Infections", desc: "Reproductive infection", icon: "🦠" },
    ],
  },

  cosmeticsurgery: {
    title: "Cosmetic Surgery",
    para: "Cosmetic surgery is a medical specialty that focuses on enhancing and improving a person's physical appearance through surgical and non-surgical procedures. Cosmetic surgeons are trained to perform a wide range of procedures, including facelifts, rhinoplasty, liposuction, breast augmentation, and skin treatments. The goal of cosmetic surgery is to help individuals achieve their desired aesthetic goals while maintaining natural-looking results. Cosmetic surgery can address various concerns related to aging, body contouring, and skin imperfections, providing patients with increased confidence and improved self-esteem.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",

    description: {
      About: {
        icon: "✨",
        points: [
          "Enhances physical appearance",
          "Boosts confidence",
          "Surgical and non-surgical procedures",
          "Customized treatments",
        ],
      },
      Causes: {
        icon: "🪞",
        points: [
          "Appearance concerns",
          "Aging effects",
          "Skin issues",
          "Body shape concerns",
        ],
      },
      Symptoms: {
        icon: "⚠️",
        points: [
          "Wrinkles",
          "Skin sagging",
          "Uneven features",
          "Body imperfections",
        ],
      },
      Prevention: {
        icon: "🧴",
        points: [
          "Skin care routine",
          "Healthy lifestyle",
          "Hydration",
          "Sun protection",
        ],
      },
      Diagnosis: {
        icon: "🗣️",
        points: [
          "Doctor consultation",
          "Skin analysis",
          "Medical evaluation",
          "Treatment planning",
        ],
      },
      Treatment: {
        icon: "💉",
        points: [
          "Cosmetic surgery",
          "Laser treatment",
          "Skin therapy",
          "Post-care support",
        ],
      },
    },

    Conditions: [
      { name: "Rhinoplasty", desc: "Nose reshaping", icon: "👃" },
      { name: "Liposuction", desc: "Fat removal", icon: "⚙️" },
      { name: "Facelift", desc: "Skin tightening", icon: "🪞" },
      { name: "Scar Removal", desc: "Skin repair", icon: "🩹" },
      { name: "Reconstruction", desc: "Repair surgery", icon: "🔬" },
      { name: "Skin Treatment", desc: "Aesthetic care", icon: "✨" },
    ],
  },
};

export default specializationData;
