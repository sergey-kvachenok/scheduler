const sw = async () => {
  const serviceWorkerUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register(serviceWorkerUrl);
  }
};

export default sw;
