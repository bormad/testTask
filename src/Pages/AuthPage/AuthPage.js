import styles from "./AuthPage.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { Button, Input, MyLink, H1 } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Импортируем useState

const authFormShema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/\w+$/, "Неверный логин. Допускаются только буквы и цифры")
    .min(3, "Минимум 3 символа для логина")
    .max(15, "Недопускается больше 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(/^[\w#%]+$/, "Некорректный пароль")
    .min(6, "Минимум 6 символа для пароля")
    .max(20, "Недопускается больше 20 символов"),
});

export const AuthPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormShema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const onSubmit = async ({ login, password }) => {
    try {
      const res = await dispatch(fetchUser({ login, password }));
      if (res.error) {
        throw new Error();
      }
      navigate("/main");
      reset();
    } catch (err) {
      return setAuthError("Неверный логин или пароль");
    }
  };

  return (
    <div className={styles.AuthPage}>
      <H1>Авторизоваться</H1>
      {authError && <p className={styles.error}>{authError}</p>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Введите логин" {...register("login")} />
        {errors.login && <p className={styles.error}>{errors.login.message}</p>}

        <Input
          type="password"
          placeholder="Введите пароль"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <Button type="submit">Авторизоваться</Button>

        <MyLink to={"/register"} decoration>
          Зарегистрироваться
        </MyLink>
      </form>
    </div>
  );
};
