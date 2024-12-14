import { Request, Response } from "express";
import { BoardService } from "./BoardService";

export const BoardController = {
    PostBoard:async(req:Request, res:Response)=>{
        try{
            await BoardService.PostBoard(req,res);
        }
        catch(e){
            console.error(e)
        }
    }
}