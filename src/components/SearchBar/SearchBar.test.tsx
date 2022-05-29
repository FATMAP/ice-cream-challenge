import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import SearchBar from "./SearchBar";

afterAll(() => {
  cleanup();
});

describe("Renders SearchBar with props", () => {
  it("should show input with prop text", () => {
    render(
      <SearchBar
        inputText="test"
        onInputFocus={() => {}}
        onInputChange={() => {}}
        onClear={() => {}}
      />
    );
    const input = screen.getByDisplayValue(/test/i);
    expect(input).toBeInTheDocument();
  });

  it("should call `onClear` on clear button click", () => {
    const onClear = jest.fn();
    render(
      <SearchBar
        inputText="test"
        onInputFocus={() => {}}
        onInputChange={() => {}}
        onClear={onClear}
      />
    );
    const clearBtn = screen.getByRole("button");
    expect(clearBtn).toBeInTheDocument();
    // fireEvent.change(input, {target: {value: '23'}})
    fireEvent.click(clearBtn);
    expect(onClear).toBeCalled();
  });

  it("should call `onInputChange` when input value changes", () => {
    const onInputChange = jest.fn();
    render(
      <SearchBar
        inputText="test"
        onInputFocus={() => {}}
        onInputChange={onInputChange}
        onClear={() => {}}
      />
    );
    const input = screen.getByDisplayValue(/test/i);
    fireEvent.change(input, { target: { value: "something else" } });
    expect(onInputChange).toBeCalled();
  });
});
