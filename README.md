# whatsappviewer

View your WhatsApp backups created with whatsappsaver

This app is created with [Svelte Kit](https://kit.svelte.dev) in no time because it was originally coded for personal use. There may be bugs.

<img src="https://i.ibb.co/7SDjSqG/whatsappviewer-xge-1.png" alt="chats" width="200"><img src="https://i.ibb.co/pPbbbBm/whatsappviewer-xge-2.png" alt="chat" width="200">

## What will be displayed:
* Profile pictures
* Contact names
* Messages
* Images
* Videos
* Gifs
* Audios
* Replies
* Documents (only in the media directory)
* Date

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

# Language
**As mentioned earlier, I originally created this for personal use so all dialogues and texts are german**

# Message limitations
To prevent lags I limited the shown messages to 20,000. Everything higher than that will crash your browser / tab.

I could not figure out how to load more messages while scrolling etc.

If you want to change the shown messages, update the variable `showMessageCount` in `./src/routes/chat/[chatId].svelte` or change `chat.messages.slice` in the for each block (first 20,000 messages would be `chat.messages.slice(-showMessageCount)`)

# No search
Although there's a search button at the top, it is not working. I do not plan to implement that soon.