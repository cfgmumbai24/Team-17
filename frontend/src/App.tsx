import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import ExampleState from "./contexts/exampleContext/exampleCreateState";

export default function App() {
  return (
    <ExampleState>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ExampleState>
  );
}
