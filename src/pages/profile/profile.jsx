import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, updateUser } from "../../services/actions/auth";

export const ProfilePage = () => {
  const user = useSelector((store) => store.user.user);
  const [form, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const logoutClick = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  const showButtons = () => {
    if (form.name !== user.name) return true;
    if (form.email !== user.email) return true;
    if (form.password !== "") return true;
    return false;
  };

  const submitSave = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser(form));
    },
    [dispatch, form]
  );

  const onCanel = (e) => {
    e.preventDefault();
    setValue({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.side}>
        <Link to="/profile" className={styles.active}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={styles.link}>
          История заказов
        </Link>
        <a className={styles.link} onClick={logoutClick} href="/logout">
          Выход
        </a>
        <p className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.main} onSubmit={submitSave}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => onChange(e)}
          value={form.name}
          name={"name"}
          error={false}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={(e) => onChange(e)}
          value={form.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => onChange(e)}
          value={form.password}
          icon={"EditIcon"}
          name={"password"}
          extraClass="mb-6"
        />
        {showButtons() && (
          <div className={styles.buttons}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={(e) => onCanel(e)}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
