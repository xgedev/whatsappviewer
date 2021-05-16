# whatsappviewer

View your WhatsApp backups created with whatsappsaver

This app is created with [Svelte Kit](https://kit.svelte.dev) in no time because it was originally coded for personal use. There may be bugs.

# How to create a WhatsApp backup
Use [`whatsappsaver`](https://github.com/derxge/whatsappsaver).

# How to use
1. Backup your chats using [`whatsappsaver`](https://github.com/derxge/whatsappsaver)
2. Zip all folders inside `./systems/accounts/YOUR_PHONE_NUMBER` so you have a `YOUR_PHONE_NUMBER.zip` with all folders in `./systems/accounts/YOUR_PHONE_NUMBER` inside.
3. Run `npm install`
4. Run `npm run dev`
   1. With port `npm run dev -- --port YOUR_PORT`
   2. With host (accessible from outside your network) `npm run dev -- --host --port YOUR_PORT`
5. Open `http://localhost:3000` in your browser
6. Upload the `.zip` file you created (Note: If your zip file size is over 1.8GB you may need to create two or more zip files because you cannot upload zip files over 2GB for some reason)
7. View your chats on a WhatsApp themed website

# Missing message types
Note that some message types (like live locations) can not be displayed and document messages will not be displayed, too.

That's because I currently have no time implementing these. If you really need them, open an issue or just look into `./systems/accounts/YOUR_PHONE_NUMBER/YOUR_CHAT/media/YOUR_MESSAGE_ID`.
You can find the message id by opening the developer tools (F12) and inspecting the wrapper of a message.