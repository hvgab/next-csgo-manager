export default function MasterServerTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>IP</th>
          <th>Name</th>
          <th>Game</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
      {/* foot */}
      <tfoot>
        <tr>
          <th></th>
          <th>IP</th>
          <th>Name</th>
          <th>Game</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  );
}
