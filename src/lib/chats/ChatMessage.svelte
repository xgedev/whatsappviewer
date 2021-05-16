<script>
 export let chats, chat, chatId, message;

 let id           = message.key.id,
     fromMe       = message.key.fromMe,
     timestamp    = message.messageTimestamp,
     time         = new Date(timestamp*1000).toLocaleTimeString(),
     isGroup      = chatId.endsWith("@g.us"),
     replyInfo    = message.message?.extendedTextMessage?.contextInfo,
     textContent  = message.message?.conversation || message.message?.extendedTextMessage?.text,
     audioContent = message.message?.audioMessage,
     imageContent = message.message?.imageMessage,
     videoContent = message.message?.videoMessage;

 let replyMessage = replyInfo ? chat.messages.find(m => m.key.id === replyInfo.stanzaId) : null;
 if (replyMessage)
  replyInfo.fromMe = replyMessage.key.fromMe;

 let messageBefore = chat.messages[chat.messages.indexOf(message)+1];

 function handleMessageScroll(messageId) {
  let messageElement = document.getElementById(messageId);
  if (!messageElement) return;
  messageElement.scrollIntoView({block: "center", behavior: "smooth"});
  messageElement.classList.add("highlight");
  setTimeout(() => {
   messageElement.classList.remove("highlight");
  }, 1000);
 }
</script>

