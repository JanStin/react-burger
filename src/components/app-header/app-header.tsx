import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ButtonHeader from "../button-header/button-header";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.part}>
        {/** @ts-ignore */}
        <ButtonHeader icon={<BurgerIcon />} text="Конструктор" href="/" />
        {/** @ts-ignore */}
        <ButtonHeader icon={<ListIcon />} text="Лента заказов" href="/feed" />
      </div>
      <div className={styles.center}>
        {/** @ts-ignore */}
        <Link className="logo" to="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.end}>
        {/** @ts-ignore */}
        <ButtonHeader icon={<ProfileIcon />} text="Личный кабинет" href="/profile" />
      </div>
    </header>
  );
}

export default AppHeader;
