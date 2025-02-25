<template>
  <v-container :fluid="true" class="py-5 elevation-2" style="z-index: 1;">
    <v-row no-gutters>
      <v-col >
        <p   class="title">CONFIGURAT<span class="text-orange">O</span>R</p>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "footerPage",
};
</script>

<style scoped>
.title {
  color: #767676;
  font-weight: 600;
  font-size: 1.18em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
