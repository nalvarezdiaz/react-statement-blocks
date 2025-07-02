import { Fragment, useMemo } from "react";

import type { ForProps } from "./for.types";

export const For = <T,>({
  each,
  children: Child,
  fallback,
  as,
  keyBy,
  limit,
  offset,
  filter,
  sort,
}: ForProps<T>) => {
  const items = useMemo(() => {
    if (!each || each.length === 0) {
      return [];
    }

    let filteredItems = each;

    if (filter) {
      filteredItems = filteredItems.filter((item, index) =>
        filter(item, index, each)
      );
    }

    if (offset !== undefined) {
      filteredItems = filteredItems.slice(offset);
    }

    if (limit !== undefined) {
      filteredItems = filteredItems.slice(0, limit);
    }

    if (sort) {
      filteredItems = [...filteredItems].sort(sort);
    }

    return filteredItems;
  }, [each, filter, limit, offset, sort]);

  if (items.length === 0) {
    return <>{fallback}</>;
  }

  const Wrapper = as ?? Fragment;
  return (
    <Wrapper>
      {items.map((item, index) => {
        const key =
          keyBy && item[keyBy] ? String(item[keyBy]) : `item-${index}`;
        return (
          <Fragment key={key}>
            <Child itemKey={key} item={item} index={index} all={items} />
          </Fragment>
        );
      })}
    </Wrapper>
  );
};
