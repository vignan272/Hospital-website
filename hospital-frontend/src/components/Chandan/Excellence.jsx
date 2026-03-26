import React from "react";
import "./Excellence.css";
const Excellence = ({ data }) => {
  return (
    <div>
      <div class="heart-care">
        <div class="care-container">
          <div class="care-left">
            <h2>{data.title5}</h2>

            <p class="care-desc">{data.para5}</p>

            <ul class="care-list">
              <li>
                <span class="icon7">✔</span>
                {data.list1}
              </li>

              <li>
                <span class="icon7">✔</span>
                {data.list2}
              </li>

              <li>
                <span class="icon7">✔</span>
                {data.list3}
              </li>

              <li>
                <span class="icon7">✔</span>
                {data.list4}
              </li>
            </ul>
          </div>

          <div class="care-right">
            <div class="success-card">
              <h3>Technology Success Rate</h3>

              <div class="success-number">98%</div>

              <p>
                Diagnostic accuracy with our advanced imaging and AI technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Excellence;
