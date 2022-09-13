import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/lws-logo-dark.svg";
import Error from "../components/ui/Error";
import { useRegisterMutation } from "../features/auth/authApi";

export default function Register() {
    // local states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [error, setError] = useState('')

    // api hooks
    const [register, {data, isLoading, error: resError}] = useRegisterMutation();

    // navigate hook
    const navigate = useNavigate();

    useEffect(() => {
        if(resError?.data) {
            setError(resError.data)
        }
        if(data?.accessToken) {
            setError('');
            navigate('/inbox');
        }
    }, [resError, data, navigate])

    // handler functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError(`Passwords do not matched!`);
        } else {
            register({name, email, password})
        }
    }

    return (
        <div className="grid place-items-center h-screen bg-slate-900">
            <div class="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:right-30 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md px-8 py-10 backdrop-blur-sm bg-slate-800/[0.5] rounded-2xl w-full space-y-8 ">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logoImage}
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="Name"
                                    autoComplete="Name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 rounded-t-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-900/[0.6] border border-slate-500 placeholder-gray-400 text-slate-200 rounded-b-md focus:outline-none focus:ring-[#0284c7] focus:border-[#0284c7] focus:z-10 sm:text-sm"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="accept-terms"
                                    name="accept-terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#0284c7] focus:ring-[#0284c7] border-slate-500 rounded cursor-pointer"
                                    onChange={(e) => setAgreed(e.target.value)}
                                    checked={agreed}
                                    required
                                />
                                <label
                                    htmlFor="accept-terms"
                                    className="cursor-pointer ml-2 block text-sm text-slate-200"
                                >
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-100 bg-[#0284c7] hover:bg-[#38bdf8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284c7]"
                                disabled={isLoading}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                Sign up
                            </button>
                        </div>

                        {
                            error && <Error message={error}/> 
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
