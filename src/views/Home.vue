<template>
  <div id="main">
    <Section />
    <div class="interval"></div>
    <Footer />
  </div>
</template>

<script>
import Section from "../components/Section.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Section,
    Footer,
  },
};
</script>

<style scoped>
@media only screen and (min-width: 375px) {
  #main {
    width: 100%;
    margin: 10px 0;
  }
  .interval {
    height: 10px;
  }
}
@media only screen and (min-width: 960px) {
  #main {
    width: 900px;
    margin: 30px auto;
  }
  .interval {
    height: 20px;
  }
}
</style>