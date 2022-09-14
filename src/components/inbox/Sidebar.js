import { useState } from 'react';
import ChatItems from './ChatIItems';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import Blank from "./Blank";

export default function Sidebar() {
    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };

    return (
        <div className="w-[100px] border-r border-t-0 border-[#f8fafc14] lg:col-span-1 md:w-full">
            <div className="h-[65px] text-center text-slate-100 p-4 border-b border-[#f8fafc14] flex md:justify-end justify-center items-center">
                <FontAwesomeIcon className='cursor-pointer' onClick={controlModal} icon={faUserPlus} />
            </div>
            <div className="overflow-auto bg-[#0B1120] h-[calc(100vh_-_129px)] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full">
                <ChatItems />
            </div>
            {/* <Blank /> */}
            <Modal open={opened} control={controlModal} />
        </div>
    );
}
