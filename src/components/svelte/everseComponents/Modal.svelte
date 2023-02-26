<script>
  export let activator = null
  export let title = 'Title'
  export let content = []
  let display = false

  if(activator) {
    activator.addEventListener('click', () => { display = true })
  }
</script>
{#if display}
<div class="modal-wrapper">
  <div class="modal-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={() => {display = false}} class="close">&times;</span>      
  </div>
</div>
{/if}
<style>
  .modal-wrapper {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-container {
    background-color: #18263C;
    border-radius: 1rem;
    margin: 15% auto;
    padding: 3rem 6rem 1rem;
    width: 80%;
    max-width: 60rem;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 2rem;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    cursor: pointer;
  }
</style>