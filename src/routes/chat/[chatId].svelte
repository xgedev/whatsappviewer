<script context="module">
 export function load({page}) {

  return {
   status: 200,
   props: {
    ...page.params
   }
  }

 }
</script>
<script>
 export let chatId;

 import { chats } from "$lib/chatStore.js";
 import { goto } from "$app/navigation";
 import { onMount, onDestroy } from "svelte";
 import ChatMessage from "$lib/chats/ChatMessage.svelte";

 let chat             = chatId ? $chats.allChats.find(c => c.info.jid === chatId) : null,
     showMessageCount = 20000;

 onMount(() => {

  console.log("mounted");

  chat = chatId ? $chats.allChats.find(c => c.info.jid === chatId) : null;

  if (!chat) return;

  let lastMessageElement = document.getElementById(chat.messages[0].key.id);
  
  if (!lastMessageElement) return;

  lastMessageElement.scrollIntoView();

 });

 function handleScroll() {

  console.log("heyho");

 }

 $: chat = chatId ? $chats.allChats.find(c => c.info.jid === chatId) : null;
</script>

<main>
 {#if chat}
  <div class="messages">
   {#each chat.messages.slice(0, showMessageCount).reverse() as message}
    <ChatMessage chats={$chats} chat={chat} chatId={chatId} message={message} />
   {/each}
  </div>
 {/if}
</main>

<style>
 :global(body) {
  background: lightgray;
 }

 main {
  padding-top: 50px;
  background: lightgray;
 }

 div.messages {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: lightgray;
  padding-bottom: 20px;
  padding-top: 20px;
 }
</style>