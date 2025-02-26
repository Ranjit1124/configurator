<template>
  <v-container :fluid="true" class="px-0 py-0">
    <v-expansion-panels

      variant="popout"

      multiple
      v-model="panel"
      rounded="0"
      color="#084b8e"
      flat
    >

      <v-expansion-panel  class="pb-1">
        <v-expansion-panel-title>OVERALL DIMENSIONS</v-expansion-panel-title>
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

            <v-col md="3" sm="12">
              <v-btn
                color="#344e9b"

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
      <v-expansion-panel>
        <v-expansion-panel-title> ADD RECTANGLE</v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-row no-gutters class="bg-white d-flex align-center">
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Width</label>
              <v-text-field
                placeholder="in mm"
                variant="outlined"
                density="compact"
                rounded="0"
                type="number"
                v-model="rectangleWidth"
              ></v-text-field>
            </v-col>
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Height</label>
              <v-text-field
                type="number"
                placeholder="in mm"
                variant="outlined"
                density="compact"
                rounded="0"
                v-model="rectangleHeight"
              ></v-text-field>
            </v-col>
            <v-col md="3" sm="12">
              <v-btn

                v-if="isRectangle"
                color="blue"

                variant="outlined"
                flat
                @click="rectangleDimension()"
                block
              >
                ADD
              </v-btn>
              <v-btn v-else color="red" variant="outlined" flat block>
                Delete
              </v-btn>
            </v-col>
          </v-row>
          <span class="text-subtitle-2 text-red d-block">{{
            rectangleErrMsg
          }}</span>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title> ADD RECTANGLE</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters class="bg-white d-flex align-center">
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Width</label>
              <v-text-field
                placeholder="in mm"
                variant="outlined"
                density="compact"
                rounded="0"
                type="number"
                v-model="rectangleWidth"
              ></v-text-field>
            </v-col>
            <v-col md="3" sm="12" class="mr-2">
              <label for="">Height</label>
              <v-text-field
                type="number"
                placeholder="in mm"
                variant="outlined"
                density="compact"
                rounded="0"
                v-model="rectangleHeight"
              ></v-text-field>
            </v-col>
            <v-col md="3" sm="12">
              <v-btn
                color="blue"
                variant="outlined"
                flat
                @click="rectangleDimension()"
                block
              >
                ADD
              </v-btn>
           
            </v-col>
          </v-row>
          <span class="text-subtitle-2 text-red d-block">{{
            rectangleErrMsg
          }}</span>
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
      panel: [0, 1],
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

      rectangleHeight: null,
      rectangleWidth: null,
      errMsg: null,
      rectangleErrMsg: null,

      isRectangle: true,
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
    rectangleDimension() {
      const setError = (message) => {
        this.rectangleErrMsg = message;
        setTimeout(() => {
          this.rectangleErrMsg = "";
          this.rectangleHeight = "";
          this.rectangleWidth = "";
        }, 2000);
      };

      if (!this.height?.toString().trim() || !this.width?.toString().trim()) {
        setError("FIRST ADD OVERALL DIMENSION");
        return;
      }

      if (
        !this.rectangleHeight?.toString().trim() ||
        !this.rectangleWidth?.toString().trim()
      ) {
        setError("Enter Both Values");
        return;
      }

      if (
        Number(this.rectangleHeight) >= Number(this.height) ||
        Number(this.rectangleWidth) >= Number(this.width)
      ) {
        setError("Height and Width must be less than the overall dimension");
      } else {
        this.$store.commit("rectangeleValues", {
          width: this.rectangleWidth / 100,
          height: this.rectangleHeight / 100,
        });
        this.isRectangle = false;
      }


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
