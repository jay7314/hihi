import NextAuth, {
  Account,
  Session,
  User,
  JWT,
  NextAuthOptions,
} from "next-auth";
//타입에서 사용되지 않은 타입들은 callback에서 매개변수 타입지정할때 사용이 된다. 삭제 하지 말고 일단 두자.
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

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
  //기존 user타입에 OAuth token타입 추가(accessToken, refreshToken, provider)

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
  }
}
// session에 작성했다가 JWT에도 작성하는 이유
// 원래는 JWT에서 처리되었다가 session에서 제공하기 위해서.. JWT는 서버중심, Session은 클라이언트 중심이라는 차이가 있음
export const authOptions: NextAuthOptions = {
  // NextAuthOptions : 인증 설정을 위한 주요 구성요소(provider, callbacks, secret)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "login" } },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: { params: { prompt: "login" } },
    }),
    //!로 사용한 이유가 절대 null이나 undefined가 아님을 보장함
    //타입스크립트의 보장성을 위해 as string을 사용하는 것도 고려가능
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token && typeof account.access_token === "string") {
        token.accessToken = account.access_token;
      }
      if (account?.refresh_token && typeof account.refresh_token === "string") {
        token.refreshToken = account.refresh_token;
      }
      if (account?.provider && typeof account.provider === "string") {
        token.provider = account.provider;
      }
      return token;
    },
    //jwt콜백 : oauth 제공자로 부터 전달된 accessToken, refreshToken, provider정보를 jwt에 저장
    async session({ session, token }) {
      if (session.user) {
        if (token.accessToken && typeof token.accessToken === "string") {
          session.user.accessToken = token.accessToken;
        }
        if (token.refreshToken && typeof token.refreshToken === "string") {
          session.user.refreshToken = token.refreshToken;
        }
        if (token.provider && typeof token.provider === "string") {
          session.user.provider = token.provider;
        }
      }
      return session;
    },
  },

  //session 콜백 : 클라이언트에 전달될 세션에 jwt의 accessToken, refreshToken, provider정보를 추가
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
