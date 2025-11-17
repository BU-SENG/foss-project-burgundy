import { useParams } from "react-router-dom";

export default function Chat() {
  const { id } = useParams();

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-blue-600 text-white p-4">Chat with Friend {id}</div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <div className="mb-2 bg-white p-3 rounded w-fit">Hey!</div>
        <div className="mb-2 bg-blue-500 text-white p-3 rounded w-fit ml-auto">
          How are you?
        </div>
      </div>

      <div className="p-3 border-t flex">
        <input className="flex-1 p-2 border rounded" placeholder="Type..." />
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
