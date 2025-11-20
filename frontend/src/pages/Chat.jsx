import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SendChat } from "../services/chatService"; // Your SendChat function

export default function Chat() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const receiverId = params.get("receiverId");
    const receiverName = params.get("username");

    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const sent = await SendChat(message, receiverId);
            setChatLog(prev => [...prev, sent]);
            setMessage("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="p-4 min-h-screen bg-[#120F22] text-white flex flex-col">
            <h2 className="text-xl font-bold mb-4">Chat with {receiverName}</h2>

            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {chatLog.map((c, i) => (
                    <div key={i} className="p-2 bg-gray-800 rounded">{c.message}</div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 rounded bg-gray-700 text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    className="px-4 py-2 bg-sky-500 rounded font-semibold"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </main>
    );
}
