import { useSelector } from 'react-redux';
import gravatarUrl from 'gravatar-url';

export default function ChatHead({ message }) {
    const { user } = useSelector((state) => state.auth) || {};
    const { sender, receiver } = message || {};
    const { email } = user || {};

    const partnerEmail = sender.email !== email ? sender.email : receiver.email;
    const partnerName = sender.email !== email ? sender.name : receiver.name;

    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={gravatarUrl(partnerEmail, {size: 80})}
                alt={'name'}
            />
            <span className="block ml-2 font-bold text-gray-600">{partnerName}</span>
        </div>
    );
}
