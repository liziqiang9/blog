<template>
  <div id="article" class="markdown-body"></div>
</template>
<script>
export default {
  name: "Article",
  data() {
    return {
      md: '',
      art: null,
    };
  },
  created() {
    let _this = this;
    let path = this.$route.path.split('/');
    let url = process.env.VUE_APP_DATA_URL;
    if(path.length == 4) {
      url += '/public/' + path[3];
    } else {
      for (let i = 3; i < path.length; i++) {
        url += '/' + path[i];
      }
    }
    url += '.md';
    this.axios
      .get(url)
      .then((response) => {
        if(response.status == 200){
          _this.md = response.data;
        } else {
          _this.md = '<p style="color: red;align:center">状态码:'+ response.status +'</p>'
        }
      
        if (_this.art)
          _this.art.editor.setMd(_this.md);
      })
      .catch( (error) => {
        console.error(error);
      });
  },
  mounted() {
    const container = document.querySelector("#article");
    var ArtText = window['ArtText'];
    this.art = new ArtText(container, { markdown: this.md });
    this.art.init();
    this.art.changeRunModel('read-noStyle');
  },
};
</script>

<style scoped>
@media only screen and (min-width: 960px) {
  #article {
    border-radius: 5px;
  }
}
#article {
  background-color: #fff;
  padding: 14px 30px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
</style>