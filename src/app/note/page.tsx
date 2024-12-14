import Dropbox from "../../components/note/dropbox";
import { SubmitBtn, WriteBtn } from "../../components/note/notebtn";


export default function Note() {
    return (
        <div>
            <div>
                <div className="text-2xl mb-4 text-center">
                    개발자의 노트입니다.
                </div>
                <div className="flex space-x-2">
                    <Dropbox />
                    <input type="text" className="text-black w-56 pl-2 rounded h-7 outline-none" placeholder="검색어를 입력하세요" />
                    <SubmitBtn />
                    <WriteBtn />
                </div>
            </div>
        </div>
    )
}