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

    };
  },
  computed:{
      ...mapState(['width','height'])
  },
  watch:{
    width(newValue) {
      this.wallValues = {
        height: this.height,
        width: newValue,
      };
      this.threeScene.wall(this.wallValues);
    },
    height(newValue) {
      this.wallValues = {
        height: newValue,
        width: this.width,
      };
      this.threeScene.wall(this.wallValues);
    },
  },
  mounted() {
    this.threeContainer = this.$refs.threeContainer;
    this.threeScene = new Configurator(this.threeContainer);
  },
  
};
</script>

