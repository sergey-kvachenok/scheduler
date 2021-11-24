import { NavLink } from 'react-router-dom';
import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <NavLink to="/basket">
        <div className="icon-wrapper">
          <BasketIcon tabIndex="0" className="basket-icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default Menu;
