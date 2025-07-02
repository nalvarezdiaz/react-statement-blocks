# react-statement-blocks

A lightweight React library that provides elegant, declarative conditional rendering and iteration components for React applications. This package enables developers to use familiar programming constructs like `if`, `else if`, `else`, `switch`, and `for` as React components, making conditional rendering and list iteration more intuitive and maintainable.

[![npm version](https://img.shields.io/npm/v/react-statement-blocks.svg)](https://www.npmjs.com/package/react-statement-blocks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-statement-blocks)](https://bundlephobia.com/package/react-statement-blocks)

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

- 🎯 **Declarative conditional rendering** with familiar programming constructs
- 🔄 **Elegant iteration components** for rendering lists and collections
- 🛡️ **Type-safe components** built with TypeScript
- 📦 **Zero dependencies** besides React
- ⚡ **Small bundle size** with tree-shaking support
- 🚀 **React 19+ support** with modern React patterns
- 🎨 **Flexible and composable** component architecture

## Quick Start

```tsx
import {
  Condition,
  If,
  ElseIf,
  Else,
  Switch,
  Case,
  Default,
  For,
} from "react-statement-blocks";

// Conditional rendering
function UserGreeting({ user, isAdmin, isPremium }) {
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

// Switch-case rendering
function StatusIndicator({ status }) {
  return (
    <Switch value={status}>
      <Case value="loading">
        <LoadingSpinner />
      </Case>
      <Case value={["error", "failed"]}>
        <ErrorMessage />
      </Case>
      <Case value="success">
        <SuccessIcon />
      </Case>
      <Default>
        <UnknownStatus />
      </Default>
    </Switch>
  );
}

// List iteration
function ProductList({ products }) {
  return (
    <For
      each={products}
      filter={(product) => product.inStock}
      sort={(a, b) => a.price - b.price}
      limit={10}
      keyBy="id"
      fallback={<p>No products available</p>}
    >
      {({ item: product }) => <ProductCard product={product} />}
    </For>
  );
}
```

## Component Documentation

### 📋 [If-Else Components](./docs/ifelse-components.md)

Learn how to use `<Condition>`, `<If>`, `<ElseIf>`, and `<Else>` for declarative conditional rendering.

**Key Features:**

- Type-safe conditional rendering
- Function children with type narrowing
- Familiar if-else syntax
- Validation and error handling

### 🔀 [Switch Components](./docs/switch-components.md)

Discover how to use `<Switch>`, `<Case>`, and `<Default>` for value-based conditional rendering.

**Key Features:**

- Multiple value matching
- Custom equality functions
- Array-based case values
- Performance optimized

### 🔄 [For Components](./docs/for-components.md)

Explore the `<For>` component for advanced list rendering with filtering, sorting, and pagination.

**Key Features:**

- Built-in filtering and sorting
- Pagination support with offset and limit
- Fallback content for empty states

## From Traditional React Patterns

```tsx
// ❌ Traditional conditional rendering
{
  user && user.isAdmin ? (
    <AdminPanel />
  ) : user && user.isPremium ? (
    <PremiumFeatures />
  ) : user ? (
    <UserDashboard />
  ) : (
    <LoginPrompt />
  );
}

// ✅ With react-statement-blocks
<Condition>
  <If condition={user?.isAdmin}>
    <AdminPanel />
  </If>
  <ElseIf condition={user?.isPremium}>
    <PremiumFeatures />
  </ElseIf>
  <ElseIf condition={user}>
    <UserDashboard />
  </ElseIf>
  <Else>
    <LoginPrompt />
  </Else>
</Condition>;
```

```tsx
// ❌ Traditional list rendering
{
  items.length > 0 ? (
    <ul>
      {items
        .filter((item) => item.active)
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 10)
        .map((item, index) => (
          <li key={item.id}>{item.name}</li>
        ))}
    </ul>
  ) : (
    <p>No items found</p>
  );
}

// ✅ With react-statement-blocks
<For
  each={items}
  filter={(item) => item.active}
  sort={(a, b) => a.name.localeCompare(b.name)}
  limit={10}
  keyBy="id"
  as="ul"
  fallback={<p>No items found</p>}
>
  {({ item }) => <li>{item.name}</li>}
</For>;
```

## TypeScript Support

All components are built with TypeScript and provide excellent type safety:

```tsx
// Type narrowing with conditional components
const user: User | null = getUser();

<Condition>
  <If condition={user}>
    {(u) => {
      // `u` is automatically narrowed to `User` (not null)
      return <div>Hello, {u.name}!</div>;
    }}
  </If>
</Condition>;

// Generic type support for collections
interface Product {
  id: string;
  name: string;
  price: number;
}

<For each={products} keyBy="id">
  {({ item, index, itemKey, all }) => {
    // All props are properly typed:
    // - item: Product
    // - index: number
    // - itemKey: string
    // - all: Product[]
    return <ProductCard product={item} />;
  }}
</For>;
```

## Import Strategies

React Statement Blocks supports multiple import strategies to optimize your bundle size and provide flexibility in how you consume the components. Choose the strategy that best fits your project's needs.

### Full Bundle Import

Import all components from the main entry point. This is the simplest approach and works well for most applications:

```tsx
// Import everything you need
import {
  Condition,
  If,
  ElseIf,
  Else,
  Switch,
  Case,
  Default,
  For,
} from "react-statement-blocks";
```

### Category-Specific Imports

Import only the category of components you need for better tree-shaking:

```tsx
// Import only conditional components
import {
  Condition,
  If,
  ElseIf,
  Else,
  Switch,
  Case,
  Default,
} from "react-statement-blocks/conditional";

// Import only collection components
import { For } from "react-statement-blocks/collections";
```

### Individual Component Imports

Import only the specific components you need for the smallest possible bundle:

```tsx
// Import individual conditional components
import {
  Condition,
  If,
  Else,
  ElseIf,
} from "react-statement-blocks/conditional/ifelse";

// Import individual switch components
import {
  Switch,
  Case,
  Default,
} from "react-statement-blocks/conditional/switch";

// Import collection components
import { For } from "react-statement-blocks/collections/for";
```

## Performance

- **Tree-shaking friendly** - Import only what you need
- **Minimal runtime overhead** - Components compile to efficient React code
- **Memory efficient** - No unnecessary re-renders or memory leaks
- **Bundle size** - Less than 1KB minified + gzipped

## Contributing

We welcome contributions!

### Development Setup

```bash
# Clone the repository
git clone https://github.com/nalvarezdiaz/react-statement-blocks.git

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm build
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and releases.

## License

MIT © Néstor Álvarez-Díaz(https://github.com/nalvarezdiaz)

---

<div align="center">

Made with ❤️ for the React community

</div>
