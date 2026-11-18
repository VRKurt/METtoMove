self.addEventListener('push', event => {
  let data = {title:'Movement Points', body:'Open the app and check your weekly progress.', url:'./index.html'};
  try { if (event.data) data = {...data, ...event.data.json()}; } catch {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body:data.body, icon:'apple-touch-icon.png', badge:'apple-touch-icon.png',
    tag:data.tag || 'movement-reminder', renotify:true, data:{url:data.url}
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list => {
    for (const client of list) if ('focus' in client) { client.navigate(event.notification.data.url); return client.focus(); }
    return clients.openWindow(event.notification.data.url);
  }));
});
