"use client"

import { useSession, signOut } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Navigation() {

    const path = usePathname();
    const isNoteAction = path.startsWith('/note');
    const { data: session } = useSession();

    const handleLogout = async () => {
        toast.success("로그아웃 되었습니다.", {
            autoClose: 1500,
        });
        localStorage.clear();
        sessionStorage.clear();
        await signOut({ redirect: false });
        const popup = window.open(
            'https://nid.naver.com/nidlogin.logout',
            '_blank',
            'width=1,height=1,left=-1000,top=-1000'
        );
        if (popup) {
            // 로그아웃 처리를 위한 약간의 대기
            setTimeout(() => {
                popup.close(); // 팝업 닫기
            }, 90); // 2초 후 닫기 (필요 시 조정)
        }
    };
    return (
        <div className="h-screen w-44 bg-navbackground bg-cover min-w-40 text-white flex flex-col justify-start fixed">
            <div className="flex flex-col justify-center items-center">
                <img src="/mypicture.jpg"
                    alt="mypicture"
                    className="mt-5 w-36 h-36 rounded-full " />
                <div className="mt-5">하정우</div>
                <div className="mt-1">개발자입니다.</div>
            </div>
            <ul className="flex flex-col justify-center text-center space-y-3 text-xl mt-3">
                <li>
                    <Link href={"/"}
                        className={`flex items-center justify-center ${path === '/' ? `scale-110 underline` : `scale-100 no-underline`}`}>
                        {path === '/' && (
                            <img src="/home.png"
                                alt="home"
                                className="h-6 w-6" />
                        )}
                        <div className="ml-1">Home</div>
                    </Link>
                </li>
                <li>
                    <Link href={("/project")}
                        className={`flex items-center justify-center ${path === '/project' ? `scale-110 underline` : `scale-100 no-underline`}`}>
                        {path === '/project' && (
                            <img src="prectice.png"
                                alt="prectice"
                                className="h-6 w-6" />
                        )}
                        <div className="ml-1">Project</div>
                    </Link>
                </li>
                <li>
                    <Link href={"/note"}
                        className={`flex items-center justify-center ${isNoteAction ? `scale-110 underline` : `scale-100 no-underline`}`}>
                        {isNoteAction && (
                            <img src="/study.png" alt="study" className="h-6 w-6" />
                        )}
                        <div className="ml-1">Note</div>
                    </Link>
                </li>
                <li className="flex justify-center items-center">
                    {session ? (
                        <button onClick={handleLogout}
                            className="flex items-center hover:scale-110 hover:underline group">
                            <img src="/logout.png"
                                alt="logout"
                                className="h-6 w-6 hidden group-hover:inline" />
                            <div className="ml-1">Logout</div>
                        </button>
                    ) : (
                        <Link href={"/login"}
                            className={`flex items-center ${path === '/login' ? `scale-110 underline` : `scale-100 no-underline`}`}>
                            {path === '/login' && (
                                <img src="login.png" alt="login" className="h-6 w-6" />
                            )}
                            <div className="ml-1">Login</div>
                        </Link>
                    )}
                </li>
            </ul>
            <div className={`flex justify-center text-center mt-auto mb-5 text-xl ${path === '/setting' ? 'scale-110 underline' : 'scale-100 no-underline'}`}>
                {path === '/setting' && (
                    <img src="setting.png" alt="setting" className="h-6 w-6" />
                )}
                <Link href={"/setting"}>
                <div className="ml-1">Setting</div></Link>
            </div>
        </div>
    )
}