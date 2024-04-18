import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import Button from '../button-header/Button-header';
import './App-header.modules.css';


function AppHeader() {
  return (
    <header className="header pt-4 pb-4">
      <div className='part'>
        <Button className="btn1" icon={<BurgerIcon />} text="Конструктор" active={true} />
        <Button className="btn2" icon={<ListIcon  />} text="Лента заказов" />
      </div>
      <div className='part center'>
        <Logo className="logo" />
      </div>
      <div className='part end'>
        <Button className="btn2" icon={<ProfileIcon   />} text="Личный кабинет" />
      </div>
    </header>
  );
}

export default AppHeader;
