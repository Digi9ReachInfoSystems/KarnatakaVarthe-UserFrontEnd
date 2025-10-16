import React from "react";
import { CircleLoader, ClipLoader, ScaleLoader } from "react-spinners";
import { LoaderContainer } from "./ApiLoders.styles";

const Loader = () => {
  return (
    <LoaderContainer 
      role="status" 
      aria-label="Loading content"
      aria-live="polite"
    >
      <CircleLoader  color="#1E88E5" size={50} />
    </LoaderContainer>
  );
};

export default Loader;