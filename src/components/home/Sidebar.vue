<template>
  <v-container :fluid="true" class="overflow  px-0">
    <Dimension />
    <Texture />
  </v-container>
</template>

<script>
import Dimension from "./sidebarItems/Dimension.vue";
import Texture from "./sidebarItems/Texture.vue";
export default {
  name: "sideBar",
  components: {
    Dimension,
    Texture
  },
};
</script>
<style scoped>
 .overflow{
    height: 82vh;
    overflow-y:scroll;
   

 }
</style>
