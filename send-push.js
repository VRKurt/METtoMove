const webpush = require('web-push');
const required = ['VAPID_PUBLIC_KEY','VAPID_PRIVATE_KEY','PUSH_SUBSCRIPTION','VAPID_SUBJECT'];
for (const key of required) if (!process.env[key]) throw new Error(`Missing secret ${key}`);
webpush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
const messages = {
  wed: {title:'Midweek movement check',body:'Open Movement Points and check whether you are on track for this week.'},
  fri: {title:'Friday movement check',body:'Review your remaining weekly targets and plan the weekend if needed.'},
  sun: {title:'Sunday movement reminder',body:'Final check: open Movement Points and complete any remaining target today.'},
  test:{title:'Movement Points test',body:'Push notifications are working.'}
};
const kind=process.argv[2]||'test';
webpush.sendNotification(JSON.parse(process.env.PUSH_SUBSCRIPTION), JSON.stringify({...messages[kind],tag:`movement-${kind}`,url:'./index.html'}))
.then(()=>console.log(`Sent ${kind} reminder`)).catch(err=>{console.error(err.statusCode,err.body||err.message);process.exit(1)});
