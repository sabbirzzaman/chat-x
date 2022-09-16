import gravatarUrl from 'gravatar-url';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/lws-logo-dark.svg';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function Navigation() {
    const { user } = useSelector((state) => state.auth) || {};
    const dispatch = useDispatch();

    const { name, email } = user || {};

    const handleLogout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };
    return (
        <nav className="border-general sticky top-0 z-40 border-b border-[#f8fafc14] bg-[#0B1120] transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/">
                        <img
                            className="h-10"
                            src={logoImage}
                            alt="Learn with Sumit"
                        />
                    </Link>
                    <ul>
                        <li className="text-white">
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex="0"
                                    className="btn btn-ghost rounded-lg px-2 w-full gap-2 btn-circle avatar"
                                >
                                    <span className='font-bold text-slate-100 text-lg'>{name}</span>
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={gravatarUrl(email, {
                                                size: 80,
                                            })}
                                            alt={name}
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex="0"
                                    className="mt-3 p-2 shadow menu bg-[#0B1120] menu-compact dropdown-content rounded-lg w-52"
                                >
                                    <li>
                                        <span
                                            onClick={handleLogout}
                                            className="cursor-pointer text-slate-200 bg-[#0B1120] hover:bg-slate-800 px-5 font-semibold py-2 rounded-lg transition-all delay-75"
                                        >
                                            Logout
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
