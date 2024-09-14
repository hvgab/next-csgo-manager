import { prisma } from "../../lib/database";
import useSWR from "swr";
import Image from "next/image";
import Organization from "../create/page";

interface Organization {
  id: string;
  name: string;
  cups: Cup[];
}

interface Cup {
  id: string;
  name: string;
}

const OrganizationHero = ({ name }: { name: string }) => (
  <div className="hero min-h-fit py-12 bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">{name}</h1>
        <p className="py-6">
          Kanskje legge inn en organization description her?
        </p>
        <button className="btn btn-primary">Bli medlem?</button>
      </div>
    </div>
  </div>
);

const CupCard = ({
  cup,
  organizationId,
}: {
  cup: Cup;
  organizationId: string;
}) => (
  <div key={cup.id} className="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img src="https://placehold.co/600x400" alt="Cup Image" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{cup.name}</h2>
      <p>{organizationId}</p>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
);

export default async function organizationDetail({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  let organization: Organization;

  try {
    organization = await prisma.organization.findUnique({
      where: {
        id: String(organizationId),
      },
      include: { cups: true },
    });
  } catch (error) {
    return <div>Error loading organization details</div>;
  }

  if (organization === null) {
    return <div>organization is null</div>;
  }

  return (
    <>
      <OrganizationHero name={organization.name} />

      {/* Cups Cards */}
      {organization.cups.map((cup: Cup) => (
        <CupCard key={cup.id} cup={cup} organizationId={organization.id} />
      ))}
      {/* JSON */}
      <pre>
        <code>{JSON.stringify(organization, null, 4)}</code>
      </pre>
    </>
  );
}
