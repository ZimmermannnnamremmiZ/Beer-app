<template >
  <v-col class="section">
    <h2 class="title">Рекомендуемое пиво</h2>
    <v-card class="card beerInfo">
      <v-table class="beerInfo__table">
                <th>Название пива</th>
                <tr v-if="!isLoading">{{ bear.name }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
                <th>Бренд</th>
                <tr v-if="!isLoading">{{ bear.brand }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
                <th>Разновидность</th>
                <tr v-if="!isLoading">{{ bear.style }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
                <th>Хмель</th>
                <tr v-if="!isLoading">{{ bear.hop }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
                <th>Дрожжи</th>
                <tr v-if="!isLoading">{{ bear.yeast }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader"  indeterminate/>
                </tr>
                <th>Солод</th>
                <tr v-if="!isLoading">{{ bear.malts }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
                <th>Крепость</th>
                <tr v-if="!isLoading">{{ bear.alcohol }}</tr>
                <tr v-else>
                  <v-progress-circular class="beerInfo__table_loader" indeterminate/>
                </tr>
      </v-table>
      <div class="bubble bubble1"></div>
      <div class="bubble bubble2"></div>
      <div class="bubble bubble3"></div>
      <div class="bubble bubble4"></div>
      <div class="bubble bubble5"></div>
    </v-card>
    <v-btn class="beerInfo__btn" @click="getBear">Смена пива</v-btn>
  </v-col>
</template>

<script>
import fetchData from '@/api/fetchData';

export default {
  data: () => ({
    bear: {
      brand: '',
      name: '',
      style: '',
      hop: '',
      yeast: '',
      malts: '',
      alcohol: '',
    },
    isLoading: false,
  }),
  methods: {
    getBear() {
      this.isLoading = true;
      try {
        fetchData('beer/random_beer')
          .then((res) => {
            this.bear.brand = res.brand;
            this.bear.name = res.name;
            this.bear.style = res.style;
            this.bear.hop = res.hop;
            this.bear.yeast = res.yeast;
            this.bear.malts = res.malts;
            this.bear.alcohol = res.alcohol;
          })
          // eslint-disable-next-line no-return-assign
          .then(() => this.isLoading = false);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getBear();
  },
};
</script>

<style lang="scss" scoped>

  @import '@/styles/mediaScreen.scss';

  .card {
    @include respond-to(958px) {
      display: flex;
      align-items: center;
      min-height: 50vh;
    }
  }

  .title {
    margin-bottom: 2vh;
    text-align: center;
    @include respond-to(958px) {
      position: absolute;
      z-index: 1;
      padding: 10px 20px;
    }
  }

  .beerInfo {
    @include respond-to(958px) {height: 50vh}

    padding: 15px 40px;
    @include respond-to(510px) {padding: 20px 12px}

    border-top: 0;
    bottom: 0;
    background-color: #edaf32;
    border: 10px solid #edaf32;
    border-radius: 0 0 120px 120px;
    @include respond-to(958px) {border-radius: 0}
    bottom: 0;
    overflow: hidden;
    font-size: 20px;

    &:after {
      background-color: rgba(255, 255, 255, 0.25);
      bottom: -10px;
      content: '';
      height: 300px;
      left: -40px;
      position: absolute;
      transform: rotate(30deg);
      -webkit-transform: rotate(15deg);
      width: 110px;
    }

    &__table {
      background-color: inherit;
      border-radius: 0;
      @include respond-to(958px) {
        margin-left: 90px;
        margin-top: 50px;
      }
      @include respond-to(630px) {margin-left: 0}
      @include respond-to(480px) {font-size: 16px;}


      th {
        @include respond-to(958px) {
          height: 35px;
          position: relative;
          display: flex;
          flex-direction: column;
          text-align: start;
        }
      }

      tr {
        height: 35px;
        text-align: center;
        color: #6e0000;
        @include respond-to(958px) {
          position: absolute;
          left: 290px;
          margin-top: -35px;
          display: flex;
          flex-direction: column;
        }
        @include respond-to(630px) {left: 210px;}
        @include respond-to(510px) {left: 140px;}
      }

    }

    &__btn {
      bottom: -30px;
      width: 200px;
      margin-left: calc(50% - 100px);
      @include respond-to(958px) {
        position: absolute;
        height: 60px;
        background-color: inherit;
        color: #000000;
        top: 0;
        right: 0%;
      }
      @include respond-to(480px) {
        top: auto;
        bottom: 0;
        width: 165px;
        height: 45px;
        font-size: 13px;
      }
    }

    .bubble {
      position: absolute;
      animation-name: bubble;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-duration: 3s;
      background-color: rgba(255, 255, 255, 0.2);
      bottom: 0;
      border-radius: 10px;
      height: 20px;
      width: 20px;
    }
  }

  @keyframes bubble {
    0% {
      bottom: 0;
      border-radius: 50%;
    }

    50% {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 35% 65% 44% 56% / 42% 69% 31% 58%;
    }

    100% {
      background-color: rgba(255, 255, 255, 0);
      border-radius: 65% 35% 52% 48% / 57% 28% 72% 43%;
      bottom: 100%;
    }
  }

  .bubble1 {
    left: 5%;
    animation-delay: 1500ms;
    animation-duration: 1000ms;
  }

  .bubble2 {
    left: 25%;
    animation-delay: 700ms;
    animation-duration: 1100ms;
  }

  .bubble3 {
    left: 50%;
    animation-delay: 2200ms;
    animation-duration: 1300ms;
  }

  .bubble4 {
    left: 75%;
    animation-delay: 1100ms;
    animation-duration: 700ms;
  }

  .bubble5 {
    left: 95%;
    animation-delay: 1300ms;
    animation-duration: 800ms;
  }
</style>
