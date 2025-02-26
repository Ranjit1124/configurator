<template>
    <v-container :fluid="true" class="overflow  pa-0">
      <Dimension />

    </v-container>
     <!-- <v-container :fluid="true" class="overflow  px-0">
        <v-tabs v-model="tab" color="#FF9800"  next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline">
        <v-tab v-for="(item, index) in items" :key="index" :value="index">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
  
      <v-window v-model="tab">
        <v-window-item v-for="(item, index) in items" :key="index" :value="index">
          <v-card flat>
            <Dimension />
            <Texture />
          </v-card>
        </v-window-item>
      </v-window>
    </v-container> -->
  </template>
  
  <script>
 import Dimension from "./sidebarItems/Dimension";
// import Texture from "./sidebarItems/Texture.vue";

export default {
  name: "sideBar",
  components: {
    Dimension,




  //  Texture
      },
    data() {
      return {
    //     tab: 0, 
    //     items: [
    //       { title: "Wall", icon: "mdi-wall" },
    //       { title: "Frame", icon: "mdi-vector-square" },
    //       { title: "Door", icon: "mdi-door" },
    //       { title: "Glass", icon: "mdi-window-closed-variant" },
    //     ],
    //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    //   };
    // },
      }
    }
  };
  </script>
    
<style scoped>
 .overflow{
    height: 90vh;
    overflow-y:scroll;
   

 }
</style>
   

