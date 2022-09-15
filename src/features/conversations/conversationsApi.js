import { io } from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messagesApi';

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                const socket = io('http://localhost:9000', {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttempts: 10,
                    transports: ['websocket'],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;

                    socket.on('conversation', ({ data }) => {
                        updateCachedData((draft) => {
                            const conversation = draft.find(
                                (c) => c.id == data?.id
                            );

                            if (conversation?.id) {
                                conversation.message = data?.message;
                                conversation.timestamp = data?.timestamp;
                            } else {
                                draft.push(data);
                            }
                        });
                    });
                } catch (err) {}

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
        }),
        getMoreConversations: builder.query({
            query: ({ email, page }) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
            async onQueryStarted(
                { email },
                { queryFulfilled, dispatch }
            ) {
                try {
                    const { data: resData } = (await queryFulfilled) || {};

                    if (resData?.length > 0) {
                        // Pessimistic cache update
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getConversations',
                                email,
                                (draft) => {
                                    return [...draft, ...resData]
                                }
                            )
                        );
                    }
                } catch (err) {}
            },
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: `/conversations`,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(
                { sender, data },
                { queryFulfilled, dispatch }
            ) {
                // optimistic update start
                // const pathResult = dispatch(
                //     apiSlice.util.updateQueryData(
                //         'getConversations',
                //         sender,
                //         (draft) => {
                //             draft.push(data);
                //         }
                //     )
                // );
                // optimistic update end

                try {
                    const { data: resData } = (await queryFulfilled) || {};

                    if (resData?.id) {
                        const messageSender = resData.users.find(
                            (user) => user.email === sender
                        );
                        const messageReceiver = resData.users.find(
                            (user) => user.email !== sender
                        );

                        // const res =
                        await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: resData.id,
                                sender: messageSender,
                                receiver: messageReceiver,
                                message: resData.message,
                                timestamp: resData.timestamp,
                            })
                        );

                        // Pessimistic cache update
                        // const { data } = res || {};

                        // dispatch(
                        //     apiSlice.util.updateQueryData(
                        //         'getMessages',
                        //         data.conversationId.toString(),
                        //         (draft) => {
                        //             draft.push(data);
                        //         }
                        //     )
                        // );
                    }
                } catch (err) {
                    // pathResult.undo();
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, sender, data }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(
                { id, sender, data },
                { queryFulfilled, dispatch }
            ) {
                // optimistic update start
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getConversations',
                        sender,
                        (draft) => {
                            const draftConversation = draft.find(
                                (conversation) => conversation.id == id
                            );
                            draftConversation.message = data.message;
                            draftConversation.timestamp = data.timestamp;
                        }
                    )
                );
                // optimistic update end

                try {
                    const { data: resData } = (await queryFulfilled) || {};

                    if (resData?.id) {
                        const messageSender = resData.users.find(
                            (user) => user.email === sender
                        );
                        const messageReceiver = resData.users.find(
                            (user) => user.email !== sender
                        );

                        // const res =
                        await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: resData.id,
                                sender: messageSender,
                                receiver: messageReceiver,
                                message: resData.message,
                                timestamp: resData.timestamp,
                            })
                        );

                        // Pessimistic cache update
                        // const { data } = res || {};

                        // dispatch(
                        //     apiSlice.util.updateQueryData(
                        //         'getMessages',
                        //         data.conversationId.toString(),
                        //         (draft) => {
                        //             draft.push(data);
                        //         }
                        //     )
                        // );
                    }
                } catch (err) {
                    pathResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
