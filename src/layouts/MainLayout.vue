<template>
  <q-layout view="lHh Lpr lFf" class="column">
    <Header v-if="!isMain" />
    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "src/components/Header.vue";
export default {
  name: "MainLayout",
  components: {
    Header,
  },
  data() {
    return {};
  },
  computed: {
    isMain() {
      return (
        this.$route.name === "LandingPage" || this.$route.path.includes("auth")
      );
    },
  },
};
</script>
