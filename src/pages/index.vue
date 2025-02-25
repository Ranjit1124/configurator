<template>
  <v-app>
    <v-container :fluid="true" class="px-0 py-0 d-flex flex-column height">
      <Header />
      <v-container class="flex-grow-1 px-0 py-0" :fluid="true">
        <v-row no-gutters style="height: 100%">
          <v-col cols="8">
            <Configurator style="height: 100%" />
          </v-col>
          <v-col cols="4" class="d-flex flex-column">
            <Sidebar />
            <v-spacer />
            <Footer />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>
<script>
import Configurator from "../components/scene/ConfiguratorScene";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Sidebar from "@/components/home/Sidebar.vue";
export default {
  name: "indexPage",
  components: {
    Header,
    Footer,
    Sidebar,
    Configurator,
  },
};
</script>
<style>
.height {
  min-height: 100vh;
}
</style>
