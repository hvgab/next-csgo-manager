// src/app/actions/servers.ts

// this is a server action
"use server";

// Import the database client and the Server type from Prisma
import { prisma } from "@/lib/database";
import type { Server, User } from "@prisma/client";

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Import the Zod library for validation
import { z } from "zod";

// Define a schema for the server using Zod
const serverSchema = z.object({
  // the title must be a string between 3 and 255 characters
  host: z.string().min(3).max(255),
  // the content must be a string between 10 and 4000 characters
  port: z.number(),
  rconPassword: z.string(),
});

// Define an interface for the form state
interface ServerFormState {
  errors: {
    host?: string[];
    port?: string[];
    _form?: string[];
  };
}

// Define an asynchronous function to create a server
export async function createServer(
  formState: ServerFormState,
  formData: FormData,
  user: User
): Promise<ServerFormState> {
  // Validate the form data against the server schema
  // If the form data does not match the schema, the safeParse method returns an object
  // with a success property of false and an error property containing the validation errors.
  // If the form data matches the schema, the safeParse method returns an object
  // with a success property of true and a data property containing the validated data.
  const result = serverSchema.safeParse({
    host: formData.get("host"),
    port: formData.get("port"),
    rconPassword: formData.get("rconPassword"),
  });

  // If validation fails, return the errors
  if (!result.success) {
    return {
      // The flatten method is used to convert the validation errors into a flat object structure
      // that can be easily displayed in the form.
      errors: result.error.flatten().fieldErrors,
    };
  }

  let server: Server;
  try {
    // If validation passes, create a new server in the database
    server = await prisma.server.create({
      data: {
        host: result.data.host,
        port: result.data.port,
        rconPassword: result.data.rconPassword,
        ownerUserId: user.id,
      },
    });
  } catch (error: unknown) {
    // If there's an error, return it
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  // Revalidate the path and redirect to the home page
  revalidatePath("/");
  redirect("/");
}

export async function updateServer(
  id: string,
  formState: ServerFormState,
  formData: FormData
): Promise<ServerFormState> {
  const result = serverSchema.safeParse({
    host: formData.get("host"),
    port: formData.get("port"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let server: Server;
  try {
    server = await prisma.server.update({
      where: { id },
      data: {
        host: result.data.host,
        port: result.data.port,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteServer(id: string): Promise<ServerFormState> {
  let server: Server;
  try {
    server = await prisma.server.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}
