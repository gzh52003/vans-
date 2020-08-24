<template>
  <section style="display: inline-block;">
    <div class="search" style="margin-top: 15px;" >
      <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </section>
</template>
<script>
export default {
    data(){
      return {
        searchValue : ''
      }
    }
};
</script>
<style lang="scss">
.search{
    width: 500px;
    height: 100px;
}
</style>