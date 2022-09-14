export default function ChatItem({ avatar, name, lastMessage, lastTime }) {
    return (
        <div
            className="flex items-center px-3 py-3 text-sm transition duration-150 ease-in-out border-b border-[#f8fafc14] cursor-pointer hover:bg-slate-900 focus:outline-none"
            to="/"
        >
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={avatar}
                alt={name}
            />
            <div className="w-full hidden md:block">
                <div className="flex justify-between">
                    <span className="block ml-2 mb-1 font-semibold text-slate-100">
                        {name}
                    </span>
                    <span className="block ml-2 text-sm text-slate-400 mr-2">
                        {lastTime}
                    </span>
                </div>
                <span className="block ml-2 text-sm text-slate-400">
                    {lastMessage}
                </span>
            </div>
        </div>
    );
}
