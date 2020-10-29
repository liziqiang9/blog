<template>
  <ul class="tag" v-for="(article, key) in data" :key="key" :id="'year-' + key">
    <li>
      <h2 class="title">{{ key }}</h2>
    </li>
    <ul>
      <li class="article" v-for="value of article" :key="value.url">
        <span>{{ value.time }}</span>
        <router-link :to="value.url">{{ value.name }}</router-link>
      </li>
    </ul>
  </ul>
</template>
<script>
export default {
  name: "TagDirectory",
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      let tags = this.$store.getters.tags;
      let dataInfo = this.$store.getters.dataInfo;
      console.log(tags, dataInfo)
      for (let key in tags) {
        this.data[key] = dataInfo['$' + key];
      }
    }
  },
  watch: {
    '$store.state.dataInfo'() {
      this.updateData();
    }
  }
};
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
  .tag {
    padding: 0;
    margin: 4px 0;
  }
  .title {
    margin: 10px 0;
    color: #333;
  }
  .tag span {
    margin-right: 10px;
    font-weight: 200;
  }
  .tag a {
    color: #333;
  }
  .tag a:hover {
    color: #409EFF;
    text-decoration: underline;
  }
</style>