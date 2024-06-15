import React, { useContext } from "react";
import exampleContext from "../contexts/exampleContext/exampleCreateContext";

const SampleComponent: React.FC = () => {
  const context = useContext(exampleContext);

  if (!context) {
    // Handle the case where context is undefined
    return <div>Error: context not provided</div>;
  }

  return (
    <div>
      <h1>{context.name}</h1>
    </div>
  );
};

export default SampleComponent;
