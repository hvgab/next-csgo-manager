import { auth, signIn, signOut } from "./auth";

// async function getSession() {
//   const session = await auth();
//   return session;
// }
export const AuthUser = async () => {
  const session = await auth();
  console.log(session);
  return (
    <pre>
      <code>{JSON.stringify(session, null, 4)}</code>
    </pre>
  );
};
