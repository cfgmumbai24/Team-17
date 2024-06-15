import { createContext } from "react";

// Define the shape of the context
export interface ExampleContextType {
  name: string;
}

// Create the context with a default value
const exampleContext = createContext<ExampleContextType | undefined>(undefined);

export default exampleContext;
