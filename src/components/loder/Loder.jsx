import React from "react";
import { CircleLoader, MoonLoader, ScaleLoader } from "react-spinners";
import { LoaderContainer } from "./Loder.styles";

const Loader = () => {
  return (
    <LoaderContainer 
      role="status" 
      aria-label="Loading content"
      aria-live="polite"
    >
      {/* <MoonLoader color="#1E88E5" size={40} /> */}
      <CircleLoader color="#1E88E5" size={40} />
    </LoaderContainer>
  );
};

export default Loader;