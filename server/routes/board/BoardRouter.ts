import Router from "express";
import { BoardController } from "./BoardController";

const BoardRouter = Router();

//게시판 글쓰기
BoardRouter.post("/", async(req,res)=>{
    try{
        await BoardController.PostBoard(req,res);
    }
    catch(e){
        console.error(e)
    }
})

export default BoardRouter;

//라우터를 받는곳에서도 똑같이 async를 줘야 한다. 그래야지 문제가 발생되지 않는다. 현재 문제는 타입불일치로 인한 문제가 발생되었다.