export const requestNotificationPermissions = () => {
  return new Promise((resolve, reject) => {
    if (!('Notification' in window)) {
      reject();

      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission(function (permission) {
        if (permission !== "granted") {
          reject();

          return;
        }

        resolve();
      });

      return;
    }

    resolve();
  })
};
