export default function FriendRequests() {
  const requests = ["Emma", "Leo"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Friend Requests</h2>

      {requests.map((req) => (
        <div
          key={req}
          className="flex justify-between items-center p-4 border-b"
        >
          <span>{req}</span>

          <div className="flex gap-3">
            <button className="text-green-600">Accept</button>
            <button className="text-red-600">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}
