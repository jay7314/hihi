"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";

export default function CreateWrite() {
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const route = useRouter();

    const handleSubmit = async () => {
        if (!title || !content) {
            toast.warning("제목과 내용을 작성해 주세요");
        }

        await fetch("/api/board", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content }),
        });
        toast.success("글이 작성되었습니다.");
        route.push("/note")
    }


    return (
        <div className="text-center flex flex-col justify-start items-center">
            <div className="text-2xl mb-4 ">
                노트 작성
            </div>
            <div className="space-y-5 text-xl">
                <div>
                    제목
                    <input type="text" className="h-7 w-[540px] ml-2 p-2 text-sm text-black" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex">
                    내용
                    <textarea className="w-[540px] p-2 ml-2 text-sm text-black" placeholder="내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
            </div>
            <div>
                <button onClick={handleSubmit} className="bg-white w-16 h-7 border rounded text-black">
                   
                        저장하기
                  
                </button>
            </div>

        </div>
    )
}

