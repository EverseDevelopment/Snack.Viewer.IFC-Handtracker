<script>
  export let arrow = false
  export let primary = false
  export let text = 'Button'
  export let id = 'Button'
  export let onClick = () => {}
</script>

  {#if arrow}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={onClick} class="arrow-button">
      <h5 class:primary class:secondary={!primary}>
        {text}        
      </h5>
      {#if primary}
        <div class="arrow" style="background-image: url(./assets/images/RedArrow.png);"></div>
      {:else}
        <div class="arrow" style="background-image: url(./assets/images/YellowArrow.png);"></div>
      {/if}
    </div>
  {:else}
    <button {id} class="button" class:primary class:secondary={!primary}>{text}</button>
  {/if}

  <style>
  .arrow {
    height: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .arrow-button {
    font-size: medium;
  }
  .arrow-button:hover {
    cursor: pointer;
  }
  </style>
