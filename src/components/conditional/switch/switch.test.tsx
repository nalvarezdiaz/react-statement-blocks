import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Case, Default, Switch } from "../index";

describe("Switch", () => {
  const caseDiv1 = <div data-testid="case-1">Case 1 content</div>;
  const caseDiv2 = <div data-testid="case-2">Case 2 content</div>;
  const caseDiv3 = <div data-testid="case-3">Case 3 content</div>;
  const defaultDiv = <div data-testid="default">Default content</div>;

  it("should render matching Case when value matches", () => {
    render(
      <Switch value="option1">
        <Case value="option1">{caseDiv1}</Case>
        <Case value="option2">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should render Default when no cases match", () => {
    render(
      <Switch value="option3">
        <Case value="option1">{caseDiv1}</Case>
        <Case value="option2">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.queryByTestId("case-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.getByTestId("default")).toBeInTheDocument();
  });

  it("should render first matching Case when multiple cases could match", () => {
    render(
      <Switch value="duplicate">
        <Case value="duplicate">{caseDiv1}</Case>
        <Case value="duplicate">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should work with numeric values", () => {
    render(
      <Switch value={42}>
        <Case value={1}>{caseDiv1}</Case>
        <Case value={42}>{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.queryByTestId("case-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("case-2")).toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should work with boolean values", () => {
    render(
      <Switch value={true}>
        <Case value={false}>{caseDiv1}</Case>
        <Case value={true}>{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.queryByTestId("case-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("case-2")).toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should handle array of values in Case", () => {
    render(
      <Switch value="b">
        <Case value={["a", "b", "c"]}>{caseDiv1}</Case>
        <Case value="d">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should handle array of values when no match", () => {
    render(
      <Switch value="x">
        <Case value={["a", "b", "c"]}>{caseDiv1}</Case>
        <Case value="d">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.queryByTestId("case-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.getByTestId("default")).toBeInTheDocument();
  });

  it("should handle empty Switch component", () => {
    const { container } = render(
      // @ts-expect-error -- Switch expects a children prop
      <Switch value="anything">{/* No children */}</Switch>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should return null when no cases match and no Default provided", () => {
    const { container } = render(
      <Switch value="nonexistent">
        <Case value="option1">{caseDiv1}</Case>
        <Case value="option2">{caseDiv2}</Case>
      </Switch>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should use custom comparison function when provided", () => {
    const customIs = (a: string, b: string) =>
      a.toLowerCase() === b.toLowerCase();

    render(
      <Switch value="HELLO" is={customIs}>
        <Case value="hello">{caseDiv1}</Case>
        <Case value="world">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should work with object values using custom comparison", () => {
    const obj1 = { id: 1, name: "test" };
    const obj2 = { id: 1, name: "test" };
    const customIs = (a: { id: number }, b: { id: number }) => a.id === b.id;

    render(
      <Switch value={obj1} is={customIs}>
        <Case value={obj2}>{caseDiv1}</Case>
        <Case value={{ id: 2, name: "other" }}>{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should prioritize Cases over Default when sorted", () => {
    render(
      <Switch value="match">
        <Default>{defaultDiv}</Default>
        <Case value="match">{caseDiv1}</Case>
      </Switch>
    );

    expect(screen.getByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should handle mixed order of Cases and Default", () => {
    render(
      <Switch value="option2">
        <Case value="option1">{caseDiv1}</Case>
        <Default>{defaultDiv}</Default>
        <Case value="option2">{caseDiv2}</Case>
        <Case value="option3">{caseDiv3}</Case>
      </Switch>
    );

    expect(screen.queryByTestId("case-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("case-2")).toBeInTheDocument();
    expect(screen.queryByTestId("case-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should accept a Fragment as child", () => {
    const fragment = (
      <>
        <Case value="option1">{caseDiv1}</Case>
        <Case value="option2">{caseDiv2}</Case>
        <Default>{defaultDiv}</Default>
      </>
    );
    render(<Switch value="option1">{fragment}</Switch>);

    expect(screen.queryByTestId("case-1")).toBeInTheDocument();
    expect(screen.queryByTestId("case-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("default")).not.toBeInTheDocument();
  });

  it("should throw error when multiple Default components are provided", () => {
    expect(() => {
      render(
        <Switch value="test">
          <Case value="test">{caseDiv1}</Case>
          <Default>{defaultDiv}</Default>
          <Default>
            <div>Another default</div>
          </Default>
        </Switch>
      );
    }).toThrow("<Switch> can only have one <Default>.");
  });

  it("should throw error when invalid children are provided", () => {
    expect(() => {
      render(
        <Switch value="test">
          <Case value="test">{caseDiv1}</Case>
          <div>Invalid child</div>
        </Switch>
      );
    }).toThrow("<Switch> can only contain <Case> or <Default> components.");
  });

  it("should skip invalid elements", () => {
    render(
      <Switch value="test">
        {12} {/* Invalid react element */}
        <Case value="test">{caseDiv1}</Case>
      </Switch>
    );
    expect(screen.getByTestId("case-1")).toBeInTheDocument();
  });

  it("should have correct display names", () => {
    expect(Case.displayName).toBe("Case");
    expect(Default.displayName).toBe("Default");
  });
});
