import { useSelector } from 'react-redux';
import Message from './Message';

export default function Messages({ messages = [] }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
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
