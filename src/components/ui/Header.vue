<template>
  <v-container :fluid="true" class="py-5 elevation-2" style="z-index: 1;">
    <v-row no-gutters>
      <v-col>
        <p class="title">
          CONFIGURAT<v-icon size="30px" color="#125292" class="rotate">mdi-cog</v-icon>R
        </p>
      </v-col>
      <v-col></v-col>
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
  font-size: 1.2em;
  font-stretch: condensed;
  font-variant: small-caps;
  font-family: cursive;
}

.rotate {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
