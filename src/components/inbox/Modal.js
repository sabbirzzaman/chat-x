import { useState } from 'react';
import { useGetUsersQuery } from '../../features/users/usersApi';
import emailValidation from '../../utils/emailValidation';
import Error from '../ui/Error';

export default function Modal({ open, control }) {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [requestSkip, setRequestSkip] = useState(false);

    const {data: participant} = useGetUsersQuery(to, {
        skip: !requestSkip,
    })

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...arg) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fn(...arg);
            }, delay);
        };
    };
    
    const doSearch = (value) => {
        if(emailValidation(value)) {
            setTo(value)
            setRequestSkip(true)
        }
    }

    const handleSearch = debounceHandler(doSearch, 500);

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded-md w-[400px] lg:w-[600px] space-y-8 backdrop-blur-md bg-slate-800/[0.5] p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    id="to"
                                    name="to"
                                    type="email"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-slate-900/[0.6] border-slate-500 placeholder-gray-400 text-slate-200 rounded-t-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-slate-900/[0.6] border-slate-500 placeholder-gray-400 text-slate-200 rounded-b-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-100 bg-[#0284c7] hover:bg-[#38bdf8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284c7]"
                            >
                                Send Message
                            </button>
                        </div>

                        {participant?.length === 0 && <Error message="User dose not exist!" />}
                    </form>
                </div>
            </>
        )
    );
}
