<template>
  <ul class="tag" v-for="key in dictKeySort(data)" :key="key" :id="'year-' + key">
    <li>
      <h2 class="title">{{ key }}</h2>
    </li>
    <ul>
      <li class="article" v-for="article of data[key]" :key="article.url">
        <span>{{ article.time.substring(5) }}</span>
        <router-link :to="root_url + '/article' + article.url">{{ article.name }}</router-link>
      </li>
    </ul>
  </ul>
</template>
<script>
export default {
  name: "YearDirectory",
  data() {
    return {
      data: {},
      root_url: process.env.VUE_APP_ROOT_URL,
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    dictKeySort(dict) {
      return Object.keys(dict).sort().reverse();
    },
    updateData() {
      let years = this.$store.getters.years;
      let dataInfo = this.$store.getters.dataInfo;
      for (let key in years) {
        this.data[key] = dataInfo[key];
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
  color: #444;
}
.tag a:hover {
  color: #409eff;
  text-decoration: underline;
}
</style>