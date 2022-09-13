import { useSelector } from 'react-redux';
import { useGetConversationsQuery } from '../../features/conversations/conversationsApi';
import Error from '../ui/Error';
import ChatItem from './ChatItem';
import moment from 'moment';
import getPartner from '../../utils/getPartner';
import gravatarUrl from 'gravatar-url';
import { Link } from 'react-router-dom';

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};

    const {
        data: conversations,
        isLoading,
        isError,
        error,
    } = useGetConversationsQuery(email);

    // manage content
    let content;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error.data}></Error>
            </li>
        );
    } else if (!isLoading && !isError && conversations.length === 0) {
        content = <li className="m-2 text-center">No Conversation Found</li>;
    } else if (!isLoading && !isError && conversations.length > 0) {
        content = conversations.map((conversation) => {
            const { id, users, message, timestamp } = conversation || {};

            const { email: partnerEmail, name } = getPartner(users, email);

            return (
                <li key={conversation.id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail, {
                                size: 80,
                            })}
                            name={name}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            );
        });
    }

    return <ul>{content}</ul>;
}
