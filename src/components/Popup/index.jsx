import Portal from '../Portal'

const Popup = ({children, onClose, isOpened}) => {
  if (!isOpened) {
    return null
  }

  return (
<Portal>
<div className="popup-wrapper" role='dialog'>
<div className="popup-overlay"
role="button"
tabIndex="0"
onClick={onClose}/>
{children}
</div>
</Portal>
  )
}

export default Popup;