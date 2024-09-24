// src/components/post-form.tsx

// this is a client component
"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

// Define the shape of the form errors
interface FormErrors {
  host?: string[];
  port?: string[];
}

// Define the shape of the form state
interface FormState {
  errors: FormErrors;
}

// Define the props that the PostForm component expects
interface ServerFormProps {
  formAction: any; // The action to perform when the form is submitted
  initialData: {
    // The initial data for the form fields
    host: string;
    port: number;
  };
}

// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields.
export default function ServerForm({
  formAction,
  initialData,
}: ServerFormProps) {
  // Initialize the form state and action
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {initialData.host ? "Update" : "Create"} Post
      </h1>
      <form action={action}>
        <div className="w-96">
          <div className="mb-4">
            <label htmlFor="host" className="block mb-2">
              Host
            </label>
            <input
              type="text"
              id="host"
              name="host"
              defaultValue={initialData.host}
              className="rounded p-2 w-full"
            />
            {formState.errors.host && (
              <div className="text-red-500">
                {formState.errors.host?.join(", ")}
                {/* // Display form errors related to the host field */}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="port" className="block mb-2">
              port
            </label>
            <input
              id="port"
              name="port"
              defaultValue={initialData.port}
              className="rounded p-2 w-full"
            ></input>
            {formState.errors.port && (
              <div className="text-red-500">
                {formState.errors.port?.join(", ")}
                {/* // Display form errors related to the port field */}
              </div>
            )}
          </div>
          <div className="mb-4">
            <button type="submit" className="bg-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <Link href="/" className="bg-transparent px-4 py-2 rounded">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
