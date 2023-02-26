<script>
  export let arrow = false
  export let primary = false
  export let href = ''
  export let text = 'Button'
  export let id = 'Button'
  export let onClick = () => {}
</script>

  {#if arrow}
    <div>
      <h5>
        <a {href} target="_blank" rel="noreferrer" class:primary class:secondary={!primary}>{text}</a>
      </h5>
      {#if primary}
        <div class="arrow" style="background-image: url(./assets/images/RedArrow.png);"></div>
      {:else}
        <div class="arrow" style="background-image: url(./assets/images/YellowArrow.png);"></div>
      {/if}
    </div>
  {:else}
    <button {id} class="button" on:click={onClick} class:primary class:secondary={!primary}>{text}</button>
  {/if}

  <style>
  .arrow {
    height: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  </style>
