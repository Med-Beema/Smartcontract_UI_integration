import React from "react";

export default function DollarText(props) {
  return (
    <div>
      <p style={{ fontSize: "25px" }}>
        ≈$
        <span>{props.value}</span>
      </p>
    </div>
  );
}
