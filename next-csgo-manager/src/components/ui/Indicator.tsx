export default function Indicatior({
  color,
}: {
  color: "white" | "black" | "blue" | "green" | "red" | "yellow";
}) {
  switch (color) {
    case "white":
      return (
        <span className="flex w-3 h-3 me-3 bg-gray-200 rounded-full"></span>
      );
    case "black":
      return (
        <span className="flex w-3 h-3 me-3 bg-gray-900 rounded-full dark:bg-gray-700"></span>
      );
    case "blue":
      return (
        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
      );
    case "green":
      return (
        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
      );
    case "red":
      return (
        <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
      );
    case "yellow":
      return (
        <span className="flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
      );
    default:
      return (
        <span className="flex w-3 h-3 me-3 bg-gray-200 rounded-full"></span>
      );
  }
}
