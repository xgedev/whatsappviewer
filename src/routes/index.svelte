<script>
 import { onMount } from "svelte";
 import Utils from "$lib/Utils.js";
 import { chats, createChats } from "$lib/chatStore.js";
 import { goto } from "$app/navigation";

 let mounted, loading;

 onMount(() => mounted = true);

 async function handleFolderClick() {
  let {
   fileOpen,
   directoryOpen,
   fileSave,
   supported,
  } = await import('browser-fs-access');

  let openedZip = await fileOpen({
   extensions: [".zip"],
   description: "WhatsApp Backup Zip"
  });

  loading = true;

  console.log("Reading...");

  let readZip = (await Utils.readZipBlob(openedZip));

  console.log("Done");

  if (Object.keys(readZip.files).find(k => !(k.split("/")[0].endsWith("@g.us") || k.split("/")[0].endsWith("@s.whatsapp.net") || k.split("/")[0].endsWith("@broadcast") || k.split("/")[0].startsWith("contacts") || k.split("/")[0].startsWith("profilePictures")))) {

   alert("ZIP-Datei ist keine richtige WhatsAppSaver-Backup Datei");
   loading = false;

  } else {

   createChats(readZip);
   goto("/chats");

  }

 }
</script>

<main>
 <div>
  {#if loading}
   <img src="/images/loading.svg" alt="loading" />
   <h4>Chats werden hochgeladen...</h4>
  {:else}
   <h1>Keine ZIP-Datei ausgewählt</h1>
   <p on:click={handleFolderClick}>ZIP-Datei auswählen</p>
  {/if}
 </div>
</main>

<style>
 div {
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
  row-gap: 20px;
 }

 p {
  padding: 10px;
  background: var(--clr-green-400);
  border-radius: 10px;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
 }

 p:hover {
  opacity: 80%;
 }
</style>