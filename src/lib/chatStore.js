import { writable } from "svelte/store";
import Utils from "$lib/Utils.js";

export let chats = writable(null);

export async function createChats(zip) {

 chats.set(0);

 let allChatIds      = [...new Set(Object.keys(zip.files).filter(k => !k.startsWith("contacts") && !k.startsWith("profilePictures")).map(k => k.split("/")[0]))],
     allChatInfos    = await Promise.all(allChatIds.map(async cId => JSON.parse(await zip.file(`${cId}/info.json`).async("string")))),
     allContactInfos = JSON.parse(await zip.file(`contacts.json`).async("string")),
     allChats        = await Promise.all(allChatIds.map(async cId => {
      return {
       info: allChatInfos.find(cI => cI.jid === cId),
       messages: JSON.parse(await zip.file(`${cId}/chat.json`).async("string")),
       profilePicture: Object.keys(zip.files).includes(`profilePictures/${cId}.jpg`) ? URL.createObjectURL(await zip.file(`profilePictures/${cId}.jpg`)?.async("blob")) : "/images/default.png"
      }
     }));

 chats.set({
  zip,
  allChatIds,
  allChatInfos,
  allContactInfos,
  allChats
 });

 return {
  zip,
  allChatIds,
  allChatInfos,
  allContactInfos,
  allChats
 };

}