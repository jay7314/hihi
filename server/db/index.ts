import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host:process.env.DB_HOST || `localhost`,
    user:process.env.DB_USER || `root`,
    password:process.env.DB_PASSWORD || '',
    database:process.env.DB_NAME || 'board',
    
});

pool.getConnection().then((connection) =>{
    console.log('sql연결 성공');
    connection.release();
})
.catch((e)=>{
    console.error(`sql연결 실패`, e.message);
});

export default pool;

//mysql 연결코드 작성