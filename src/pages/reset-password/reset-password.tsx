import styles from "./styles.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useCallback, useState, FormEvent, ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/api";
import { deleteCookie, getCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

type TResetPasswordPage = {
  code: string;
  password: string;
};

export const ResetPasswordPage = (): React.JSX.Element => {
  const [form, setValue] = useState<TResetPasswordPage>({
    code: "",
    password: "",
  });
  const cookei = "resetPassword";
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitResetPassword = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetPasswordRequest(form).then((res) => {
        if (res.success) {
          deleteCookie(cookei);
          navigate("/login");
        }
      });
    },
    [navigate, form]
  );

  if (!getCookie(cookei)) {
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={submitResetPassword}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          placeholder="Введите новый пароль"
          name={"password"}
          extraClass="mb-6"
        />
        {/** @ts-ignore */}
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
        <p className={styles.text}>
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
