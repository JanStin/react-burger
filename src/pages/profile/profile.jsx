import styles from "./styles.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <div class={styles.body}>
      <div class={styles.side}>
        <Link to="/login" className={styles.active}>
          Профиль
        </Link>
        <Link to="/profile" className={styles.link}>
          История заказов
        </Link>
        <Link to="/profile" className={styles.link}>
          Выход
        </Link>
        <p className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div class={styles.main}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          // onChange={(e) => setValue(e.target.value)}
          // ref={inputRef}
          // onIconClick={onIconClick}
          value={"Марк"}
          name={"name"}
          error={false}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          // onChange={onChange}
          value={"mail@stellar.burgers"}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          // onChange={onChange}
          // value={value}
          icon={"EditIcon"}
          name={"password"}
          extraClass="mb-6"
        />
      </div>
    </div>
  );
};
