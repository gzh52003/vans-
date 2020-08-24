<template>
  <div>
    <el-container>
      <el-header>
        <search></search>
      </el-header>
      <el-main>
        <el-table 
        :data="goodsData" 
        border 
        style="width: 100%;" 
        :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" label="#" width="40"></el-table-column>
          <el-table-column  label="图片" width="110">
            <template v-slot:default="scope">
              <img :src="scope.row.imgurl" alt="" class="img">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="300"></el-table-column>
          <el-table-column  label="商品价格" width="100"  >
            <template v-slot:default="scope" >
              <span v-text="scope.row.price" class="price"></span>
            </template>
          </el-table-column>
          <el-table-column prop="_id" label="商品编号"></el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <el-button 
              type="primary" 
              icon="el-icon-edit" 
              size="small" 
              plain
              @click="gotoEdit(scope.row._id)"
              >
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                plain
                @click="deleteGoods(scope.row._id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import search from "../common/search.vue";
export default {
  data() {
    return {
      goodsData: [],
      currentId: "",
    };
  },
  components: {
    search,
  },
  methods: {
    async deleteGoods(id) {
      this.$confirm("你确定要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/goods/delete/" + id);
        if (data.code === 1) {
          this.goodsData = this.goodsData.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    gotoEdit(id){
      // 跳转路由传参
      this.$router.push({
        name:'goodsEdit',
        params:{id}
      })
    }
  },
  async created() {
    const { data } = await this.$request("/goods/find", {
      params: {
        size: 8,
      },
    });
    console.log(data.data)
    this.goodsData = data.data;
  },
};
</script>
<style lang="scss">
.el-table,
.el-table__row {
  background: rgba($color: #ffffff, $alpha: 0.3) !important;
}
.img{
  width: 100%;
  height: 100%;
}
.price::before{
    content: '$ ';
}
</style>