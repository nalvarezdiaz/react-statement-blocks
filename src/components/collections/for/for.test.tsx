import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { For } from "./for";

describe("For", () => {
  it("should render items from the array", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    render(
      <For each={items}>
        {({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
      </For>
    );

    expect(screen.getByTestId("item-1")).toHaveTextContent("Item 1");
    expect(screen.getByTestId("item-2")).toHaveTextContent("Item 2");
    expect(screen.getByTestId("item-3")).toHaveTextContent("Item 3");
  });

  it("should render fallback when array is empty", () => {
    const items: { id: number; name: string }[] = [];

    render(
      <For each={items} fallback={<div data-testid="fallback">No items</div>}>
        {({ item }) => <div data-testid={`item-${item.id}`}>{item.name}</div>}
      </For>
    );

    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.getByTestId("fallback")).toHaveTextContent("No items");
  });

  it("should render fallback when array is null", () => {
    const items = null;

    render(
      <For each={items} fallback={<div data-testid="fallback">No items</div>}>
        {({ item }) => <div>{String(item)}</div>}
      </For>
    );

    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });

  it("should render inside a specified element", () => {
    const items = ["one", "two", "three"];

    render(
      <For each={items} as="ul">
        {({ item }) => <li data-testid={`item-${item}`}>{item}</li>}
      </For>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    expect(screen.getByTestId("item-one").tagName).toBe("LI");
    expect(screen.getByTestId("item-one").parentElement?.tagName).toBe("UL");
  });

  it("should use keyBy to generate keys", () => {
    const items = [
      { id: "a1", name: "Item 1" },
      { id: "b2", name: "Item 2" },
    ];

    render(
      <For each={items} keyBy="id">
        {({ item, itemKey }) => <div data-testid={itemKey}>{item.name}</div>}
      </For>
    );

    expect(screen.getByTestId("a1")).toBeInTheDocument();
    expect(screen.getByTestId("b2")).toBeInTheDocument();
  });

  it("should limit the number of rendered items", () => {
    const items = ["one", "two", "three", "four", "five"];

    render(
      <For each={items} limit={3}>
        {({ item }) => <div data-testid={`item-${item}`}>{item}</div>}
      </For>
    );

    expect(screen.getByTestId("item-one")).toBeInTheDocument();
    expect(screen.getByTestId("item-two")).toBeInTheDocument();
    expect(screen.getByTestId("item-three")).toBeInTheDocument();
    expect(screen.queryByTestId("item-four")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-five")).not.toBeInTheDocument();
  });

  it("should apply offset to start rendering from specific item", () => {
    const items = ["one", "two", "three", "four", "five"];

    render(
      <For each={items} offset={2}>
        {({ item }) => <div data-testid={`item-${item}`}>{item}</div>}
      </For>
    );

    expect(screen.queryByTestId("item-one")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-two")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-three")).toBeInTheDocument();
    expect(screen.getByTestId("item-four")).toBeInTheDocument();
    expect(screen.getByTestId("item-five")).toBeInTheDocument();
  });

  it("should apply limit and offset together", () => {
    const items = ["one", "two", "three", "four", "five"];

    render(
      <For each={items} limit={2} offset={2}>
        {({ item }) => <div data-testid={`item-${item}`}>{item}</div>}
      </For>
    );

    expect(screen.queryByTestId("item-one")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-two")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-three")).toBeInTheDocument();
    expect(screen.getByTestId("item-four")).toBeInTheDocument();
    expect(screen.queryByTestId("item-five")).not.toBeInTheDocument();
  });

  it("should filter items based on the filter function", () => {
    const items = [1, 2, 3, 4, 5];

    render(
      <For each={items} filter={(item) => item % 2 === 0}>
        {({ item }) => <div data-testid={`item-${item}`}>{item}</div>}
      </For>
    );

    expect(screen.queryByTestId("item-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.queryByTestId("item-3")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-4")).toBeInTheDocument();
    expect(screen.queryByTestId("item-5")).not.toBeInTheDocument();
  });

  it("should sort items based on the sort function", () => {
    const items = [3, 1, 5, 2, 4];

    render(
      <For each={items} sort={(a, b) => a - b}>
        {({ item, index }) => (
          <div data-testid={`item-${item}`} data-index={index}>
            {item}
          </div>
        )}
      </For>
    );

    expect(screen.getByTestId("item-1").getAttribute("data-index")).toBe("0");
    expect(screen.getByTestId("item-2").getAttribute("data-index")).toBe("1");
    expect(screen.getByTestId("item-3").getAttribute("data-index")).toBe("2");
    expect(screen.getByTestId("item-4").getAttribute("data-index")).toBe("3");
    expect(screen.getByTestId("item-5").getAttribute("data-index")).toBe("4");
  });

  it("should provide index and all items to the render function", () => {
    const items = ["a", "b", "c"];

    render(
      <For each={items}>
        {({ item, index, all }) => (
          <div data-testid={`item-${item}`}>
            <span data-testid={`index-${item}`}>{index}</span>
            <span data-testid={`count-${item}`}>{all.length}</span>
          </div>
        )}
      </For>
    );

    expect(screen.getByTestId("index-a")).toHaveTextContent("0");
    expect(screen.getByTestId("count-a")).toHaveTextContent("3");

    expect(screen.getByTestId("index-b")).toHaveTextContent("1");
    expect(screen.getByTestId("count-b")).toHaveTextContent("3");

    expect(screen.getByTestId("index-c")).toHaveTextContent("2");
    expect(screen.getByTestId("count-c")).toHaveTextContent("3");
  });
});
