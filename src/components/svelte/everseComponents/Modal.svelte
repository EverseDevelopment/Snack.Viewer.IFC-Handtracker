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
    @media screen and (max-width: 968px) {
        .modal-container {
    margin: 15% 10px;
    padding: 1rem;
          width: auto !important;

  }
    }

  :global(.header--title) {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: xx-large;
    color: #ffffff;
  }
  :global(.body--subtitle) {
    color: #f94f46;
    font-weight: 700;
    font-size: large;
  }
  :global(.body--text) {
    color: grey;
    margin-bottom: 1rem;
  }
  :global(.body--image) {
   width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.animation--image) {
       border-radius: 6%;
    border: solid 2px #f94f46;
    padding: 6px;
  }
  :global(.body--list) {
    margin: 0;
  }
  :global(.body--list--item) {
    color: grey;
    list-style: none;
    position: relative;
    padding-left: 2rem;
  }
    :global(.body--list--item)::before {
      content: '';
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #f94f46;
      border-radius: 50%;
      left: 10px;
      top: 7px;
  }
  :global(.body-container) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  :global(.body-container__cell) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
  }
  :global(.body-container__img) {
    height: 4rem;
    filter: brightness(0) invert(1);
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