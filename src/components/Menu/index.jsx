import {NavLink} from 'react-router-dom'
import {ReactComponent as BasketIcon} from '../../assets/icons/basket.svg'

const Menu = () => {
  return (
  <NavLink to='/basket'>
  <div className='menu-wrapper'>
  <div className="icon-wrapper">
  <BasketIcon className="basket-icon"/>
  </div>
  </div>
  </NavLink>)
}

export default Menu;
