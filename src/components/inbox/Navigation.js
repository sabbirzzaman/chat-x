import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/lws-logo-dark.svg';
import { userLoggedOut } from '../../features/auth/authSlice';

export default function Navigation() {
    const dispatch = useDispatch();

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
                            <span
                                onClick={handleLogout}
                                className="cursor-pointer text-slate-200 bg-slate-800 px-5 font-semibold py-2 rounded-lg hover:bg-slate-700 transition-all delay-75"
                            >
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
