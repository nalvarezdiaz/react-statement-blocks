# Conditional Components

The conditional components provide a declarative way to handle conditional rendering in React applications using familiar programming constructs like `if`, `else if`, and `else`.

## Components

- [`<Condition>`](#condition) - Container component for conditional logic
- [`<If>`](#if) - Primary condition branch
- [`<ElseIf>`](#elseif) - Secondary condition branches
- [`<Else>`](#else) - Fallback branch

## Condition

The `<Condition>` component serves as a container for conditional logic branches. It evaluates its children in order and renders the first branch whose condition is truthy.

### Props

The `<Condition>` component accepts only `children` as props.

| Prop       | Type        | Description                                                 |
| ---------- | ----------- | ----------------------------------------------------------- |
| `children` | `ReactNode` | Must contain `<If>`, `<ElseIf>`, and/or `<Else>` components |

### Rules

1. Must start with an `<If>` component
2. Can be followed by any number of `<ElseIf>` components
3. Can optionally end with a single `<Else>` component
4. `<Else>` must be the last component if present
5. All conditional components must be direct children

## If

The `<If>` component represents the primary condition in a conditional block.

### Props

| Prop        | Type                                     | Description                                                 |
| ----------- | ---------------------------------------- | ----------------------------------------------------------- |
| `condition` | `T \| null \| undefined \| false`        | The condition to evaluate                                   |
| `children`  | `ReactNode \| ((value: T) => ReactNode)` | Content to render or function receiving the condition value |

### Examples

#### Basic Usage

```tsx
<Condition>
  <If condition={user.isLoggedIn}>
    <div>Welcome back!</div>
  </If>
</Condition>
```

#### With Function Children (Type Narrowing)

```tsx
const user: User | null = getUser();

<Condition>
  <If condition={user}>{(u) => <div>Hello, {u.name}!</div>}</If>
</Condition>;
```

## ElseIf

The `<ElseIf>` component represents additional conditions that are checked if previous conditions were falsy.

### Props

| Prop        | Type                                     | Description                                                 |
| ----------- | ---------------------------------------- | ----------------------------------------------------------- |
| `condition` | `T \| null \| undefined \| false`        | The condition to evaluate                                   |
| `children`  | `ReactNode \| ((value: T) => ReactNode)` | Content to render or function receiving the condition value |

### Examples

#### Multiple ElseIf Branches

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

## Else

The `<Else>` component provides a fallback that renders when all previous conditions are falsy.

### Props

| Prop       | Type        | Description                   |
| ---------- | ----------- | ----------------------------- |
| `children` | `ReactNode` | Content to render as fallback |

### Examples

#### With Else Fallback

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

## User Authentication Flow Example

```tsx
function UserProfile({ user, isLoading, error }) {
  return (
    <Condition>
      <If condition={isLoading}>
        <div className="spinner">Loading user profile...</div>
      </If>
      <ElseIf condition={error}>
        <div className="error">
          <h3>Error loading profile</h3>
          <p>{error.message}</p>
        </div>
      </ElseIf>
      <ElseIf condition={user}>
        {(u) => (
          <div className="profile">
            <h2>Welcome, {u.name}!</h2>
            <p>Email: {u.email}</p>
            <p>Role: {u.role}</p>
          </div>
        )}
      </ElseIf>
      <Else>
        <div className="auth-prompt">
          <h3>Please log in</h3>
          <button>Sign In</button>
        </div>
      </Else>
    </Condition>
  );
}
```

## Type Safety

The conditional components are fully type-safe with TypeScript:

- Function children receive properly narrowed types
- Conditions can be any type that evaluates to truthy/falsy
- Full IntelliSense support for props and children

```tsx
// Type narrowing example
const data: ApiResponse | null = await fetchData();

<Condition>
  <If condition={data}>
    {(response) => {
      // `response` is narrowed to `ApiResponse` (not null)
      return <div>{response.message}</div>;
    }}
  </If>
  <Else>
    <div>No data available</div>
  </Else>
</Condition>;
```
