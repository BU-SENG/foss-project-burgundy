export default function MoodSelect() {
  const moods = ["Happy", "Sad", "Angry", "Lonely", "Stressed"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>

      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className="bg-gray-100 p-4 rounded-xl text-center shadow"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
