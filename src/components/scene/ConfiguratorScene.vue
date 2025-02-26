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
import { mapState } from "vuex";

export default {
  data() {
    return {
      threeContainer: null,
      threeScene: null,
      wallValues: null,
      rectangleValues:null,

    };
  },
  computed:{
      ...mapState(['wallValue','rectangleValue'])
  },
  watch:{
    wallValue(newValue) {
      this.wallValues = {
        height: newValue.height,
        width: newValue.width,
      };
      this.threeScene.wall(this.wallValues);
    },
    rectangleValue(newrectangleValue) {
      this.rectangleValues = {
        height: newrectangleValue.height,
        width: newrectangleValue.width,
      };
      this.threeScene.Door(this.rectangleValues);
    },
  },
  mounted() {
    this.threeContainer = this.$refs.threeContainer;
    this.threeScene = new Configurator(this.threeContainer);
  },
  
};
</script>

