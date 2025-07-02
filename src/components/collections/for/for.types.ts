import type { ComponentType, JSX, ReactNode } from "react";

export interface ForProps<T> {
  /**
   * List of items to iterate over.
   */
  each: T[] | null | undefined;
  /**
   * Component to render for each item.
   * It receives the item, index, and a key as props.
   */
  children: ComponentType<{
    itemKey: string;
    item: T;
    index: number;
    all: T[];
  }>;
  /**
   * Optional HTML element type to render the items as.
   * @default `Fragment`
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Fallback content to render when `each` is empty or null.
   */
  fallback?: ReactNode;
  /**
   * Optional property to specify the key for each item.
   * If provided, it will be used to uniquely identify each item.
   * Otherwise, the index will be used as the key.
   */
  keyBy?: keyof T;
  /**
   * Render a limited number of items.
   */
  limit?: number;
  /**
   * Start rendering from a specific offset.
   */
  offset?: number;
  /**
   * Filter function to determine which items to render.
   * It will be executed before truncating the list by `limit` or `offset`.
   * @param item The current item being processed.
   * @param index The index of the current item.
   * @param all The complete list of items.
   * @returns True if the item should be rendered, false otherwise.
   */
  filter?: (item: T, index: number, all: T[]) => boolean;
  /**
   * Optional sorting function to sort the items before rendering.
   * If provided, it will be applied to the filtered items.
   */
  sort?: (a: T, b: T) => number;
}
