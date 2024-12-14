import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

declare module "next-auth"{
    interface Session {
        user:{
            name? : string |null;
            email? : string |null;
            image? : string |null;
            accessToken? : string;
            refreshToken? : string;
            provider? : string;
        };
    }
    interface JWT {
        accessToken?:string;
        refreshToken?:string;
        provider?:string;
    }
}

export const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: { params: { prompt: 'login' } },
        }),
        NaverProvider({
            clientId : process.env.NAVER_CLIENT_ID as string,
            clientSecret : process.env.NAVER_CLIENT_SECRET as string,
        }),
        KakaoProvider({
            clientId : process.env.KAKAO_CLIENT_ID as string,
            clientSecret : process.env.KAKAO_CLIENT_SECRET as string,
            authorization: { params: { prompt: 'login' } },
        }),
    ],
    callbacks : {
        async jwt({token, account, user}){
            if(account&&account.access_token&&account.refresh_token&&account.provider){
                token.accessToken=account.access_token;
                token.refreshToken=account.refresh_token;
                token.provider=account.provider;
            }
            return token
        },
        async session({session, token}){
            if(session.user){
            session.user.accessToken = token.accessToken;
            session.user.refreshToken= token.refreshToken;
            session.user.provider=token.provider;
            }
            return session;
        },
    },
    secret:process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST}