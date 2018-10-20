<template>
  <keep-alive>
    <img v-bind:src="imageSrc" alt="Невозможно загрузить картинку">
  </keep-alive>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "ImageNews",
  props: {
    imageId: String
  },
  // data: function() {
  //   return {
  //     url: "http://192.168.1.100:8000/news/" + this.imageId
  //   }
  // },
  // methods: {
  //   GetImageById: function () {
  //     let mainThis = this;
  //     axios({
  //       method: "get",
  //       url: mainThis.url
  //     }).then(function (response) {
  //       mainThis.title = "";
  //       mainThis.description = "";
  //       mainThis.day = "";
  //       mainThis.time = "";
  //       store.dispatch("GetAllRaids");
  //     })
  //   }
  // },
  computed: {
    imageSrc: function () {
      return process.env.VUE_APP_API_ROOT + "news/" + this.imageId
    }
  }
}
</script>

<style scoped>

</style>