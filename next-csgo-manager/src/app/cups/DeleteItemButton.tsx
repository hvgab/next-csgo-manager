import { useMutation } from "@tanstack/react-query";

function DeleteItemButton({ itemId }) {
  const [deleteItem, { isDeleting }] = useMutation(
    async () => {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
      });
      return res.json();
    },
    {
      onSuccess: () => {
        console.log("Item deleted!");
        // log a success message to the console
      },
    }
  );

  return (
    <button onClick={deleteItem} disabled={isDeleting}>
      Delete Item
    </button>
  );
}
