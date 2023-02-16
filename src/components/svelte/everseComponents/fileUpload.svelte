<script>
  export let text = 'Upload File'
  export let id = 'uploadFile'
</script>

<label for={id} id={id + 'Button'} class="button">
  {text}
</label>
<input type="file" {id}>