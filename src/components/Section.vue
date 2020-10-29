<template>
  <div id="section">
    <YearDirectory v-if="todo == 'year'" />
    <TagDirectory v-else-if="todo == 'tag'" />
  </div>
</template>

<script>
import YearDirectory from "./YearDirectory.vue";
import TagDirectory from "./TagDirectory.vue";

export default {
  name: "Section",
  data() {
    return {
      todo: "year",
    };
  },
  components: {
    YearDirectory,
    TagDirectory,
  },
  created() {
    if (this.$route.name === "home") {
      this.todo = "year";
    } else if (this.$route.name === "tag") {
      this.todo = "tag";
    }
  },
  
  watch: {
    $route(to) {
      if (to.name === "home") {
        this.todo = "year";
      } else if (to.name === "tag") {
        this.todo = "tag";
      }
    },
  },
};
</script>

<style scoped>
@media only screen and (min-width: 960px) {
  #section {
    border-radius: 5px;
  }
}
#section {
  background-color: #fff;
  padding: 14px 30px 24px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
</style>