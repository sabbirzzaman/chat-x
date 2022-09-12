// import Blank from "./Blank";
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userLoggedOut } from '../../../features/auth/authSlice';
import { useGetMessagesQuery } from '../../../features/messages/messagesApi';
import Error from '../../ui/Error';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';

export default function ChatBody() {
    const { id } = useParams();
    const {
        data: messages,
        isLoading,
        isError,
        error,
    } = useGetMessagesQuery(id);

    const dispatch = useDispatch();

    // manage content
    let content;

    if (isLoading) {
        content = <div className="m-2 text-center">Loading...</div>;
    } else if (error?.status === 401) {
        dispatch(userLoggedOut())
    } else if (!isLoading && isError) {
        content = (
            <div className="m-2 text-center">
                <Error message={error.data}></Error>
            </div>
        );
    } else if (!isLoading && !isError && messages.length === 0) {
        content = (
            <>
                <ChatHead
                    avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    name="Akash Ahmed"
                />
                <div className="m-2 text-center">No Conversation Found</div>
                <Options />
            </>
        );
    } else if (!isLoading && !isError && messages.length > 0) {
        content = (
            <>
                <ChatHead message={messages[0]} />
                <Messages messages={messages} />
                <Options />
            </>
        );
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
                {/* <Blank /> */}
            </div>
        </div>
    );
}
