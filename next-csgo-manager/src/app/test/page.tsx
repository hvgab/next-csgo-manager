import TestComponent from "./component";
import { prisma } from "../lib/database";

export default function TestPage() {
  return (
    <>
      <p>Dette er ssr over</p>
      <p>hardkodet id 1</p>
      <TestComponent serverId={1}></TestComponent>
      <p>dette er ssr under</p>
    </>
  );
}
