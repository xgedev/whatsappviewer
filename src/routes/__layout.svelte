<script context="module">
 export function load({page}) {

  return {
   status: 200,
   props: {
    page
   }
  }

 }
</script>
<script>
 export let page;

 import '../app.css';
 import Navbar from "$lib/Navbar.svelte";
</script>


<Navbar page={page}/>
<slot />