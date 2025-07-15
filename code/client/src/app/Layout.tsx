import { Outlet } from "react-router-dom";
import type { User } from "@/types";
import Navigation from "@/widgets/Navigation/Navigation";
import Footer from "@/widgets/Footer/Footer";
import { AlertContainer } from "@/features/alert";
import { NotificationContainer } from "@/features/notification/ui/NotificationContainer";

interface LayoutProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Layout({ user, setUser }: LayoutProps) {
  return (
    <div className="app">
      <Navigation user={user} setUser={setUser} />
      <NotificationContainer />
      <AlertContainer />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
