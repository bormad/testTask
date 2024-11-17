import { Routes, Route, useLocation } from "react-router-dom";
import styles from "./styles/App.module.scss";
import { Sidebar } from "../components";
import {
  MainPage,
  AuthPage,
  RegPage,
  ProfilePage,
  ProjectPage,
  ErrorPage,
} from "../Pages";
import { Modal } from "../components/Modal/Modal";
import { useUser } from "../helpers";

export const App = () => {
  const location = useLocation();
  const user = useUser();

  return (
    <div className={styles.App}>
      <Modal />
      {Boolean(user.id) &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && <Sidebar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegPage />} />
        {Boolean(user.id) && (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </>
        )}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
