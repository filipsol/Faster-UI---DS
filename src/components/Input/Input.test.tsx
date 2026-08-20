import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent } from "react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a label associated with the field", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("renders helper text when there is no error", () => {
    render(<Input label="Email" helperText="We'll never share it." />);
    expect(screen.getByText("We'll never share it.")).toBeInTheDocument();
  });

  it("shows an error message and marks the field invalid", () => {
    render(<Input label="Email" errorMessage="Email is required" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Email is required");
    expect(input).toHaveAttribute(
      "aria-describedby",
      error.id
    );
  });

  it("hides helper text when an error is present", () => {
    render(
      <Input label="Email" helperText="Helper" errorMessage="Error message" />
    );
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("disables the field when disabled is set", () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");
    await user.type(input, "Faster UI");
    expect(input).toHaveValue("Faster UI");
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText("Name"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("marks the label with a required indicator", () => {
    render(<Input label="Name" required />);
    expect(screen.getByLabelText(/Name/)).toBeRequired();
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} label="Name" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("renders prefix and suffix elements", () => {
    render(<Input label="Website" prefix="https://" suffix=".com" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });

  it("supports clearable button functionality", async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(<Input label="Search" defaultValue="initial text" clearable onClear={onClear} />);
    const clearBtn = screen.getByRole("button", { name: /clear input/i });
    expect(clearBtn).toBeInTheDocument();
    await user.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("clears a controlled value through onChange", async () => {
    const user = userEvent.setup();
    let value = "initial text";
    const onChange = jest.fn((event: ChangeEvent<HTMLInputElement>) => {
      value = event.target.value;
    });
    const { rerender } = render(
      <Input
        label="Search"
        value={value}
        onChange={onChange}
        clearable
      />
    );

    await user.click(screen.getByRole("button", { name: /clear input/i }));
    rerender(
      <Input
        label="Search"
        value={value}
        onChange={onChange}
        clearable
      />
    );

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText("Search")).toHaveValue("");
  });

  it("toggles password visibility when showPasswordToggle is enabled", async () => {
    const user = userEvent.setup();
    render(<Input label="Password" type="password" showPasswordToggle defaultValue="secret123" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    const toggleBtn = screen.getByRole("button", { name: /show password/i });
    await user.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders character counter when showCount is true", () => {
    render(<Input label="Bio" defaultValue="Hello" showCount maxLength={50} />);
    expect(screen.getByText("5 / 50")).toBeInTheDocument();
  });
});
