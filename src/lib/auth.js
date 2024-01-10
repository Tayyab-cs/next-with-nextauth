import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
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
          console.log("Response data: ", data);

          if (data.success) {
            console.log("inside successfull signin");
            console.log("data.user: ", data.result.data);
            const user = Promise.resolve(data.result.data);
            console.log("user: ", user);
            return user;
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt token: ", token);
      console.log("jwt user: ", user);

      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session: ", session);
      console.log("token: ", token);
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
