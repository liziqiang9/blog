<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.load_config();
  },
  methods: {
    /**
     * 加载配置文件， 并保存到store中
     */
    load_config() {
      let _this = this;
      let url = "/test";
      if (process.env.NODE_ENV == "production") {
        url = "/data";
      }
      this.axios
        .get(url + "/config.json")
        .then((response) => {
          if (response.status == 200) {
            let { tags, years, dataInfo } = _this.disposeData(response.data);
            _this.$store.commit("set_tags", tags);
            _this.$store.commit("set_years", years);
            _this.$store.commit("set_dataInfo", dataInfo);
          } else {
            console.log("配置加载失败，状态码:" + response.status);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * 处理配置文件的数据
     */
    disposeData(data) {
      let tags = {},
        years = {},
        dataInfo = { ...data };
      for (let year in data) {
        for (let article of data[year]) {
          if (years[year]) {
            years[year] += 1;
          } else {
            years[year] = 1;
          }
          for (let tag of article.tags) {
            if (tags[tag]) {
              tags[tag] += 1;
            } else {
              tags[tag] = 1;
            }
            if (dataInfo["$" + tag]) {
              dataInfo["$" + tag].push(article);
            } else {
              dataInfo["$" + tag] = [article];
            }
          }
        }
      }
      return { tags, years, dataInfo };
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
