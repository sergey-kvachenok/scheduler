import axios from 'axios';

// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
    Notification.requestPermission(async result => {
      if (result !== 'granted') {
        console.log('No result granted');
        return;
      }
    });

    console.log('navigator.serviceWorker', navigator.serviceWorker);
    const register = await navigator.serviceWorker.ready;
    console.log('register', register);
    let pushManager = register?.pushManager;

    // if (!pushManager && isSafari) {
    //   pushManager = window.safari.pushNotification;
    // }
    console.log('pushManager', pushManager);
    let subscription = await pushManager.getSubscription();
    console.log('subscription', subscription);
    if (!subscription) {
      subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
      });
    }
    await sendRegistration(subscription);
    displayConfirmationNotification();
  } catch (error) {
    console.log('HORROR', error);
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
