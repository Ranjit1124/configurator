<template>
  <v-container :fluid="true" class="px-0 py-0">
    <div
      ref="threeContainer"
      style="height:100%"
      class="three-container"
    ></div>
  </v-container>
</template>
<script>
import Configurator from "../../three/three";
export default {
  data() {
    return {
      threeContainer: null,
      threeScene: null,
    };
  },
  mounted() {
    this.threeContainer = this.$refs.threeContainer;
    this.threeScene = new Configurator(this.threeContainer);
  },
};
</script>
