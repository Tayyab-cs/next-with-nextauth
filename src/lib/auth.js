import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          console.log("Near to API call");
          const res = await fetch("http://localhost:3002/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();

          if (data.success) {
            const user = await Promise.resolve({
              userData: data.result.data,
              accessToken: data.accessToken,
            });
            console.log("auth console user: ", user);
            return user;
          }
        } catch (error) {
          console.error("Error during authentication:", error.message);
          return Promise.reject(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.userData.name;
        token.email = user.userData.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
