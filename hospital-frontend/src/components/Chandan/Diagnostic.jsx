import React from "react";
import "./Diagnostic.css";
const Diagnostic = () => {
  return (
    <div>
      <div class="diagnostic">
        <h2>Diagnostic & Pathology Tests</h2>

        <div class="test-container">
          {/* <!-- CARD 1 --> */}
          <div class="test-card">
            <div class="letter">0</div>

            <ul>
              <li>640 Slice CT Scanner</li>
            </ul>
          </div>

          {/* <!-- CARD 2 --> */}
          <div class="test-card">
            <div class="letter">A</div>

            <ul>
              <li>Angiogram Test</li>
              <li>Arterial Blood Gas</li>
              <li>Arthritis Test</li>
              <li>Audiometry Test</li>
              <li>Anorectal Manometry</li>
              <li>ANA (Antinuclear Antibody) Test</li>
              <li>Amylase Test</li>
              <li>Allergy Test</li>
              <li>Alkaline Phosphatase</li>
              <li>Alpha-Fetoprotein (AFP) Test</li>
            </ul>
          </div>

          {/* <!-- CARD 3 --> */}
          <div class="test-card">
            <div class="letter">B</div>

            <ul>
              <li>Blood Urea Nitrogen</li>
              <li>Bone Density Scan / DEXA Scan</li>
              <li>Blood Group Test</li>
              <li>Bone scan</li>
              <li>Biopsy</li>
              <li>Blood Culture Test</li>
              <li>Beta hCG Test</li>
            </ul>
          </div>

          {/* <!-- CARD 4 --> */}
          <div class="test-card">
            <div class="letter">C</div>

            <ul>
              <li>CBC / Haemogram Test</li>
              <li>Chest X-Ray</li>
              <li>Creatinine Blood Test</li>
              <li>CT Brain Test</li>
              <li>CRP Test</li>
              <li>C-Peptide Test</li>
              <li>Chloride Blood Test</li>
              <li>Calcium Blood Test</li>
              <li>CT Scan</li>
              <li>Cytomegalovirus Tests</li>
            </ul>
          </div>

          <div class="test-card">
            <div class="letter">D</div>
            <ul>
              <li>D-Dimer Test</li>
              <li>DNA Test</li>
              <li>Dengue IgM Test</li>
              <li>DHEA Sulfate Test</li>
              <li>Double Marker Test</li>
            </ul>
          </div>

          {/* <!-- CARD E --> */}
          <div class="test-card">
            <div class="letter">E</div>
            <ul>
              <li>ELISA Test</li>
              <li>EMG/NCV Test</li>
              <li>2D Echo Test</li>
              <li>ECG Test</li>
              <li>3-D Echo</li>
              <li>Echo Test</li>
              <li>EEG Test</li>
              <li>Electrolyte Test</li>
              <li>ELISA Test</li>
              <li>EMG/NCV Test</li>
              <li>2D Echo Test</li>
            </ul>
          </div>

          {/* <!-- CARD F --> */}
          <div class="test-card">
            <div class="letter">F</div>
            <ul>
              <li>Fasting Blood Sugar</li>
              <li>FSH - Follicle-Stimulating Hormone Test</li>
              <li>Ferritin Blood Test</li>
              <li>FNAC Test</li>
              <li>Folic Acid Test</li>
              <li>Fungal Culture Test</li>
            </ul>
          </div>

          {/* <!-- CARD G --> */}
          <div class="test-card">
            <div class="letter">G</div>
            <ul>
              <li>Globulin Test</li>
              <li>Glucose tolerance test - non-pregnant</li>
              <li>Gamma-glutamyl Transferase (GGT) Test</li>
              <li>Gram Stain Test</li>
              <li>Gallium scan</li>
              <li>G6PD Test</li>
            </ul>
          </div>

          <div class="test-card">
            <div class="letter">H</div>
            <ul>
              <li>HBA1C Test</li>
              <li>Holter Monitoring</li>
              <li>Homocysteine Test</li>
              <li>HDL test</li>
              <li>HIV Screening Test</li>
              <li>HIDA Scan</li>
              <li>Hepatitis B antibody</li>
              <li>HBsAg Test</li>
              <li>Hysterosalpingography</li>
              <li>HCV Antibody Test</li>
            </ul>
          </div>

          {/* <!-- I --> */}
          <div class="test-card">
            <div class="letter">I</div>
            <ul>
              <li>Iron Test</li>
              <li>Insulin Test</li>
            </ul>
          </div>

          {/* <!-- K --> */}
          <div class="test-card">
            <div class="letter">K</div>
            <ul>
              <li>Kidney Function Test</li>
            </ul>
          </div>

          {/* <!-- L --> */}
          <div class="test-card">
            <div class="letter">L</div>
            <ul>
              <li>Lipid Profile Test</li>
              <li>Liver Function Test</li>
              <li>Lymphoma panel Test</li>
              <li>Lipase Tests</li>
              <li>Lipoprotein Test</li>
              <li>LDL cholesterol test</li>
              <li>Lupus Anticoagulant Test</li>
              <li>LE Cell Test</li>
              <li>Liver Elastography</li>
            </ul>
          </div>

          <div class="test-card">
            <div class="letter">M</div>
            <ul>
              <li>Malaria Test</li>
              <li>Magnesium Blood Test</li>
              <li>MIBG Scan</li>
              <li>Mantoux Test</li>
              <li>Microalbumin Test</li>
              <li>Magnetic resonance imaging (MRI)</li>
              <li>Muga Scan</li>
              <li>Mammography</li>
              <li>Microfilaria Parasite Test</li>
            </ul>
          </div>

          {/* <!-- N --> */}
          <div class="test-card">
            <div class="letter">N</div>
            <ul>
              <li>Nerve conduction study</li>
            </ul>
          </div>

          {/* <!-- P (Scrollable) --> */}
          <div class="test-card">
            <div class="letter">P</div>
            <ul>
              <li>Pregnancy Test</li>
              <li>Platelet count</li>
              <li>Prothrombin Time (PT) Test</li>
              <li>Partial Thromboplastin Time (PTT) Test</li>
              <li>Packed Cell Volume Test</li>
              <li>Phosphate in Blood</li>
              <li>Pleural Fluid Analysis</li>
              <li>Prostate-specific antigen</li>
              <li>Peripheral Blood Smear test</li>
              <li>Platelet Tests</li>
            </ul>
          </div>

          {/* <!-- R --> */}
          <div class="test-card">
            <div class="letter">R</div>
            <ul>
              <li>Random Blood Sugar</li>
              <li>Rheumatoid Arthritis (RA) Factor Test</li>
              <li>Renal Profile Test</li>
              <li>Reticulocyte Count test</li>
              <li>Renal Scan</li>
            </ul>
          </div>

          <div class="test-card">
            <div class="letter">S</div>
            <ul>
              <li>Serum Cholesterol Test</li>
              <li>Spirometry Test</li>
              <li>Semen Analysis Test</li>
              <li>SGPT Test</li>
              <li>SGOT Test</li>
              <li>Synovial Fluid Analysis</li>
              <li>Stress Echo Test</li>
              <li>Salmonella paratyphi test</li>
              <li>Sperm DNA Fragmentation</li>
              <li>Stool culture test</li>
            </ul>
          </div>

          {/* <!-- T --> */}
          <div class="test-card">
            <div class="letter">T</div>
            <ul>
              <li>T3/T4</li>
              <li>Thyroid Profile Test</li>
              <li>Thyroid-Stimulating Hormone</li>
              <li>TMT Test</li>
              <li>Thyroglobulin</li>
              <li>Tuberculosis Screening Test</li>
              <li>Thallium Scan</li>
              <li>Transferrin Test</li>
              <li>TORCH screen test</li>
              <li>Toxoplasma Test</li>
            </ul>
          </div>

          {/* <!-- U --> */}
          <div class="test-card">
            <div class="letter">U</div>
            <ul>
              <li>Ultrasound Scan</li>
              <li>Ultrasound scan for kidney stones</li>
              <li>Urine Culture Test</li>
              <li>Urine Routine</li>
              <li>Ultrasound / CT - guided Biopsy / FNAC / Aspirations</li>
            </ul>
          </div>

          {/* <!-- V --> */}
          <div class="test-card">
            <div class="letter">V</div>
            <ul>
              <li>Vitamin B12 Test</li>
              <li>Vitamin D Test</li>
              <li>Vitamin K</li>
              <li>VDRL Test</li>
              <li>V/Q scan</li>
              <li>Vitamin E (Tocopherol) Test</li>
              <li>Vitamin A Test</li>
            </ul>
          </div>

          <div className="test-card">
            <div className="letter">w</div>
            <ul>
              <li>Widal test</li>
            </ul>
          </div>

          <div className="test-card">
            <div className="letter">x</div>
            <ul>
              <li>X-Ray Test</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;
