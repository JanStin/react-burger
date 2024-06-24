import styles from "./styles.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { forgotPasswordRequest } from "../../utils/api";
import { deleteCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [form, setValue] = useState({ email: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitRestore = useCallback(
    (e) => {
      e.preventDefault();
      forgotPasswordRequest(form).then((res) => {
        if (res.success) {
          deleteCookie("resetPassword");
          setError(false);
          navigate("/reset-password");
        } else {
          setError(res.message);
        }
      });
    },
    [navigate, form]
  );

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={submitRestore}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
          errorText="Ошибка"
          error={error}
        />
        <div className={styles.button}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
          >
            Восстановить
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
