import { UserApi } from "@/entities/UserApi";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";
import type { User } from "@/types";
import "./Navigation.css";

interface NavigationProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Navigation({ user, setUser }: NavigationProps) {
  const naviagte = useNavigate()
  const signOutHandler = async () => {
    try {
      await UserApi.signOut(); 
      setUser(null);
      setAccessToken("");
      naviagte('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `header_link ${isActive ? "header_link--active" : ""}`
        }
      >
        Главная
      </NavLink>

      {!user ? (
        <div>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `header_link ${isActive ? "header_link--active" : ""}`
            }
          >
            Войти
          </NavLink>
          <NavLink
            to="/auth/registration"
            className={({ isActive }) =>
              `header_link ${isActive ? "header_link--active" : ""}`
            }
          >
            Зарегестрироваться
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink
            to="/myCabinet"
            className={({ isActive }) =>
              `header_link ${isActive ? "header_link--active" : ""}`
            }
          >
            Профиль
          </NavLink>
          
          <button onClick={signOutHandler}>Выйти</button>
        </div>
      )}
    </header>
  );
}
