import { useQuery } from "@tanstack/react-query";

/* Fetch List of Items */
export default function ItemList() {
  const { data, error } = useQuery("items", () =>
    fetch("/api/items").then((res) => res.json())
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
