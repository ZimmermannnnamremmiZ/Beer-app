<template>
  <v-col class='section'>
    <h2 class="title">Ваш профиль</h2>
    <v-card class="card">
      <div class="randomCharacter">
        <div class="randomCharacter__avatar">
          <img class="randomCharacter__avatar_img" :src="character.avatarSrc" alt="avatar" @load="onImgLoaded" v-show="avatarLoaded">
            <v-progress-linear class="randomCharacter__avatar_loader"
                        color="#b41212"
                        :size="200"
                        indeterminate
                        v-if="!avatarLoaded" />
        </div>
        <v-table class='randomCharacter__info'>
              <th>Имя</th>
              <tr v-if="!isLoading">{{ character.name }}</tr>
              <tr v-else>
                <v-progress-circular  class="randomCharacter__info_spinner"
                                      :size="27"
                                      indeterminate
                                      />
              </tr>
              <th>Возраст</th>
              <tr v-if="!isLoading">{{ character.age }}</tr>
              <tr v-else>
                <v-progress-circular  class="randomCharacter__info_spinner"
                                      :size="27"
                                      indeterminate
                                      />
              </tr>
              <th>Специальность</th>
              <tr v-if="!isLoading">{{ character.employment }}</tr>
              <tr v-else>
                <v-progress-circular  class="randomCharacter__info_spinner"
                                      :size="27"
                                      indeterminate
                                      />
              </tr>
        </v-table>
      </div>
    </v-card>
    <v-btn class="randomCharacter__btn" @click="getUser">Смена персонажа</v-btn>
  </v-col>
</template>

<script>
import fetchData from '@/api/fetchData';
import moment from 'moment';
import '@/img/no-pictures.svg';


export default {
  data: () => ({
    character: {
      avatarSrc: '',
      name: '-',
      age: '-',
      employment: '-',
    },
    isLoading: false,
    avatarLoaded: false,
  }),
  methods: {
    onImgLoaded() {
      this.avatarLoaded = true
    },
    getUser() {
      this.isLoading = true;
      this.avatarLoaded =  false;
      try {
        fetchData('users/random_user')
          .then((res) => {
            this.character.avatarSrc = res.avatar ? res.avatar : '/img/no-pictures.dd3ee781.svg';
            this.character.name = `${res.first_name} ${res.last_name}`;
            this.character.age = moment().diff(res.date_of_birth, 'years');
            this.character.employment = res.employment.title;
          })
          // eslint-disable-next-line no-return-assign
          .then(() => this.isLoading = false);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>

  @import '@/styles/mediaScreen.scss';

  .section {
    @include respond-to(958px) {
      padding: 0;
    }
  }

  .title {
    text-align: center;
    margin-bottom: 2vh;
    @include respond-to(958px) {
      position: absolute;
      z-index: 1;
      padding: 10px 20px;
    }
  }

  .page-bg {
    width: 100%;
    height: 100%;
  }

  .card {
    text-align: center;
    background: radial-gradient(circle at -16% -16%, rgb(227, 127, 177), rgb(106, 93, 187));
    @include respond-to(958px) {
      min-height: 50vh;
      display: flex;
      align-items: center;}
  }

  .randomCharacter {
    display: flex;
    flex-direction: column;
    @include respond-to(958px) {flex-direction: row}
    @include respond-to(510px) {flex-direction: column}

    align-items: center;
    height: 100%;

    @include respond-to(958px) {width: 100%;}

    padding: 15px;
    @include respond-to(958px) {padding: 25px 40px;}

    &__info {
      width: 100%;
      font-size: 20px;
      background-color: inherit;
      color: #d1d1d1;
      padding: 0 20px;
      @include respond-to(958px) {
        padding: 0 60px;
        text-align: start
      }

      @include respond-to(480px) {
        padding: 0;
      }

      margin-top: 15px;

      th {
        @include respond-to(958px) {
        text-align: start
      }
      }

      tr {
        color: #21001b;
      }
    }

    &__avatar {

      height: 280px;
      @include respond-to(630px) {height: 230px}

      @include respond-to(510px) {
        margin-top: 70px;
      }

      &_img {
        box-sizing: border-box;

        width: 280px;
        @include respond-to(630px) {width: 230px}
        @include respond-to(510px) {width: 100%}

        height: 280px;
        @include respond-to(630px) {height: 230px}
        @include respond-to(510px) {height: 100%}

        animation: avatar 30s infinite;
      }

      &_loader {
        margin-top: 50%;
        width: 280px;
        @include respond-to(630px) {width: 230px}
        @include respond-to(510px) {width: 230px}
      }
    }

    &__btn {
        bottom: -30px;
        @include respond-to(958px) {
          position: absolute;
          height: 60px;
          background-color: inherit;
          color: #000000;
          top: 0;
          right: 0%;
        }
        width: 200px;
        @include respond-to(480px) {
          width: 165px;
          height: 45px;
          font-size: 13px;
        }

        margin-left: calc(50% - 100px);
    }
  }

  @keyframes avatar {
    0%,
    100% {
      border-radius: 30% 70% 70% 30% / 30% 52% 48% 70%;
      box-shadow: 0 -2vmin 4vmin LightPink inset, 0 -4vmin 4vmin MediumPurple inset,
        0 -2vmin 7vmin purple inset;
    }

    10% {
      border-radius: 90% 50% 20% 80% / 25% 80% 20% 75%;
    }

    20% {
      border-radius: 67% 33% 47% 53% / 37% 20% 80% 63%;
    }

    30% {
      border-radius: 39% 61% 47% 53% / 37% 40% 60% 63%;
      box-shadow: 0 -4vmin 8vmin hotpink inset, -1vmin -2vmin 6vmin LightPink inset,
        -1vmin -2vmin 4vmin MediumPurple inset, 1vmin 4vmin 8vmin purple inset;
    }

    40% {
      border-radius: 39% 61% 82% 18% / 74% 40% 60% 26%;
    }

    50% {
      border-radius: 100%;
      box-shadow: 0 4vmin 16vmin hotpink inset, 0 2vmin 5vmin LightPink inset, 0 4vmin 4vmin MediumPurple inset,
        0 6vmin 8vmin purple inset;
    }

    60% {
      border-radius: 50% 50% 53% 47% / 72% 69% 31% 28%;
    }

    70% {
      border-radius: 50% 50% 53% 47% / 26% 22% 78% 74%;
      box-shadow: 1vmin 1vmin 8vmin LightPink inset,
        2vmin -1vmin 4vmin MediumPurple inset, -1vmin -1vmin 16vmin purple inset;
    }

    80% {
      border-radius: 50% 50% 53% 47% / 26% 69% 31% 74%;
    }

    90% {
      border-radius: 20% 80% 20% 80% / 20% 80% 20% 80%;
    }
  }

</style>
