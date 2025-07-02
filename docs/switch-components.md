# Switch Components

The switch components provide a declarative way to handle multiple conditional branches based on value matching, similar to a switch statement in traditional programming languages.

## Components

- [`<Switch>`](#switch) - Container component for switch logic
- [`<Case>`](#case) - Individual case branches
- [`<Default>`](#default) - Fallback branch

## Switch

The `<Switch>` component evaluates its children and renders the first `<Case>` that matches the provided value, or the `<Default>` if no cases match.

### Props

| Prop       | Type                      | Description                                           |
| ---------- | ------------------------- | ----------------------------------------------------- |
| `value`    | `T`                       | The value to match against case values                |
| `children` | `ReactNode`               | Must contain `<Case>` and/or `<Default>` components   |
| `is`       | `(a: T, b: T) => boolean` | Optional custom equality function (defaults to `===`) |

### Examples

#### Basic Usage

```tsx
<Switch value={status}>
  <Case value="loading">
    <LoadingSpinner />
  </Case>
  <Case value="error">
    <ErrorMessage />
  </Case>
  <Case value="success">
    <SuccessContent />
  </Case>
  <Default>
    <div>Unknown status</div>
  </Default>
</Switch>
```

#### With Custom Equality Function

```tsx
// Case-insensitive string matching
<Switch value={userRole} is={(a, b) => a.toLowerCase() === b.toLowerCase()}>
  <Case value="ADMIN">
    <AdminPanel />
  </Case>
  <Case value="USER">
    <UserDashboard />
  </Case>
  <Default>
    <GuestView />
  </Default>
</Switch>
```

## Case

The `<Case>` component represents a single branch in a switch statement that matches against specific values.

### Props

| Prop       | Type        | Description                              |
| ---------- | ----------- | ---------------------------------------- |
| `value`    | `T \| T[]`  | Single value or array of values to match |
| `children` | `ReactNode` | Content to render when this case matches |

### Examples

#### Single Value Case

```tsx
<Switch value={theme}>
  <Case value="dark">
    <DarkThemeProvider>
      <App />
    </DarkThemeProvider>
  </Case>
  <Case value="light">
    <LightThemeProvider>
      <App />
    </LightThemeProvider>
  </Case>
</Switch>
```

#### Multiple Values Case

```tsx
<Switch value={httpStatus}>
  <Case value={[200, 201, 202]}>
    <SuccessMessage />
  </Case>
  <Case value={[400, 401, 403]}>
    <ClientErrorMessage />
  </Case>
  <Case value={[500, 502, 503]}>
    <ServerErrorMessage />
  </Case>
  <Default>
    <UnknownErrorMessage />
  </Default>
</Switch>
```

## Default

The `<Default>` component provides a fallback that renders when no `<Case>` components match the switch value.

### Props

| Prop       | Type        | Description                   |
| ---------- | ----------- | ----------------------------- |
| `children` | `ReactNode` | Content to render as fallback |

### Examples

#### With Default Fallback

```tsx
<Switch value={userType}>
  <Case value="premium">
    <PremiumFeatures />
  </Case>
  <Case value="basic">
    <BasicFeatures />
  </Case>
  <Default>
    <GuestFeatures />
  </Default>
</Switch>
```

## Performance Considerations

### Static Content Optimization

When `Switch` children are static (don't depend on props or state), extract them outside the component to prevent unnecessary re-renders. Even if the parent component re-renders due to prop changes, the extracted content remains stable and won't cause child components to re-render unless the switch value actually changes.

```tsx
// ✅ Optimized: Content extracted outside component
const switchContent = (
  <>
    <Case value="premium">
      <PremiumFeatures />
    </Case>
    <Case value="basic">
      <BasicFeatures />
    </Case>
    <Default>
      <GuestFeatures />
    </Default>
  </>
);

const MyComponent = ({ user, otherProp }) => {
  // Even when `otherProp` changes and triggers a re-render,
  // the switch content won't re-render unless `user.type` changes
  return (
    <div>
      <h1>User Profile</h1>
      <p>Other data: {otherProp}</p>
      <Switch value={user.type}>{switchContent}</Switch>
    </div>
  );
};
```

### Performance Anti-Pattern

Avoid defining switch content inline when it doesn't depend on component props:

```tsx
// ❌ Anti-pattern: Inline content causes unnecessary re-renders
const MyComponent = ({ user, otherProp }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Other data: {otherProp}</p>
      <Switch value={user.type}>
        {/* These Case components will re-render every time MyComponent re-renders,
            even if user.type hasn't changed */}
        <Case value="premium">
          <PremiumFeatures />
        </Case>
        <Case value="basic">
          <BasicFeatures />
        </Case>
        <Default>
          <GuestFeatures />
        </Default>
      </Switch>
    </div>
  );
};
```

### Dynamic Content with Memoization

When switch content depends on props, use `useMemo` to optimize re-renders:

```tsx
const MyComponent = ({ user, settings, theme }) => {
  // Memoize content that depends on specific props
  const switchContent = useMemo(
    () => (
      <>
        <Case value="premium">
          <PremiumFeatures theme={theme} />
        </Case>
        <Case value="basic">
          <BasicFeatures settings={settings} />
        </Case>
        <Default>
          <GuestFeatures />
        </Default>
      </>
    ),
    [theme, settings]
  ); // Only re-create when theme or settings change

  return <Switch value={user.type}>{switchContent}</Switch>;
};
```

## Type Safety

The switch components are fully type-safe with TypeScript:

- Generic type support for switch values
- Type checking for case values
- IntelliSense support for all props

```tsx
// Strongly typed enum switching
enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

<Switch value={order.status}>
  <Case value={OrderStatus.PENDING}>
    <PendingOrder />
  </Case>
  <Case value={[OrderStatus.PROCESSING, OrderStatus.SHIPPED]}>
    <ActiveOrder />
  </Case>
  <Case value={OrderStatus.DELIVERED}>
    <CompletedOrder />
  </Case>
  <Case value={OrderStatus.CANCELLED}>
    <CancelledOrder />
  </Case>
</Switch>;
```

## Performance Notes

- Switch evaluation stops at the first matching case
- Cases are evaluated in the order they appear
- Consider placing most common cases first for better performance
- The `is` function is called for each case until a match is found
