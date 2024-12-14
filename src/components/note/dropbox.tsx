"use client"
import { useState } from "react"

export default function Dropbox() {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("종류");

    const handleClick = (value : string)=>{
        setSelected(value);
        setIsOpen(false);
    }

    return (
        <div className="relative border-b w-16 text-center border-gray-300 text-white"
        onBlur={()=>setIsOpen(false)}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {selected}
            </button>

            {isOpen && (
                <ul className="absolute flex flex-col mt-2 ml-2">
                    <li className="cursor-pointer" onMouseDown={() => handleClick("제목")}>
                        제목
                    </li>
                    <li className="cursor-pointer" onMouseDown={() => handleClick("내용")}>
                        내용
                    </li>
                    <li className="cursor-pointer" onMouseDown={() => handleClick("작성자")}>
                        작성자
                    </li>
                </ul>
            )}
        </div>
    )
}
//blur > focus > mouseup> click  순서로 클릭이 된다더라 그래서 onClick이벤트가 아니라 onMouseDown으로 변경해야 한다.