<script>
  import Modal from "./everseComponents/Modal.svelte"

  export let activator = null
</script>
<Modal {activator}>
  <div slot="header">
    <h1 class="header--title">DATA MODEL</h1>
  </div>
  <div slot="body">
    <h3 class="body--subtitle">Description</h3>
    <p class="body--text">
      This is a 3D viewer to enable user to move the model using Image
      gesture recognition
    </p>
    <hr>

    <h3 class="body--subtitle">Services</h3>
    <p class="body--text">3D viewer</p>
            <hr>
    <h3 class="body--subtitle">Technology Stack</h3>
    <div class="body-container">
      <div class="body-container__cell">
        <img class="body-container__img" src="./assets/images/AI.png" alt="AI" title="AI" />
        <span>AI</span>
      </div>
      <div class="body-container__cell">
        <img class="body-container__img" src="./assets/images/js.png" alt="javascript" title="javascript" />
        <span>Javascript</span>
      </div>
      <div class="body-container__cell">
        <img class="body-container__img" src="./assets/images/svelte.png" alt="Svelte" title="Svelte" />
        <span>Svelte</span>
      </div>
      <div class="body-container__cell">
        <img class="body-container__img" src="./assets/images/threejs.png" alt="ThreeJS" title="ThreeJS" />
        <span>ThreeJS</span>
      </div>
    </div>

  </div>
</Modal>

