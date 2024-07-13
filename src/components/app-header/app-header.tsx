import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ButtonHeader from "../button-header/button-header";
import styles from "./styles.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.part}>
        {/** @ts-ignore */}
        <ButtonHeader icon={<BurgerIcon />} text="Конструктор" href="/" />
        {/** @ts-ignore */}
        <ButtonHeader icon={<ListIcon />} text="Лента заказов" href="#" />
      </div>
      <div className={styles.center}>
        {/** @ts-ignore */}
        <Logo className="logo" />
      </div>
      <div className={styles.end}>
        {/** @ts-ignore */}
        <ButtonHeader icon={<ProfileIcon />} text="Личный кабинет" href="/profile" />
      </div>
    </header>
  );
}

export default AppHeader;
