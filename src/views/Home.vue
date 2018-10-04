<template>
  <div class="home">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-4">
          <figure class="image is-5by3">
            <img src="../assets/logo2.png">
          </figure>
        </div>
        <div class="column is-8">
          <div class="title is-size-1 has-text-centered">
            Youkai
          </div>
          <div class="title is-size-1 has-text-left">
            Test
          </div>
        </div>
      </div>
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader.vue"
import NavbarLogo from "@/components/NavbarLogo.vue"

export default {
  name: "home",
  components: {
    NavbarLogo,
    Loader
  }
}
</script>
