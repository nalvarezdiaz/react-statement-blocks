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
- Type-safe components built with TypeScript
- Zero dependencies besides React
- Supports React 19+
- Small bundle size

## Usage

```tsx
import { Condition, If, ElseIf, Else } from "react-statement-blocks";

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

## Rules

1. Every conditional block must start with an `<If>` component
2. `<If>` can be followed by any number of `<ElseIf>` components and/or a single `<Else>` component
3. `<Else>` must be the last component in the conditional block
4. All components must be direct children of a `<Condition>` component

## Examples

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
