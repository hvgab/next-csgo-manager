import TestComponent from "../component";
import { prisma } from "../../lib/database";

export default function TestPage({ params: { id } }: { params: { id: number } }) {
  return (
    <>
      <p>Dette er ssr over</p>
      <p>dynamisk id</p>
      <TestComponent serverId={id}></TestComponent>
      <p>dette er ssr under</p>
    </>
  );
}
