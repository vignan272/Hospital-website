import React from "react";
import { useParams } from "react-router-dom";

import Consultation from "./Consultation";
import Oncology from "./Oncology";
import Cancer from "./Cancer";
import Technology from "./Technology";
import Excellence from "./Excellence";
import Commitment from "./Commitment";
import SpecialtiesData from "./SpecialtiesData";

const Specialties = () => {
  const { category } = useParams();

  // ✅ Safe check (prevents crash if category is undefined)
  const data = SpecialtiesData.find(
    (item) =>
      item.category &&
      category &&
      item.category.toLowerCase() === category.toLowerCase(),
  );

  // ✅ Better error UI
  if (!data) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No Data Found for "{category}"
      </h2>
    );
  }

  return (
    <div>
      <Consultation data={data} />
      <Oncology data={data} />
      <Cancer data={data} />
      <Technology data={data} />
      <Excellence data={data} />
      <Commitment data={data} />
    </div>
  );
};

export default Specialties;
