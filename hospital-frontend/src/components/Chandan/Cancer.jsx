import React from 'react'
import "./Cancer.css"
const Cancer = ({data}) => {
  return (
    <div>
       <div className="cancer-section">

        <h2>{data. title3}</h2>

        <p className="cancer-desc">
           {data.para3}
        </p>

        <div className="cancer-grid">
            {data.box2.map((item, index) => (
            <div key={index} className="cancer-card">
                <h3>{item.h1}</h3>
                <p>
                    {item.i}
                </p>
            </div>
            ))}
        </div>

    </div>
    </div>
  )
}

export default Cancer
