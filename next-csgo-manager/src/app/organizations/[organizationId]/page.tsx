import { prisma } from "@/lib/database";

export default async function Organization({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
    include: {
      owner: true,
      admins: true,
      cup: true,
    },
  });

  return (
    <div className="overflow-x-auto">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{organization?.name}</h2>

          <p>Owner: {organization?.owner.name}</p>
          <p>Admins:</p>
          <ul className="list-disc list-inside">
            {organization?.admins.map((admin) => (
              <li key={admin.id}>{admin.name}</li>
            ))}
          </ul>
          <p>Cups:</p>
          <ul className="list-disc list-inside">
            {organization?.cup.map((cup) => (
              <li key={cup.id}>{cup.name}</li>
            ))}
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral">Cups</button>
          </div>
        </div>
      </div>
      <pre>
        <code>{JSON.stringify(organization, null, 4)}</code>
      </pre>
    </div>
  );
}
