import type { User } from "../../types";
import SignInForm from "../../features/auth/ui/SignInForm/SignInForm";

interface LoginPageProps {
  setUser: (user: User | null) => void;
}

export default function LoginPage({ setUser }: LoginPageProps) {
  return <SignInForm setUser={setUser} />;
}
