import axios from 'axios';

const configureOptions = message => ({
  body: message,
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
});

export const configureSubscription = async () => {
  if (Notification.permission === 'granted') return;
  if (!navigator.serviceWorker) return;

  try {
    Notification.requestPermission(result => {
      console.log('result', result);
      if (result !== 'granted') {
        console.log('No result granted');
        return;
      }
    });

    const register = await navigator.serviceWorker.ready;

    let subscription = await register.pushManager.getSubscription();

    if (!subscription) {
      subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
      });
    }

    await sendRegistration(subscription);
    displayConfirmationNotification();
  } catch (error) {
    console.log('ERROR', error.status, error.message);
  }
};

const sendRegistration = async subscription => {
  try {
    const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}/app/register`, subscription);
    return response;
  } catch (err) {
    console.log('FETCH REGISTRATION ERROR', err);
    return null;
  }
};

const displayConfirmationNotification = async () => {
  try {
    const message = 'You have been successfully subscribed';
    const options = configureOptions(message);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(swreg => swreg.showNotification('Successfully subscribed', options));
    }
  } catch (err) {
    console.log('error', err);
  }
};
