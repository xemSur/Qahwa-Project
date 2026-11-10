
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo Component", () => {
  it("uses default size of 40", () => {
    const { container } = render(<Logo />);

    expect(container.firstChild).toHaveStyle({
      width: "40px",
      height: "40px",
    });
  });

  it("accepts custom size", () => {
    const { container } = render(<Logo size={80} />);

    expect(container.firstChild).toHaveStyle({
      width: "80px",
      height: "80px",
    });
  });

  it("uses emerald variant", () => {
    const { container } = render(<Logo variant="emerald" />);

    expect(container.firstChild).toHaveClass(
      "from-emerald-500",
      "to-teal-600"
    );
  });
});
