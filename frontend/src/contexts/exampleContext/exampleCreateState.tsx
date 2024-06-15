import React, { ReactNode } from "react";
import exampleContext, { ExampleContextType } from "./exampleCreateContext";

// Define the props for the context provider
interface ExampleStateProps {
  children: ReactNode;
}

const ExampleState: React.FC<ExampleStateProps> = (props) => {
  const state: ExampleContextType = {
    name: "exampleState",
  };

  return (
    <exampleContext.Provider value={state}>
      {props.children}
    </exampleContext.Provider>
  );
};

export default ExampleState;
