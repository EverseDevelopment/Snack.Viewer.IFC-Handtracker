<script>
  export let primary = true
  export let text = 'Upload File'
  export let id = 'uploadFile'
</script>

<label for={id} id={id + 'Button'} class="button" class:primary class:secondary={!primary}>
  {text}
</label>
<input type="file" {id}>