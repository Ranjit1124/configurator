<template>
  <v-container :fluid="true" class="my-6">
    <P class="letter-spacing-medium">TEXTURE</P>
    <v-tabs color="orange" align-with-title class="mt-2" v-model="tab">
      <v-tab v-for="(item, i) in items" :key="item" :value="i">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="0"> 

        <v-slide-group>
               <v-card
               v-for="(glass,i) in DesignMotif"
               :key="i"
               >
                 {{ glass }}
               </v-card>
        </v-slide-group>
      </v-tabs-window-item>
      <v-tabs-window-item :value="1"> Two </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script>
export default {
  name: "texturePage",
  data() {
    return {
      tab: 0,
      items: ["Design Motif", "Ornamental Glass"],
      DesignMotif: [
        {
          name: "Ms 5177/s",
          path: "",
        },
        {
          name: "Ms 5177/s",
          path: "",
        },
        {
          name: "Ms 5177/s",
          path: "",
        },
        {
          name: "Ms 5177/s",
          path: "",
        },
        {
          name: "Ms 5177/s",
          path: "",
        },
      ],
    };
  },
};
</script>
