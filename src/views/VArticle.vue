<template>
  <div id="main">
    <Menu />
    <div class="interval"></div>
    <Article />
    <div class="interval"></div>
    <Footer />
  </div>
</template>

<script>
import Article from "../components/Article.vue";
import Footer from "../components/Footer.vue";
import Menu from "../components/Menu.vue";

export default {
  name: "VArticle",
  components: {
    Article,
    Footer,
    Menu,
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