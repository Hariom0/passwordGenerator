import { Trash2 } from "lucide-react";

function PasswordHistory({ pass,removeSavedPassword }) {
  return (
    <div className="flex px-4 py-1 rounded-md justify-between bg-zinc-100 mt-2 text-gray-700">
      <span className="max-w-5/6 truncate">{pass}</span>
      <button className="text-red-500 transition-all hover:scale-110 active:scale-95">
        <Trash2 size={20} onClick={()=>removeSavedPassword(pass)} />
      </button>
    </div>
  );
}

export default PasswordHistory;
