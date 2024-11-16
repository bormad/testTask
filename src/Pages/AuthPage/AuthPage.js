import styles from "./AuthPage.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/slices/userSlice";
import { Button, Input, MyLink } from "../../components";
import { useNavigate } from "react-router-dom";

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
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      login: "anton",
      password: "qwerty123",
    },
    resolver: yupResolver(authFormShema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ login, password }) => {
    try {
      await dispatch(fetchUser({ login, password }));
      reset();
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.AuthPage}>
      <h2>Авторизоваться</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Логин..." {...register("login")} />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register("password")}
        />
        <Button type="submit">Авторизоваться</Button>

        <Button>
          <MyLink to={"/register"}>Зарегистрироваться</MyLink>
        </Button>
      </form>
    </div>
  );
};
