<template>
  <div id="app">
    <CurrencyConverter />
  </div>
</template>

<script>
import CurrencyConverter from "./components/CurrencyConverter.vue";

export default {
  components: {
    CurrencyConverter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
