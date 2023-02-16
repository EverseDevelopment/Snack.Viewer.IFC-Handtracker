<script>
  import Button from "./button.svelte";
  import FileUpload from "./fileUpload.svelte";

  export let type = 'button'
  export let props = {}
</script>

{#if type === 'button'}
  <Button {...props}></Button>
{:else if type === 'file'}
  <FileUpload {...props} />
{/if}

<style>
  :global(:root) {
    --primary-color: #dc3545;
    --secondary-color: #f7df4f;
  }
:global(.arrow) {
  height: 1rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
:global(.primary) {
  color: var(--primary-color) !important;
}
:global(.secondary) {
  color: var(--secondary-color) !important;
}
:global(.button) {
  width: 100%;
  padding: 0.25rem 1rem;
  margin: 0.25rem 0;
  background-color: #18263C;
  border-radius: 6px;
  border: none !important;
  font-weight: bold;
}
:global(.button:hover) {
  cursor: pointer;
  opacity: 0.95;
}
</style>