import { prisma } from "../../lib/database";

// Components
import ServerTableRow from "./ServerTableRow";

async function getOrganizations() {
  const organizations = await prisma.organization.findMany({
    include: {
      owner: true,
      admins: true,
      cup: true,
    },
  });
  return organizations;
}

export default async function OrganizationList() {
  const organizations = await getOrganizations();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Admins</th>
            <th>Cups</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <a href={`/organizations/${org.id}`}>{org.id}</a>
              </td>
              <td>
                <a href={`/organizations/${org.id}`}>{org.name}</a>
              </td>
              <td>{org.owner.name}</td>
              <td>
                {org.admins.map((admin) => (
                  <span key={admin.id}>{admin.name}</span>
                ))}
              </td>
              <td>{org.cup.length}</td>
              <td>
                <a className="btn btn-sm" href={`/organizations/${org.id}`}>
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Admins</th>
            <th>Cups</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
