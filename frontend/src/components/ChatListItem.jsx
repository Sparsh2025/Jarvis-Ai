
export default function ChatListItem({ chat, active, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-md cursor-pointer mb-2 ${
        active ? "bg-emerald-700/30" : "hover:bg-[#131c2e]"
      }`}
    >
      <p className="truncate text-gray-200">{chat.title}</p>
    </div>
  );
}
