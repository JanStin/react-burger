import styles from "./styles.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { forgotPasswordRequest } from "../../utils/api";
import { setCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [form, setValue] = useState({ email: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  let restoreClick = useCallback(
    (e) => {
      e.preventDefault();
      forgotPasswordRequest(form).then((res) => {
        if (res.success) {
          setCookie("resetPassword", true, { "max-age": 3600 });
          setError(false);
          console.log(res);
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
      <form className={styles.form}>
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
            htmlType="button"
            type="primary"
            size="large"
            onClick={restoreClick}
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
