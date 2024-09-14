import Link from "next/link";
import { prisma } from "../lib/database";
import { Card, Text } from "@rneui/themed";

// Components

async function getorganizations() {
  const organizations = await prisma.organization.findMany();
  return organizations;
}

export default async function organizationList() {
  const organizations = await getorganizations();
  console.log(organizations);

  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 className="font-bold text-2xl">Registered organizations</h1>
      </div>
      {organizations.map((organization) => (
        <div key={organization.id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="https://placehold.co/600x400" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{organization.name}</h2>
              <p>{organization.id}</p>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <a
                  href={`/organizations/${organization.id}`}
                  className="btn btn-primary"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="overflow-x-auto">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          <Link href="/organizations/create">Add organization</Link>
        </button>
      </div>
    </div>
  );
}
