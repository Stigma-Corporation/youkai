<template>
  <div class="columns">
    <div class="column has-text-left">
      {{newDate}}
    </div>
    <div class="column has-text-right">
      {{newTime}}
    </div>
  </div>
</template>

<script>
export default {
  name: "DatetimeCreated",
  props: {
    dateNumber: {
      type: Number,
    }
  },
  computed: {
    newDate: function () {
      let datetime = new Date(this.dateNumber);
      return "Дата: " + datetime.toLocaleDateString('ru-RU')
    },
    newTime: function () {
      let datetime = new Date(this.dateNumber);
      return "Время: " + datetime.toLocaleTimeString('ru-RU')
    }
  }
}
</script>

<style scoped>

</style>