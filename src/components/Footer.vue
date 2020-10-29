<template>
  <div id="footer">
    <div id="tags">
      <p class="title">标签</p>
      <router-link
        v-for="(count, name, index) in tags"
        :to="root_url + '/tag?name=' + name"
        :key="index"
        class="tags-tag"
        >{{ name }}@{{ count }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      tags: {},
      root_url: process.env.VUE_APP_ROOT_URL,
    };
  },
  created() {
    this.tags = this.$store.getters.tags;
  },
  watch: {
    '$store.state.dataInfo'() {
      this.tags = this.$store.getters.tags;
    }
  }
};
</script>

<style scoped>
@media only screen and (min-width: 960px) {
  #footer {
    border-radius: 5px;
  }
}
#footer {
  background-color: #fff;
  padding: 14px 30px 25px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.title {
    margin: 10px 0 8px;
}
a {
    margin-right: 8px;
    color: #888;
    text-decoration: none;
}
a:hover {
    color: #409EFF;
}
</style>