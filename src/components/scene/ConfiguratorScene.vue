<template>
  <div
    ref="threeContainer"
    style="height: 100vh"
    class="three-container"
  ></div>
  <template>
</template>

</template>
<script>
import Configurator from '../../three/three'
export default{

data(){
  return{
      threeContainer: null,
threeScene: null,

  }
},
mounted() {
this.threeContainer = this.$refs.threeContainer;
this.threeScene = new Configurator(this.threeContainer);
},
}
</script>