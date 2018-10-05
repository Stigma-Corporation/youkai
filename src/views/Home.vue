<template>
  <keep-alive>
    <div class="home has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns">
            <!--<div class="column is-4">-->
              <!--&lt;!&ndash;<figure class="image is-5by3">&ndash;&gt;-->
                <!--&lt;!&ndash;<img src="../assets/logo2.png">&ndash;&gt;-->
              <!--&lt;!&ndash;</figure>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="column is-8">-->
              <!--<div class="title is-size-1 has-text-centered">-->
                <!--Youkai-->
              <!--</div>-->
              <!--<div class="title is-size-1 has-text-left">-->
                <!--Test-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </section>
    </div>
  </keep-alive>
</template>

<script>
// @ is an alias to /src
// import Loader from "@/components/Loader.vue"


export default {
  name: "home",
  // components: {NavbarLogo,}
}
</script>

<style lang="scss">
  .has-bg-img { background: url('../assets/background6.png')center center; background-size:cover; }
</style>