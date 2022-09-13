import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messagesApi';

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
        }),
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
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
                const { data: resData } = (await queryFulfilled) || {};

                if (resData?.id) {
                    const messageSender = resData.users.find(
                        (user) => user.email === sender
                    );
                    const messageReceiver = resData.users.find(
                        (user) => user.email !== sender
                    );

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: resData.id,
                            sender: messageSender,
                            receiver: messageReceiver,
                            message: resData.message,
                            timestamp: resData.timestamp,
                        })
                    );
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
                { sender, data },
                { queryFulfilled, dispatch }
            ) {
                const { data: resData } = (await queryFulfilled) || {};

                if (resData?.id) {
                    const messageSender = resData.users.find(
                        (user) => user.email === sender
                    );
                    const messageReceiver = resData.users.find(
                        (user) => user.email !== sender
                    );

                    dispatch(
                        messagesApi.endpoints.addMessage.initiate({
                            conversationId: resData.id,
                            sender: messageSender,
                            receiver: messageReceiver,
                            message: resData.message,
                            timestamp: resData.timestamp,
                        })
                    );
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
