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
    <h3 class="body--subtitle">Technology Stack</h3>
    <p class="body--text">Three.js</p>
    <p class="body--text">AI</p>
    <p class="body--text">Svelte</p>
    <h3 class="body--subtitle">Services</h3>
    <p class="body--text">3D viewer</p>
  </div>
</Modal>

