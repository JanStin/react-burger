import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import Button from '../button-header/Button-header';
import styles from './styles.module.css';


function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.part}>
        <Button icon={<BurgerIcon />} text="Конструктор" active={true} />
        <Button icon={<ListIcon  />} text="Лента заказов" />
      </div>
      <div className={styles.center}>
        <Logo className="logo" />
      </div>
      <div className={styles.end}>
        <Button icon={<ProfileIcon   />} text="Личный кабинет" />
      </div>
    </header>
  );
}

export default AppHeader;
