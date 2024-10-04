import { useForm } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

/* Create Item Form */
function CreateItemForm() {
  /* Hooks */
  const { handleSubmit, register, errors } = useForm({
    validationSchema,
  });

  /* HandleOnSubmit */
  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newItem = await res.json();
      console.log(newItem);
      // log the newly created item to the console
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input name="name" ref={register} />
      {errors.name && <span>{errors.name.message}</span>}
      <br />
      <button type="submit">Create Item</button>
    </form>
  );
}
