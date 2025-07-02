# Collection Components

The collection components provide elegant, declarative ways to render lists and iterate over data collections with built-in support for filtering, sorting, limiting, and more.

## Components

- [`<For>`](#for) - Iteration component for rendering lists

## For

The `<For>` component provides a declarative way to render lists of items with advanced features like filtering, sorting, limiting, and fallback content.

### Props

| Prop       | Type                                            | Description                                            |
| ---------- | ----------------------------------------------- | ------------------------------------------------------ |
| `each`     | `T[] \| null \| undefined`                      | The array of items to iterate over                     |
| `children` | `(props: RenderProps<T>) => ReactNode`          | Function that receives `{ item, index, itemKey, all }` |
| `as`       | `keyof JSX.IntrinsicElements`                   | Optional wrapper element (e.g., `"ul"`, `"div"`)       |
| `fallback` | `ReactNode`                                     | Content to show when array is empty or null            |
| `keyBy`    | `keyof T`                                       | Property to use as key for each item                   |
| `limit`    | `number`                                        | Maximum number of items to render                      |
| `offset`   | `number`                                        | Number of items to skip from the beginning             |
| `filter`   | `(item: T, index: number, all: T[]) => boolean` | Filter function to determine which items to render     |
| `sort`     | `(a: T, b: T) => number`                        | Sort function for ordering items                       |

### Render Props

The `children` function receives an object with the following properties:

| Property  | Type     | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| `item`    | `T`      | The current item being rendered                    |
| `index`   | `number` | The index of the item in the filtered/sorted array |
| `itemKey` | `string` | The unique key for the item                        |
| `all`     | `T[]`    | The original unfiltered array                      |

## Examples

### Simple List Rendering

```tsx
const fruits = ["Apple", "Banana", "Cherry", "Date"];

return (
  <For each={fruits}>
    {({ item, index }) => (
      <div>
        {index + 1}. {item}
      </div>
    )}
  </For>
);
```

### With Container Element

```tsx
const items = ["Item 1", "Item 2", "Item 3"];

return (
  <For each={items} as="ul">
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

### Complete Data Table

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
  role: "admin" | "user" | "moderator";
}

const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    active: true,
    role: "admin",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    age: 32,
    active: false,
    role: "user",
  },
  // ...
];

function UserTable({ users, filters }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <For
            each={users}
            filter={(user) => {
              // Apply multiple filters
              if (filters.onlyActive && !user.active) return false;
              if (filters.role && user.role !== filters.role) return false;
              if (filters.minAge && user.age < filters.minAge) return false;
              return true;
            }}
            sort={(a, b) => a.name.localeCompare(b.name)}
            keyBy="id"
            limit={filters.limit}
            fallback={
              <tr>
                <td colSpan={5} className="no-data">
                  No users match the current filters
                </td>
              </tr>
            }
          >
            {({ item: user, itemKey }) => (
              <tr key={itemKey}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <span className={`role role-${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={`status ${user.active ? "active" : "inactive"}`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
```
