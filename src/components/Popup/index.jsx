// components
import Portal from '../common/Portal';
// constants
import { keyCodes } from '../../constants';

const Popup = ({ children, onClose, isOpened }) => {
  if (!isOpened) {
    return null;
  }

  const handleKeyPress = async event => {
    const { keyCode } = event;

    if (keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER) {
      onClose();
    }
  };

  return (
    <Portal>
      <div className="popup-wrapper" role="dialog">
        <div
          className="popup-overlay"
          role="button"
          tabIndex="0"
          aria-pressed="false"
          onKeyDown={handleKeyPress}
          onClick={onClose}
        />
        {children}
      </div>
    </Portal>
  );
};

export default Popup;
