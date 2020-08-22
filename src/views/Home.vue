<template>
  <el-calendar v-model="value" class="calendar">
</el-calendar>
</template>

<script>
export default {
    data() {
      return {
        value: new Date()
      }
    }
}
</script>
<style lang="scss">
.el-calendar{
  background: rgba(250, 250, 250, 0.8)!important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .el-calendar-table{
    th{
      font-weight: bolder;
    }
  }
  .el-calendar-day{
    text-align: center;
    line-height: 69px;
    font-size: 24px;
    font-weight: bolder;
  }
}
</style>