import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  useCallback,
  useState,
  MouseEvent,
  ChangeEvent,
  FormEvent
} from "react";
import { useDispatch, useSelector } from "../../services/store";
import { logout, updateUser } from "../../services/actions/auth";
import { TUser } from "../../utils/types";

export const ProfilePage = (): React.JSX.Element => {
  const user = useSelector(store => store.user.user);

  const initialFormState: TUser = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };

  const [form, setValue] = useState<TUser>(initialFormState);
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const logoutClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch(logout());
    },
    [dispatch]
  );

  const showButtons = (): boolean => {
    return (
      form.name !== (user?.name || "") ||
      form.email !== (user?.email || "") ||
      form.password !== ""
    );
  };

  const submitSave = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUser(form));
    },
    [dispatch, form]
  );

  const onCanel = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setValue(initialFormState);
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
        {/** @ts-ignore */}
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
          value={form.password as string}
          icon={"EditIcon"}
          name={"password"}
          extraClass="mb-6"
        />
        {showButtons() && (
          <div className={styles.buttons}>
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
            </Button>
            {/** @ts-ignore */}
            <Button htmlType="button" type="primary" size="large" onClick={onCanel}>
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
