<script>
 export let page;

 import { chats } from "$lib/chatStore.js";
 import { goto } from "$app/navigation";

 let chatId = page.path.includes("/chat/") ? page.path.split("/")[2] : null,
     chat   = chatId ? $chats.allChats.find(c => c.info.jid === chatId) : null;

 $: chatId = page.path.includes("/chat/") ? page.path.split("/")[2] : null;
 $: chat = chatId ? $chats.allChats.find(c => c.info.jid === chatId) : null;
</script>
<nav>
 <div class="wrapper {chat ? "hasChat" : ""}">
  {#if chat}
   <img class="back" src="/images/arrow-left.svg" alt="back-arrow" on:click={() => goto("/chats")}>
   <img class="pfp" src={chat.profilePicture} alt="pfp" on:click={() => goto("/chats")}>
  {/if}
  <h1>{chat ? (chat.info.name || `+${chat.info.jid.split("@")[0]}`) : "WhatsApp Viewer"}</h1>
 </div>
 <img src="/images/search.svg" alt="search" class="search">
</nav>

<style>
 nav {
  position: fixed;
  display: flex;
  width: 100%;
  height: 50px;
  background: var(--clr-green-600);
  color: #fff;
  justify-content: space-between;
  align-items: center;
  font-size: .8em;
  z-index: 100;
 }

 div.wrapper {
  display: flex;
  align-items: center;
  margin-left: 15px;
 }

 div.wrapper.hasChat {
  margin-left: 0;
 }

 nav img.search {
  width: 25px;
  height: auto;
  margin-right: 15px;
 }

 nav img.back {
  width: 15px;
  height: auto;
  padding: 10px;
  cursor: pointer;
 }

 nav img.pfp {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 5px;
 }

 div.wrapper.hasChat h1 {
  font-size: 1.2em;
 }
</style>