import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

/* Update Item Form */
function UpdateItemForm({ itemId }) {
  const {
    data: item,
    isLoading,
    error,
  } = useQuery(["item", itemId], () =>
    fetch(`/api/items/${itemId}`).then((res) => res.json())
  );

  const [updateItem, { isUpdating }] = useMutation(async (data) => {
    const res = await fetch(`/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  });

  const { handleSubmit, register, errors } = useForm({
    defaultValues: { name: item.name },
    validationSchema,
  });

  const onSubmit = async (data) => {
    try {
      const updatedItem = await updateItem(data);
      console.log(updatedItem); // log the updated item to the console
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input name="name" ref={register} />
      {errors.name && <span>{errors.name.message}</span>}
      <br />
      <button type="submit" disabled={isUpdating}>
        Update Item
      </button>
    </form>
  );
}
