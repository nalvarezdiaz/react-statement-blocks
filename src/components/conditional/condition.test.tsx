import { render, screen } from "@testing-library/react";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";

import { Condition, If, ElseIf, Else } from "./index";

describe("Condition", () => {
  const ifDiv = <div data-testid="if-content" />;
  const elseifDiv = <div data-testid="elseif-content" />;
  const elseDiv = <div data-testid="else-content" />;

  it("should render If branch when condition is true", () => {
    render(
      <Condition>
        <If condition={true}>{ifDiv}</If>
        <ElseIf condition={false}>{elseifDiv}</ElseIf>
        <Else>{elseDiv}</Else>
      </Condition>
    );

    expect(screen.getByTestId("if-content")).toBeInTheDocument();
    expect(screen.queryByTestId("elseif-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("else-content")).not.toBeInTheDocument();
  });

  it("should render ElseIf branch when condition is true", () => {
    render(
      <Condition>
        <If condition={false}>{ifDiv}</If>
        <ElseIf condition={true}>{elseifDiv}</ElseIf>
        <Else>{elseDiv}</Else>
      </Condition>
    );

    expect(screen.queryByTestId("if-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("elseif-content")).toBeInTheDocument();
    expect(screen.queryByTestId("else-content")).not.toBeInTheDocument();
  });

  it("should render Else branch when condition is true", () => {
    render(
      <Condition>
        <If condition={false}>{ifDiv}</If>
        <ElseIf condition={false}>{elseifDiv}</ElseIf>
        <Else>{elseDiv}</Else>
      </Condition>
    );

    expect(screen.queryByTestId("if-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("elseif-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("else-content")).toBeInTheDocument();
  });

  it("should not render any branch when all conditions are false", () => {
    const { container } = render(
      <Condition>
        <If condition={false}>{ifDiv}</If>
        <ElseIf condition={false}>{elseifDiv}</ElseIf>
      </Condition>
    );

    expect(screen.queryByTestId("if-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("elseif-content")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it("should render children as a function", () => {
    const renderIfContent = (condition: boolean) => (
      <div data-testid="if-content-function">
        {condition ? "Condition is true" : "Condition is false"}
      </div>
    );
    render(
      <Condition>
        <If condition={true}>{renderIfContent}</If>
      </Condition>
    );
    expect(screen.getByTestId("if-content-function")).toBeInTheDocument();
    expect(screen.getByTestId("if-content-function")).toHaveTextContent(
      "Condition is true"
    );
  });

  it("should narrowing types for function children", () => {
    const user: { name: string } | null = { name: "John Doe" };
    let currentName;
    render(
      <Condition>
        <If condition={user?.name}>
          {(name) => {
            currentName = name;
            return (
              <div data-testid="if-content-function-narrowing">
                Hello, {name}!
              </div>
            );
          }}
        </If>
      </Condition>
    );
    // @ts-expect-error: currentName should be narrowed to string
    expectTypeOf(currentName).toEqualTypeOf<string>();

    expect(
      screen.getByTestId("if-content-function-narrowing")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("if-content-function-narrowing")
    ).toHaveTextContent("Hello, John Doe!");
  });

  describe("branch order validation", () => {
    const originalConsoleError = console.error;
    beforeAll(() => {
      console.error = vi.fn();
    });
    afterAll(() => {
      console.error = originalConsoleError;
    });

    it("should throw error when branch order starts with Else", () => {
      expect(() => {
        return render(
          <Condition>
            <Else>{elseDiv}</Else>
            <If condition={true}>{ifDiv}</If>
          </Condition>
        );
      }).toThrow("First branch must be <If/>. Found: <Else/>.");
    });

    it("should throw error when If is followed by another If", () => {
      expect(() => {
        return render(
          <Condition>
            <If condition={true}>{ifDiv}</If>
            <If condition={false}>{ifDiv}</If>
          </Condition>
        );
      }).toThrow("<If/> branch must be followed by <ElseIf/> or <Else/>.");
    });

    it("should throw error when ElseIf is followed by another If", () => {
      expect(() => {
        return render(
          <Condition>
            <If condition={true}>{ifDiv}</If>
            <ElseIf condition={true}>{elseifDiv}</ElseIf>
            <If condition={false}>{ifDiv}</If>
          </Condition>
        );
      }).toThrow("<ElseIf/> branch must be followed by <ElseIf/> or <Else/>.");
    });

    it("should throw error when Else is followed by another branch", () => {
      expect(() => {
        return render(
          <Condition>
            <If condition={true}>{ifDiv}</If>
            <Else>{elseDiv}</Else>
            <ElseIf condition={false}>{elseifDiv}</ElseIf>
          </Condition>
        );
      }).toThrow("<Else/> branch cannot be followed by another branch.");
    });
  });

  describe("validation of branch types", () => {
    const originalConsoleError = console.error;
    beforeAll(() => {
      console.error = vi.fn();
    });
    afterAll(() => {
      console.error = originalConsoleError;
    });

    it("should skip invalid elements", () => {
      const { container } = render(
        <Condition>
          {12} {/* Invalid react element */}
          <If condition={false}>{ifDiv}</If>
        </Condition>
      );
      expect(screen.queryByTestId("if-content")).not.toBeInTheDocument();
      expect(container.firstChild).toBeNull();
    });

    it("should throw error for invalid branch type", () => {
      expect(() => {
        return render(
          <Condition>
            <If condition={true}>{ifDiv}</If>
            <div>Invalid Branch</div>
          </Condition>
        );
      }).toThrow(
        "Invalid branch type: Unknown. Expected one of: <If/>, <ElseIf/>, <Else/>."
      );
    });
  });
});
