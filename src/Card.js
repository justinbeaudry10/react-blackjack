import React from "react";
import RenderSmoothImage from "render-smooth-image-react";
import "render-smooth-image-react/build/style.css";

export default function Card(props) {
  return (
    <div className="cardContainer">
      <RenderSmoothImage
        alt={props.name}
        src={props.path}
        objectFit="contain"
      />
    </div>
  );
}
