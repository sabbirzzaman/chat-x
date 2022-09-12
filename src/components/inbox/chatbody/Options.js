export default function Options() {
    return (
        <div className="flex items-center justify-between w-full p-3 border-t border-[#f8fafc14]">
            <input
                type="text"
                placeholder="Message..."
                className="block text-slate-100 w-full py-2 pl-4 mx-3 border placeholder-gray-400 border-[#f8fafc14] bg-slate-800 focus:ring focus:ring-[#0284c7] rounded-lg outline-none focus:text-slate-100"
                name="message"
                required
            />
            <button type="submit">
                <svg
                    className="w-5 h-5 text-slate-200 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </div>
    );
}
