<template>
  <v-container :fluid="true" class="px-0 py-0">
    <v-expansion-panels
    v-model="panel" 
    rounded="0"
    color="#001c70"
    flat>
      <v-expansion-panel>
        <v-expansion-panel-title >ADD DIMENSIONS</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters class="bg-white d-flex align-center">
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Width</label>
              <v-text-field
                placeholder="250mm"
                variant="outlined"
                density="compact"
                rounded="0"
                v-model="overallWidth"
                type="number"

              ></v-text-field>
            </v-col>
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Height</label>
              <v-text-field
                placeholder="250mm"
                variant="outlined"
                density="compact"
                rounded="0"
                v-model="overallHeight"
                type="number"

              ></v-text-field>
            </v-col>
            <v-col md="2" sm="6">
                  <v-btn

                color="blue"
                variant="outlined"
                flat
                @click="overallDimension"
                v-if="isOverall"                

              >
                ADD
              </v-btn>
               
                  <v-btn

                color="red"
                variant="outlined"
                flat
                @click="deleteDimension"
                v-else
              >
                Delete
              </v-btn>
              
              
            </v-col>
          </v-row>
          <span class="text-subtitle-2 text-red d-block">{{ errMsg }}</span>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
   
  </v-container>
</template>

<script>
export default {
  name: "dimensionPage",
  props: {
    tagName: String,
  },
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
      panel: [0],
      // wallRules: {
      //   minHeight: 1,
      //   maxHeight: 15,
      //   minWidth: 1,
      //   maxWidth: 15,
      // },
      // frameRules: {
      //   minHeight: 0,
      //   maxHeight: 10,
      //   minWidth: 1,
      //   maxWidth: 4,
      // },
      // doorRules: {
      //   minHeight: 0,
      //   maxHeight: 20,
      //   minWidth: 10,
      //   maxWidth: 15,
      // },
      // windowRules: {
      //   minHeight: 0,
      //   maxHeight: 20,
      //   minWidth: 10,
      //   maxWidth: 15,
      // },
      overallWidth: null,
      overallHeight: null,
      errMsg: null,
      isOverall:true,
    };
  },
  methods: {

    overallDimension() {
      this.errMsg = "";

        if (!this.overallHeight?.toString().trim() || !this.overallWidth?.toString().trim()) {
        this.errMsg = "Enter Both Values";
        return;
      }

      
     
      // const allRules = {
      //   wall: this.wallRules,
      //   frame: this.frameRules,
      //   door: this.doorRules,
      //   window: this.windowRules,
      // };

      // const rules = allRules[this.tagName.toLowerCase()];

      // if (this.width) {
      //   if (this.width < rules.minWidth || this.width > rules.maxWidth) {
      //     this.errMsg = Width must be between ${rules.minWidth} - ${rules.maxWidth};
      //     return;
      //   }
      // }

      // if (this.height) {
      //   if (this.height < rules.minHeight || this.height > rules.maxHeight) {
      //     this.errMsg = Height must be between ${rules.minHeight} - ${rules.maxHeight};
      //     return;
      //   }
      // }
const values = {width:this.overallWidth/100,height:this.overallHeight/100}
      this.$store.commit("wallValues", values);
      this.isOverall=false
      // this.$store.commit("SET_HEIGHT", this.height);
    },
    deleteDimension(){
      console.log('delete');
      const values = {width:0,height:0}
      this.$store.commit("wallValues", values);
      this.overallWidth=''
      this.overallHeight=''
      this.isOverall=true

    }
  },
};
</script>
<style>
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