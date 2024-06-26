export default function ErrorRow({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={5} className="py-4 text-red-700 bg-red-50">
        <strong>Error: </strong> {message}
      </td>
    </tr>
  );
}
