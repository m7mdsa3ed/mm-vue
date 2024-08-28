import store from "../store";

export const getDefaultRegistration = async (fileName) => {
  let registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    registration = await navigator.serviceWorker.register(fileName, {
      type: 'module',
      scope: '/',
    });
  }

  onUpdateFoundListener(registration)

  return registration;
}

const onUpdateFoundListener = (registration) => {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;

    store.dispatch('app/serviceWorkerStatus', {
      installing: true,
    });
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          store.dispatch('app/serviceWorkerStatus', {
            installing: false,
          });
        }
      }
    });
  });
}