{#if !messageBefore || new Date(messageBefore.messageTimestamp*1000).setHours(0, 0, 0, 0) !== new Date(timestamp*1000).setHours(0, 0, 0, 0)}
 <span class="info date">{new Date(timestamp*1000).toLocaleDateString()}</span>
{/if}
{#if message?.message}
 <span class="wrapper {fromMe ? "fromMe" : ""} {false ? "highlight" : ""}" id={id}>
  {#if isGroup && !fromMe}
  <span class="username {chats.allContactInfos[message.participant]?.name ? "" : "unknown"}">
   <h1>{message.participant ? (chats.allContactInfos[message.participant]?.name || `+${message.participant.split("@")[0]}` ) : "Unbekannter User"}</h1>
  </span>
  {/if}
  {#if replyInfo}
   <span class="reply {replyInfo.fromMe ? "fromMe" : ""}" on:click={() => handleMessageScroll(replyInfo.stanzaId)}>
    <h1>{replyInfo.fromMe ? "Du" : chats.allContactInfos[replyInfo.participant]?.name || "Unbekannter User"}</h1>
    <p>{replyInfo.quotedMessage?.conversation || (replyInfo.quotedMessage ? Object.keys(replyInfo.quotedMessage) : "Unbekannte Nachricht")}</p>
   </span>
  {/if}
  <span class="content">
   {#if textContent}
    {textContent}
   {:else if audioContent}
    {#if Object.keys(chats.zip.files).includes(`${chatId}/media/${id}.ogg`)}
     {#await chats.zip.file(`${chatId}/media/${id}.ogg`)?.async("blob")}
      <span class="red">Audionachricht laden...</span>
     {:then blob}
      <!-- svelte-ignore a11y-media-has-caption -->
      <audio controls>
       <source controls src={URL.createObjectURL(blob)} type="audio/ogg" />
      </audio>
     {:catch error}
      <span class="red">{error}</span>
     {/await}
    {:else}
     <span class="red">Unbekannte Audionachricht</span>
    {/if}
   {:else if imageContent}
    {#if Object.keys(chats.zip.files).includes(`${chatId}/media/${id}.${imageContent.mimetype.split("/")[1].split(";")[0]}`)}
     {#await chats.zip.file(`${chatId}/media/${id}.${imageContent.mimetype.split("/")[1].split(";")[0]}`)?.async("blob")}
      <span class="red">Bild laden...</span>
     {:then blob}
      <img src={URL.createObjectURL(blob)} alt="image-{id}" class="message-img" >
     {:catch error}
      <span class="red">{error}</span>
     {/await}
    {:else}
     <span class="red">Unbekanntes Bild</span>
    {/if}
   {:else if videoContent}
    {#if Object.keys(chats.zip.files).includes(`${chatId}/media/${id}.${videoContent.mimetype ? videoContent.mimetype.split("/")[1].split(";")[0] : "mp4"}`)}
     {#await chats.zip.file(`${chatId}/media/${id}.${videoContent.mimetype ? videoContent.mimetype.split("/")[1].split(";")[0] : "mp4"}`)?.async("blob")}
      <span class="red">Video laden...</span>
     {:then blob}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video controls src={URL.createObjectURL(blob)} alt="video-{id}" class="message-video" />
     {:catch error}
      <span class="red">{error}</span>
     {/await}
    {:else}
     <span class="red">Unbekanntes Video</span>
    {/if}
   {:else}
    <span class="red">Unbekannter Nachrichtentyp ({Object.keys(message.message)})</span>
    <!--<span class="red">Unbekannter Nachrichtentyp ({message?.message ? Object.keys(message.message) : message.messageStubType})</span>-->
   {/if}
   <span class="time">{time.slice(0, time.lastIndexOf(":"))}</span>
  </span>
 </span>
{:else}
 {#if !message}
  <span class="info red">Unbekannte Nachricht</span>
 {:else}
  <span class="info {message.messageStubType === "E2E_ENCRYPTED" ? "yellow" : ""}">{message.messageStubType}{message.messageStubParameters && message.messageStubParameters.length > 0 ? `: ${message.messageStubParameters.length > 1 ? message.messageStubParameters.map(p => p.endsWith("@s.whatsapp.net") ? `+${p.split("@")[0]}` : p) : message.messageStubParameters[0].endsWith("@s.whatsapp.net") ? (chats.allContactInfos[message.messageStubParameters[0]]?.name || `+${message.messageStubParameters[0].split("@")[0]}`) : message.messageStubParameters[0]}` : ""}</span>
 {/if}
{/if}

<style>
 span.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  background-color: var(--clr-white-400); 
  padding: 5px;
  margin-right: auto;
  margin-left: 8px;
  border-radius: 5px;
  max-width: 80%;
  overflow: hidden;
  transition: all .5s ease;
 }

 span.wrapper.fromMe {
  background-color: var(--clr-green-200);
  margin-left: auto;
  margin-right: 8px;
 }

 span.wrapper.highlight {
  background-color: var(--clr-accent);
 }

 span.content {
  padding-right: 40px;
 }

 span.time {
  position: absolute;
  right: 5px;
  bottom: 2px;
  font-size: .7em;
  color: rgb(148, 148, 148);
  margin-left: auto;
 }

 span.red {
  color: red;
 }

 img.message-img {
  max-width: 200px;
 }

 video.message-video {
  max-width: 200px;
 }

 span.username {
  padding: 1px;
  font-size: .9em;
  overflow: hidden;
 }

 span.username h1 {
  color: var(--clr-accent);
  font-size: .9em;
 }
 
 span.username.unknown h1 {
  color: var(--clr-accent-3);
 }

 span.reply {
  padding: 5px;
  height: 30px;
  font-size: .8em;
  overflow: hidden;
  border-left: 2px solid var(--clr-accent);
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2.5px;
 }

 span.reply h1 {
  color: var(--clr-accent);
  font-size: 1em;
 }

 span.reply.fromMe {
  border-left: 2px solid var(--clr-accent-2);
 }

 span.reply.fromMe h1 {
  color: var(--clr-accent-2);
 }

 span.reply p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }

 span.info {
  padding: 5px;
  background: var(--clr-blue-400);
  width: 80%;
  align-self: center;
  border-radius: 5px;
  text-align: center;
  font-size: .8em;
 }

 span.info.yellow {
  background: var(--clr-yellow-400);
 }

 span.info.date {
  width: auto;
  font-size: .9em;
  padding-left: 10px;
  padding-right: 10px;
  position: sticky;
  top: 60px;
  z-index: 200;
 }
</style>