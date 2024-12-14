"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
    const [borderAnimation, setBorderAnimation] = useState("");
    const { data: session } = useSession();
    const route = useRouter();

    useEffect(()=>{
        if (session) {
        toast.success(`환영합니다. ${session.user?.name}님`);
        route.push('/')
        }
        
    },[session, route])

    return (
        <div className='flex flex-col text-center items-center justify-center h-screen bg-background bg-cover text-white min-w-[400px]'>
            <div className={`flex flex-col items-center justify-center border-4 w-56 h-56 border-indigo-100 transition-all duration-500 ${borderAnimation}`}>

                <button
                    className="bg-googleColor text-white h-12 w-44 rounded-lg"
                    onMouseEnter={() => setBorderAnimation("animate-borderSpinGoogle")}
                    onMouseLeave={() => setBorderAnimation("")}
                    onClick={() => signIn("google", {prompt :'login'})}>Sign in With Google
                </button>

                <button
                    className="bg-naverColor h-12 w-44 rounded-lg m-2"
                    onMouseEnter={() => setBorderAnimation("animate-borderSpinNaver")}
                    onMouseLeave={() => setBorderAnimation("")}
                    onClick={() => signIn("naver", {prompt :'login'})}>
                    Sign in With Naver
                </button>

                <button
                    className="bg-kakaoColor h-12 w-44 rounded-lg "
                    onMouseEnter={() => setBorderAnimation("animate-borderSpinKakao")}
                    onMouseLeave={() => setBorderAnimation("")}
                    onClick={() => signIn("kakao", {prompt :'login'})}>
                    Sign in With Kakao
                </button>

            </div>
        </div>
    )
};

