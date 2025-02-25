<template>

  <v-container :fluid="true">
    <p class="letter-spacing-medium mb-4">DIMENSIONS</p>
    <v-row no-gutters class="my-3 bg-white">
      <v-col md="4" sm="12" class="mr-2">
        <label for="">Width</label>
        <v-text-field
          placeholder="e.g.2500mm"
          variant="outlined"
          density="compact"
          rounded="0"
          v-model="width"
            @input="dynamicDimension()"
        ></v-text-field>
      </v-col>
      <v-col md="4" sm="12">
        <label for="">Height</label>
        <v-text-field
          placeholder="e.g.2500mm"
          variant="outlined"
          density="compact"
          rounded="0"
           v-model="height"
            @input="dynamicDimension()"
        ></v-text-field>
      </v-col>
      <span class="subtitle letter-spacing-small text-subtitle-2"
        >If you don't have the dimensions yet, you can skip this step.</span
      >
    </v-row>
    <p class="mt-10 mb-6 letter-spacing-medium">COLORS</p>
    <v-row class="pt-2">
      <v-col v-for="(col, i) in colors" :key="i" md="2" sm="4">
        <v-btn
          rounded="0"
          :style="{
            backgroundColor: col.code,
            height: '40px',
          }"
        >
          <v-tooltip activator="parent" location="top">{{ col.name }} {{ col.code }}</v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "dimensionPage",
    data() {
      return {
        colors: [
          { name: "Traffic white glossy", code: "#EEEEF2" },
          { name: "Grey Classic", code: "#383D3E" },
          { name: "Anthracite grey matt ", code: "#262E38" },
          { name: "Feinstruktur Metallic Eisenglimmer", code: "#373940" },
          { name: "Feinstruktur Metallic", code: "#878581" },
          { name: "Jet black matt", code: "#03050A" },
          { name: "GOLDEN OAK", code: "#895C2E" },
          { name: "Basalt grey matt", code: "#4A5459" },
          { name: "Darkbrown Fine texture matt", code: "#373332" },
          { name: "Grey Sprenkel fine structure", code: "#56595C" },
        ],
        width:null,
        height:null
      };
    },
    methods:{
dynamicDimension(){
  this.$store.commit('SET_WIDTH',this.width)
  this.$store.commit('SET_HEIGHT',this.height)

}
    }
  };
  </script>
<style scoped>
.subtitle {
  font-size: 14px;
}
label {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 600;
  color: #575757;
}
.letter-spacing-medium {
  letter-spacing: 2px;
}
.letter-spacing-small {
  letter-spacing: 1px;
}
</style>

