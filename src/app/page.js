import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
  WelcomeButton,
  AboutButton,
} from "@/components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/components/user.component";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
        <WelcomeButton />
        <AboutButton />

        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>

        <User />
      </div>
    </main>
  );
}
