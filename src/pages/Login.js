import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/lws-logo-dark.svg';
import Error from '../components/ui/Error';
import { useLoginMutation } from '../features/auth/authApi';

export default function Login() {
    // local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // api hooks
    const [login, { data, isLoading, error: resError }] = useLoginMutation();

    // navigate hook
    const navigate = useNavigate();

    useEffect(() => {
        if (resError?.data) {
            setError(resError.data);
        }
        if (data?.accessToken) {
            setError('');
            navigate('/inbox');
        }
    }, [resError, data, navigate]);

    // handler functions
    const handleSubmit = (e) => {
        e.preventDefault();

        login({ email, password });
    };

    return (
        <div className="grid place-items-center h-screen bg-slate-900">
            <div class="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:right-30 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>

            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md px-8 py-10 backdrop-blur-sm bg-slate-800/[0.5] rounded-2xl w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logoImage}
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 rounded-t-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 rounded-b-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link
                                    to="/register"
                                    className="font-medium text-[#0284c7] hover:text-[#38bdf8]"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0284c7] hover:bg-[#38bdf8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38bdf8]"
                            >
                                Sign in
                            </button>
                        </div>

                        {
                            error && <Error message={error} />
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
