import { Inter } from "next/font/google";
import AuthContext from "@/app/components/AuthContext";
import Sidebar from "./sidebar";
const inter = Inter({ subsets: ["latin"] });
import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <Sidebar></Sidebar>
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="m-2"></div>
        <div className="min-h-[calc(100vh-20rem)]">{children}</div>
      </div>
    </div>
  );
}
