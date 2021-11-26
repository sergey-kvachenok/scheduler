// libraries
import { NavLink } from 'react-router-dom';
// components
import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <NavLink to="/basket">
        <div className="icon-wrapper">
          <BasketIcon className="basket-icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default Menu;
