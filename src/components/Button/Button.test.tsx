import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("defaults to primary variant and md size classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: "Default" });
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("h-10");
  });

  it.each(["primary", "outline", "ghost", "link", "secondary", "danger"] as const)(
    "applies the %s variant styling",
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
    }
  );

  it("applies danger styling across variants when danger prop is true", () => {
    render(
      <>
        <Button variant="primary" danger>
          Primary Danger
        </Button>
        <Button variant="outline" danger>
          Outline Danger
        </Button>
        <Button variant="ghost" danger>
          Ghost Danger
        </Button>
        <Button variant="link" danger>
          Link Danger
        </Button>
      </>
    );
    expect(screen.getByRole("button", { name: "Primary Danger" }).className).toContain(
      "bg-danger"
    );
    expect(screen.getByRole("button", { name: "Outline Danger" }).className).toContain(
      "text-danger"
    );
    expect(screen.getByRole("button", { name: "Ghost Danger" }).className).toContain(
      "text-danger"
    );
    expect(screen.getByRole("button", { name: "Link Danger" }).className).toContain(
      "text-danger"
    );
  });

  it.each(["sm", "md", "lg"] as const)("applies the %s size styling", (size) => {
    render(<Button size={size}>{size}</Button>);
    expect(screen.getByRole("button", { name: size })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a spinner and disables the button while isLoading", () => {
    render(<Button isLoading>Saving</Button>);
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("forwards a ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports full width", () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole("button", { name: "Wide" }).className).toContain(
      "w-full"
    );
  });
});
