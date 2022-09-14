import { useSelector } from 'react-redux';
import Message from './Message';

export default function Messages({ messages = [] }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 flex flex-col-reverse scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full">
            <ul className="space-y-2">
                {messages.map((message) => {
                    const { id, message: lastMessage, sender } = message || {};
                    const { email } = user || {};

                    const justify = sender.email !== email ? 'start' : 'end';

                    return <Message key={id} justify={justify} message={lastMessage} />;
                })}
            </ul>
        </div>
    );
}
