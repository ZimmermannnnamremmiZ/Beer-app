<template>
  <v-app>
    <v-container class="container">
      <RandCharacter />
      <RandBeer />
    </v-container>
  </v-app>
</template>

<script>
import RandCharacter from './components/RandCharacter.vue';
import RandBeer from './components/RandBeer.vue';

export default {
  name: 'App',
  components: {
    RandCharacter,
    RandBeer,
  },
};
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
  @import '@/styles/mediaScreen.scss';

  * {
    font-family: "Roboto Condensed", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: rgb(171,118,180);
    background: linear-gradient(90deg, rgba(171,118,180,1) 0%, rgba(255,255,255,1) 50%, rgba(208,180,107,1) 100%);
  }

  #app {
    height: 100vh;
    max-width: 1400px;
    @include respond-to(958px) {
      width: 100%;
    }
    margin: 0 auto;
    display: flex;
    align-items: center;
    @include respond-to(958px) {
      align-items: flex-start;
    }
    justify-content: center;
  }

  .v-application {
    width: 90%;
    @include respond-to(958px) {
      width: 100%;
    }
  }

  .v-container {
    @include respond-to(958px) {
      padding: 0;
    }
    @include respond-to(768px) {
      display: flex;
    }
  }

  .v-col {
    @include respond-to(958px) {
      padding: 0;
    }
  }

  .container {
    @include respond-to(958px) {
      flex-direction: column;
    }
  }

  .card {
    min-height: 500px;
    @include respond-to(958px) {
      min-height: 0;
    }
  }

  .section {
    position: relative;
    width: 50%;
    @include respond-to(958px) {
      width: 100%;
      min-height: 50vh;
    }
  }

  .v-application {
    background: none;
  }

</style>
