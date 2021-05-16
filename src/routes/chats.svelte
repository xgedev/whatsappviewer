<script>
 import { onMount } from "svelte";
 import { fade } from "svelte/transition";
 import Utils from "$lib/Utils.js";
 import { chats, createChats } from "$lib/chatStore.js";
 import { goto } from "$app/navigation";
 import ChatPreview from "$lib/chats/ChatPreview.svelte";

 $: console.log($chats);

</script>

<main>
 {#if $chats}
  <div class="chats" in:fade>
   {#each $chats.allChats as chat}
    <ChatPreview chats={$chats} chat={chat} />
    <hr>
   {/each}
  </div>
 {:else if $chats === 0}
  <div class="wrapper">
   <img src="/images/loading.svg" alt="loading" />
   <h4>Chats werden geöffnet...</h4>
  </div>
 {:else}
  <div class="wrapper">
   <p class="back-btn" on:click={() => goto("/")}>Zurück</p>
  </div>
 {/if}
</main>

<style>
 :global(body) {
  background: #fff;
 }

 main {
  background: #fff;
 }

 div.wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: .8em;
  text-align: center;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  row-gap: 20px;
 }

 p.back-btn {
  padding: 10px;
  background: var(--clr-green-400);
  border-radius: 10px;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
 }

 p.back-btn:hover {
  opacity: 80%;
 }

 div.chats {
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  font-size: .8em;
  background: #fff;
 }

 div.chats hr {
  width: 80%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.15) 95%,rgba(0, 0, 0, 0) 100%);
  align-self: center;
 }

</style>