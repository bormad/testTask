import { Routes, Route } from "react-router-dom";
import styles from "./styles/App.module.scss";
import { Sidebar } from "../components";
import { MainPage, AuthPage, RegPage, ProfilePage, ErrorPage } from "../Pages";

export const App = () => {
  return (
    <div className={styles.App}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
