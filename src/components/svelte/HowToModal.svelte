<script>
  import Modal from "./everseComponents/Modal.svelte"

  export let activator = null
</script>
<Modal {activator} width={'25rem'}>
  <div id="HowToModalComponent" slot="body">
    <div>
      <h1 class="header--title">HOW TO USE</h1>
    </div>
            <hr>
    <h3 class="body--subtitle">Instructions:</h3>
    <ul class="body--list">
      <li class="body--list--item">Turn ON the camera</li>
      <li class="body--list--item">Place your hand in front of the camera</li>
      <li class="body--list--item">Move your hand</li>
    </ul>
        <hr>
    <div class="body--image">
          <img src="./assets/images/howToMove.gif" width="200px" alt="A hand moves in the 4 directions of an axis"/>
    </div>

  </div>
</Modal>