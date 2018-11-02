export const requestNotificationPermissions = () => {
  return new Promise((resolve, reject) => {
    if (!('Notification' in window)) {
      reject();

      return;
    }

    if (Notification.permission === 'granted') {
      resolve();

      return;
    }

    Notification.requestPermission(permission => {
      if (permission !== 'granted') {
        reject();

        return;
      }

      resolve();
    });
  });
};
