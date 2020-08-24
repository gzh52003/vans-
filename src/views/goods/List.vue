<template>
  <div>
    <el-container>
      <el-header>
        <search></search>

        <el-dropdown style="margin-left:48px;">
          <el-button type="primary" size="small">
            商品分类
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="classify('shirt')">t恤</el-dropdown-item>
            <el-dropdown-item @click.native="classify('shoe')">鞋子</el-dropdown-item>
            <el-dropdown-item @click.native="classify('')">全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" size="small" style="margin-left:20px;" @click="sort">{{sortText}}</el-button>
      </el-header>
      <el-main>
        <el-table :data="goodsData" border style="width: 100%;" :row-class-name="tableRowClassName">
          <el-table-column type="selection" label="#" width="40"></el-table-column>
          <el-table-column label="图片" width="110">
            <template v-slot:default="scope">
              <img :src="scope.row.imgurl" alt class="img" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="300"></el-table-column>
          <el-table-column label="商品价格" width="100">
            <template v-slot:default="scope">
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
              ></el-button>
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
      <el-footer style="margin:0 auto;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"
          @current-change="changepage"
          :current-page.sync = "currentPage"
        ></el-pagination>
      </el-footer>
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
      type: "",
      pageNum: 1,
      sortText: "价格降序",
      sortNum: -1,
      currentPage: 1,
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
    gotoEdit(id) {
      // 跳转路由传参
      this.$router.push({
        name: "goodsEdit",
        params: { id },
      });
    },
    async changepage(idx) {
      const { data } = await this.$request("/goods/find", {
        params: {
          page: idx,
          size: 6,
          sort : "price," + this.sortNum,
          type: this.type,
        },
      });
      this.goodsData = data.data;
    },
    async classify(type) {
      const { data } = await this.$request("/goods/find", {
        params: {
          size: 6,
          type,
        },
      });
      this.currentPage = 1
      this.type = type;
      this.pageNum = (data.num / 6) * 10;
      this.goodsData = data.data;
    },
    async sort() {
      this.sortNum = this.sortNum === 1 ? -1 : 1;
      this.sortText = this.sortNum === 1 ? '价格降序' : '价格升序';
      const { data } = await this.$request("/goods/find",{
        params : {
          size: 6,
          sort : "price," + this.sortNum,
          type: this.type,
        }
      });
         this.currentPage = 1
      this.goodsData = data.data
    },
  },
  async created() {
    const { data } = await this.$request("/goods/find", {
      params: {
        size: 6,
      },
    });
    this.pageNum = (data.num / 6) * 10;
    this.goodsData = data.data;
  },
};
</script>
<style lang="scss">
.el-table,
.el-table__row {
  background: rgba($color: #ffffff, $alpha: 0.3) !important;
}
.img {
  width: 100%;
  height: 100%;
}
.price::before {
  content: "$ ";
}
</style>