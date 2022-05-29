import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders App with SearchBar", async () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  jest.spyOn(React, "useEffect").mockImplementation(() => {});
  render(<App />);
  /**
   * Basic test - input with placeholder "Search" is rendered in App
   */
  const inputWithPlaceholder = await screen.findByPlaceholderText(/Search/i);
  expect(inputWithPlaceholder).toBeInTheDocument();
});
