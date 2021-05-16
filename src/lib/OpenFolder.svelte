<script>

 async function handleFolderClick() {
  let {
   fileOpen,
   directoryOpen,
   fileSave,
   supported,
  } = await import('browser-fs-access');

  let openedFolder = await directoryOpen();

 }
</script>

<p on:click={handleFolderClick}>Ordner auswählen</p>

<style>
 p {
  padding: 10px;
  background: var(--clr-green-400);
  border-radius: 10px;
  color: #fff;
  font-size: 1.2em;
 }

 p:hover {
  opacity: 80%;
 }
</style>