<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./pages/index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>

<style>
.letter-spacing-small {
  letter-spacing: 1px;
}
.letter-spacing-medium {
  letter-spacing: 2px;
}
#app{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}
</style>
