import Image from "next/image";
import LoginButton from "../components/LoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-auto border-2">
        <p>Login Button Test</p>
        <LoginButton></LoginButton>
      </div>
    </main>
  );
}
