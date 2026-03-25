import React from 'react'
import "./Commitment.css"
const Commitment = ({data}) => {
  return (
    <div>
       <div class="commitment">

        <h2 class="commitment-title">Our Commitment to You</h2>

        <div class="commitment-container">
              {data.box4.map((item, index) => (
            <div key={index} class="commit-card">

                <div class="icon-circle">
                 <i className={item.icon}></i> 
                </div>

                <h3>{item.title6}</h3>

                <p>
                   {item.para6}
                </p>

            </div>
        ))}
    
        </div> 

    </div>
    </div>
  )
}

export default Commitment
