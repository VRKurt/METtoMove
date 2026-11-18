# Movement Points: GitHub-only push setup

## Files to upload
Upload all files and folders except `VAPID_SECRETS.txt` to the root of your GitHub Pages repository. Keep your existing `apple-touch-icon.png` there too.

## 1. Add the VAPID public key
Open `VAPID_SECRETS.txt`. In GitHub, go to **Settings > Secrets and variables > Actions > Variables** and add:

- `VAPID_PUBLIC_KEY`: copy the public key from the file.

## 2. Add private repository secrets
In **Settings > Secrets and variables > Actions > Secrets**, add:

- `VAPID_PRIVATE_KEY`: copy the private key from `VAPID_SECRETS.txt`.
- `VAPID_SUBJECT`: use `mailto:your-email-address`.

Do not commit `VAPID_SECRETS.txt`. Delete it from your local repository folder after creating the GitHub secret.

## 3. Publish and subscribe from the iPhone
1. Commit the files and wait for GitHub Pages to publish.
2. Remove the old Movement Points Home Screen icon and add it again from Safari. This ensures the manifest and service worker are installed cleanly.
3. Open Movement Points from its Home Screen icon.
4. Tap **Enable push notifications** and allow notifications.
5. Tap **Copy GitHub subscription**.

## 4. Save the iPhone subscription
In GitHub, create another Actions repository secret:

- `PUSH_SUBSCRIPTION`: paste the complete copied JSON value.

The endpoint and keys in this value are sensitive because they identify your push subscription. Keep it in GitHub Secrets, not in a committed file.

## 5. Test
1. Open the repository's **Actions** tab.
2. Select **Movement reminders**.
3. Choose **Run workflow**.
4. Select `test` and run it.

A notification should arrive on the iPhone, even with Movement Points closed.

## Schedule
The workflow checks hourly on Wednesday, Friday and Sunday, then gates delivery using `Europe/Brussels` local time:

- Wednesday at 19:00
- Friday at 18:00
- Sunday at 10:00

This avoids daylight-saving-time errors. GitHub Actions schedules can be delayed by several minutes, so reminders are not guaranteed to arrive at the exact minute.

## Important limitations
- These are fixed reminders. GitHub does not know your locally stored progress.
- If you reinstall the Home Screen app or the subscription expires, repeat steps 3-5 and replace `PUSH_SUBSCRIPTION`.
- Keep the repository active. GitHub may disable scheduled workflows in inactive public repositories.
