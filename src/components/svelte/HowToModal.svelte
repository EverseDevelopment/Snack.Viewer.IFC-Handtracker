<script>
  import Modal from "./everseComponents/Modal.svelte"

  export let activator = null
</script>
<Modal {activator} width={'18rem'}>
  <div id="HowToModalComponent" slot="body">
    <img src="./assets/images/howToMove.gif" width="200px" alt="A hand moves in the 4 directions of an axis"/>
  </div>
</Modal>