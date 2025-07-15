import { Outlet } from "react-router-dom";
import type { User } from "../types";
import Navigation from "../widgets/Navigation/Navigation";
import Footer from "../widgets/Footer/Footer";

interface LayoutProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Layout({ user, setUser }: LayoutProps) {
  return (
    <div className="app">
      <Navigation user={user} setUser={setUser} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
