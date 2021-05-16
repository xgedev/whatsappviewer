<script>
 export let chats, chat;

 import { onMount } from "svelte";
 import { fade } from "svelte/transition";
 import Utils from "$lib/Utils.js";
 import { goto } from "$app/navigation";

 let openedPfp;

</script>

<div class="chat" on:click={() => goto(`/chat/${chat.info.jid}`)}>
 <img src={chat.profilePicture} alt="pfp-{chat.info.jid}" class="pfp {openedPfp === chat.info.jid ? "opened" : ""}" on:click={() => openedPfp = chat.info.jid}>
 <div class="details">
  <h2>{chat.info.name || chats.allContactInfos[chat.info.jid]?.name || `+${chat.info.jid.split("@")[0]}`}</h2>
  <p>{chat.messages[0].messageStubType || chat.messages[0].message.conversation}</p>
 </div>
</div>

<style>
 div.chat {
  display: flex;
  align-items: center;
  column-gap: 5px;
  row-gap: 2px;
  padding: 10px 15px;
  font-size: .8em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all .2s ease;
  cursor: pointer;
 }

 div.chat:hover {
  background: rgba(0, 0, 0, 0.15);
 }

 div.chat img.pfp {
  width: 50px;
  height: auto;
  border-radius: 50%;
 }

 div.chat div.details {
  width: calc(100% - 15px);
  overflow: hidden;
 }

 h2 {
  font-size: 1.7em;
 }

 p {
  font-size: 1.3em;
 }

</style>