import NextAuth, { Account, Session, User, JWT, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
      provider?: string;
    };
  }
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: 'login' } },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: { params: { prompt: 'login' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token && typeof account.access_token === 'string') {
        token.accessToken = account.access_token;
      }
      if (account?.refresh_token && typeof account.refresh_token === 'string') {
        token.refreshToken = account.refresh_token;
      }
      if (account?.provider && typeof account.provider === 'string') {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.accessToken && typeof token.accessToken === 'string') {
          session.user.accessToken = token.accessToken;
        }
        if (token.refreshToken && typeof token.refreshToken === 'string') {
          session.user.refreshToken = token.refreshToken;
        }
        if (token.provider && typeof token.provider === 'string') {
          session.user.provider = token.provider;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
