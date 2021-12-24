// libraries
import { NavLink } from 'react-router-dom';
// components
import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';
import webPush from 'web-push';

const displayConfirmationNotification = async () => {
  Notification.requestPermission(result => {
    console.log('result', result);
    if (result !== 'granted') {
      console.log('No result granted');
    } else {
      try {
        const options = {
          body: 'You have been successfully subscribed',
          icon: '/icon-192x192.png',
          image: '/icon-192x192.png',
          dir: 'rtl',
          lang: 'en-US',
          badge: '/icon-192x192.png',
          // tag: 'confirmation-tag',
          vibrate: [200, 100, 200],
          actions: [
            { action: 'confirm', title: 'Okay', icon: '/icon-192x192.png' },
            { action: 'cancel', title: 'Deny', icon: '/icon-192x192.png' },
          ],
        };

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(swreg => swreg.showNotification('Successfully subscribed', options));
        }
      } catch (err) {
        console.log('error', err);
      }
    }
  });
};

const configureSubscription = () => {
  if (!navigator.serviceWorker) return;

  let register;
  navigator.serviceWorker.ready
    .then(swreg => {
      register = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(subscription => {
      if (!subscription) {
        const vapidKeys = webPush.generateVAPIDKeys();
        // Create subscription for current browser
        return register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKeys.publicKey,
        });
      } else {
        // Have a subscription
      }
    })
    .then(newSubscription => {
      return fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          body: JSON.stringify(newSubscription),
        },
      });
    })
    .then(response => {
      console.log('response', response);
      displayConfirmationNotification();
    })
    .catch(err => {
      console.log(err);
    });
};

const Menu = () => {
  const isNotificationsInWindow = !!(Notification in window);
  console.log('isNotificationsInWindow', isNotificationsInWindow);

  return (
    <div className="menu-wrapper">
      <NavLink to="/basket">
        <button onClick={configureSubscription}>Enable notifications</button>
        <div className="icon-wrapper">
          <BasketIcon className="basket-icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default Menu;
