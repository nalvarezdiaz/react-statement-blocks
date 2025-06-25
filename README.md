# react-statement-blocks

A lightweight React library that provides elegant, declarative conditional rendering components for React applications. This package enables developers to use familiar programming constructs like `if`, `else if`, and `else` as React components, making conditional rendering more intuitive and maintainable.

[![npm version](https://img.shields.io/npm/v/react-statement-blocks.svg)](https://www.npmjs.com/package/react-statement-blocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
# npm
npm install react-statement-blocks

# yarn
yarn add react-statement-blocks

# pnpm
pnpm add react-statement-blocks
```

## Features

- Declarative conditional rendering with familiar programming constructs
- Elegant iteration/loop components for rendering lists and collections
- Type-safe components built with TypeScript
- Zero dependencies besides React
- Supports React 19+
- Small bundle size

## Usage

```tsx
import { Condition, If, ElseIf, Else, For } from "react-statement-blocks";

function ProfileGreeting({ user, isAdmin, isPremium }) {
  return (
    <Condition>
      <If condition={isAdmin}>
        <h1>Welcome, Admin {user.name}!</h1>
      </If>
      <ElseIf condition={isPremium}>
        <h1>Welcome, Premium Member {user.name}!</h1>
      </ElseIf>
      <Else>
        <h1>Welcome, {user.name}!</h1>
      </Else>
    </Condition>
  );
}
```

## Conditional Component Rules

1. Every conditional block must start with an `<If>` component
2. `<If>` can be followed by any number of `<ElseIf>` components and/or a single `<Else>` component
3. `<Else>` must be the last component in the conditional block
4. All conditional components must be direct children of a `<Condition>` component

## Conditional Component Examples

### Basic Usage

```tsx
<Condition>
  <If condition={count > 10}>
    <p>Count is greater than 10</p>
  </If>
  <ElseIf condition={count > 5}>
    <p>Count is greater than 5 but not greater than 10</p>
  </ElseIf>
  <Else>
    <p>Count is 5 or less</p>
  </Else>
</Condition>
```

### With Multiple ElseIf Branches

```tsx
<Condition>
  <If condition={status === "loading"}>
    <LoadingSpinner />
  </If>
  <ElseIf condition={status === "error"}>
    <ErrorMessage error={error} />
  </ElseIf>
  <ElseIf condition={data && data.length === 0}>
    <EmptyState />
  </ElseIf>
  <Else>
    <DataTable data={data} />
  </Else>
</Condition>
```

### With Function Children

```tsx
// type User = { name: string; };
const user: User | null = getUser();

<Condition>
  <If condition={user}>
    {(u) => {
      {
        /* Type narrowing, u is not null in this context. */
      }
      return <div>Hello, {u.name}!</div>;
    }}
  </If>
  <Else>
    <div>Welcome, do you want to join us?</div>
  </Else>
</Condition>;
```

## Iteration with For Component

The `For` component provides a declarative way to render lists of items, with built-in support for filtering, sorting, limiting, and more.

### Basic Usage

```tsx
const items = ["Apple", "Banana", "Cherry", "Date"];

return (
  <For each={items}>
    {({ item, index }) => (
      <li>
        {index + 1}. {item}
      </li>
    )}
  </For>
);
```

### With Container Element

```tsx
const fruits = ["Apple", "Banana", "Cherry"];

return (
  <For each={fruits} as="ul">
    {({ item }) => <li>{item}</li>}
  </For>
);
```

### With Fallback Content

```tsx
const products = []; // Empty array

return (
  <For each={products} fallback={<p>No products available.</p>}>
    {({ item }) => <ProductCard product={item} />}
  </For>
);
```

### With Filtering, Sorting, and Limits

```tsx
const users = [
  { id: 1, name: "Alice", age: 28, active: true },
  { id: 2, name: "Bob", age: 32, active: false },
  { id: 3, name: "Charlie", age: 24, active: true },
  { id: 4, name: "Diana", age: 29, active: true },
  { id: 5, name: "Evan", age: 35, active: false },
];

return (
  <For
    each={users}
    filter={(user) => user.active}
    sort={(a, b) => a.age - b.age}
    limit={2}
    keyBy="id"
    as="div"
  >
    {({ item: user, itemKey }) => <UserCard key={itemKey} user={user} />}
  </For>
);
```

### For Component Props

| Prop       | Type                       | Description                                            |
| ---------- | -------------------------- | ------------------------------------------------------ |
| `each`     | `T[] \| null \| undefined` | The array of items to iterate over                     |
| `children` | Render function            | Function that receives `{ item, index, itemKey, all }` |
| `as`       | JSX element                | Optional wrapper element (e.g., `"ul"`, `"div"`)       |
| `fallback` | ReactNode                  | Content to show when array is empty or null            |
| `keyBy`    | keyof T                    | Property to use as key for each item                   |
| `limit`    | number                     | Maximum number of items to render                      |
| `offset`   | number                     | Number of items to skip from the beginning             |
| `filter`   | Function                   | Filter function `(item, index, all) => boolean`        |
| `sort`     | Function                   | Sort function `(a, b) => number`                       |

## Component Rules

1. Every `For` block must have an `each` prop
2. `each` can be an array, null, or undefined
3. `children` must be a function that receives `{ item, index, itemKey, all }`
4. `as` prop can be used to specify a container element
5. `fallback` prop can be used to specify content when the array is empty
6. `keyBy`, `limit`, `offset`, `filter`, and `sort` are optional props for advanced usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
