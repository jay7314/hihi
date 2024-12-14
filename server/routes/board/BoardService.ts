import express, { Request, Response } from "express";
import pool from '../../db';
import dotenv from 'dotenv';
import { getSession } from "next-auth/react";



export const BoardService = {
    PostBoard: async (req: Request, res: Response) => {
        try {
            const session = await getSession({req});
            if(!session){
                return res.status(401).json({message : "로그인이 필요합니다."});
            }
            const board_writer = session.user?.name;
            const {board_title, board_content} = req.body;

            if(!board_title || !board_content){
                res.status(400).json({message : "제목과 내용을 입력해주세요"});
            }
            const connection = await pool.getConnection();
            const query = `INSERT INTO board (board_title, board_content, board_writer) VALUES(?,?,?)`;
            await connection.query(query, [board_title, board_content, board_writer]);
            connection.release();
            return res.status(201).json({message : "게시글이 성공적으로 저장되었습니다."})
        }

        catch (e) {
            console.error(e)
        }
    }
}