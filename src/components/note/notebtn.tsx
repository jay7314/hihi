"use client"
import Link from "next/link"


//찾기 버튼
export function SubmitBtn() {
    return (
        <div>
            <button type="submit" className="bg-white w-16 h-7 rounded text-black">찾기</button>
        </div>
    )
}
//글작성 버튼
export function WriteBtn() {
    return (
        <div>
            <button type="submit" className="bg-white w-16 h-7 border rounded text-black">
                <Link href={'/note/create'}>
                글작성
                </Link>
            </button>
        </div>
    )
}
