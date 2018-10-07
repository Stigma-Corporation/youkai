<template>
  <keep-alive>
    <OneRaid v-bind:raid-id="id"></OneRaid>
  </keep-alive>
</template>

<script>
import OneRaid from "@/components/OneRaid.vue"

export default {
  name: "Raids",
  components: {
    OneRaid,
  },
  props: [
    'id'
  ],
}
</script>

<style lang="scss" scoped>
.has-bg-img { background: url('../assets/background5.jpg')center center; background-size:cover; }
</style>