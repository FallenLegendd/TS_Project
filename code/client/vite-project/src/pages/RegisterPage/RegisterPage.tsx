import type { User } from "../../types";
import SignUpForm from "../../features/auth/ui/SignUpForm/SignUpForm";

interface RegisterPageProps {
  setUser: (user: User | null) => void;
}

export default function RegisterPage({ setUser }: RegisterPageProps) {
  return <SignUpForm setUser={setUser} />;
}
