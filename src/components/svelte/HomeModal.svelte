<script>
  import Modal from "./everseComponents/Modal.svelte"
  import Input from "./everseComponents/input.svelte";


  let displayModal = true
  
  const props = {
    arrow: true,
    primary: true,
    text: `Let's start!`,
    onClick: () => {displayModal = false}
  }
</script>
{#if displayModal}
  <Modal width={'auto'}>
    <div slot="body">
      <div class="container">
        <div class="container__text">
          <h1 class="header--title">Hello!</h1>
          <p class="body--text">
            I'm ORION
          </p>
          <p class="body--text">
            In this demo, you will harness the power
            of artificial vision to control the view of a 3D model by
            simply using the gestures of your hand
          </p>
          <p class="body--text">
            Sounds like the future right? Well, it is already here.
          </p>
          <Input type={"button"} {props}></Input>
        </div>
        <div class="container__img"></div>
      </div>
    </div>    
  </Modal>
{/if}
<style>
  .container {
    display: flex;
    flex-direction: row;
  }
  .container__text {
    width: 50%;
    text-align: center;
  }
  .container__img {
    height: 20rem;
    width: 20rem;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(./assets/images/Frame.png);
}
  @media screen and (max-width: 968px) {
    .container__img{
      display: none;
    }
    .container__text {
      width:100%;
    }
  }
</style>