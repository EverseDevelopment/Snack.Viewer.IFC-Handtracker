<script>
  import { fade } from 'svelte/transition';

  export let activator = null
  export let width = '50rem'

  let display = false

  if(activator) {
    activator.addEventListener('click', () => { display = true })
  }else {
    display = true
  }
</script>
{#if display}
<div class="modal-wrapper">
  <div class="modal-container" style="width: {width}" transition:fade="{{delay: 250, duration: 300}}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={() => {display = false}} class="close">&times;</span> 
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>  
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
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
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-container {
    background-color: #18263C;
    border-radius: 1rem;
    margin: 15% auto;
    padding: 3rem;
    max-width: 50rem;
  }
  :global(.header--title) {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: calc(1.375rem + 1.5vw);
    color: #f7df4f;
  }
  :global(.body--subtitle) {
    color: #f94f46;
    font-weight: 700;
    font-size: medium;
  }
  :global(.body--text) {
    color: grey;
    margin-bottom: 1rem;
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