import React from 'react'
import "./Technology.css"
const Technology = ({data}) => {
  return (
    <div>
       <div class="tech-section">

        <h2>{data.title4}</h2>

        <p class="tech-desc">
           {data.para4}
        </p>

        <div class="tech-grid">
              {data.box3.map((item, index) => (
            <div  key={index} class="tech-card">

                <div class="tag">{item.lab}</div>
                <p>
                  {item.a}
                </p>
            </div>
           ))}
            {/* <div class="tech-card">
                <div class="tag">3D Echocardiography</div>
                <p>
                    High-resolution imaging that provides detailed insights into heart function,
                    valve health and structural abnormalities.
                </p>
            </div>

            <div class="tech-card">
                <div class="tag">Cardiac CT and MRI</div>
                <p>
                    Advanced imaging technology for precise evaluation of coronary arteries,
                    congenital heart defects and cardiac tumors.
                </p>
            </div>

            <div class="tech-card">
                <div class="tag">Electrophysiology (EP) Labs</div>
                <p>
                    Specialized labs for diagnosing and treating heart rhythm disorders
                    with ablation and device implantation.
                </p>
            </div>

            <div class="tech-card">
                <div class="tag">Hybrid Operating Theatres</div>
                <p>
                    Integrated surgical and imaging systems that allow both open-heart
                    and minimally invasive cardiac procedures in one setup.
                </p>
            </div>

            <div class="tech-card">
                <div class="tag">Advanced Heart-Lung Machines</div>
                <p>
                    Modern cardiopulmonary bypass systems used during complex
                    open-heart surgeries to ensure patient safety.
                </p>
            </div> */}

        </div>

    </div>
    </div>
  )
}

export default Technology
