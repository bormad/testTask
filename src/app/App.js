import { Routes, Route } from "react-router-dom";
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
  const user = useUser();
  return (
    <div className={styles.App}>
      <Modal />
      {user.id && <Sidebar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
