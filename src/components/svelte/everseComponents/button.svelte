<script>
  export let plain = false
  export let text = 'Button'
</script>

  <button class:plain>{text}</button>

  <style type="text/scss">
    .plain {
      background-color: transparent;
      border: 0;
    }
  </style>