<template>
  <div id="Menu">
    <span @click="backPreviousPage()" style="cursor:pointer" title="返回上一页"><svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="475"><path d="M825.406333 84.940875L368.295437 542.051772l397.12734 397.12734-84.820889 84.820888-481.958227-481.948228 541.941784-541.941784 84.820888 84.830887z" fill="#606060" p-id="476"></path></svg></span>
  </div>
</template>

<script>
export default {
  name: "Menu",
  methods: {
      backPreviousPage() {
          console.log("232332")
          this.$router.go(-1);
      }
  }
};
</script>

<style scoped>
#Menu {
  background-color: #fff;
  padding: 14px 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
</style>