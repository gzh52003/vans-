<template>
  <div>
    <el-container>
      <el-header>
        <h1 style="display:inline-block;margin:20px;" >商品编辑</h1>
        <el-button type="primary" style="display:inline-block" @click="backList">返回用户列表</el-button>
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名" prop="name">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input type="text" v-model="ruleForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" >
            <el-input v-model="ruleForm.imgurl" ></el-input>
                <img :src="ruleForm.imgurl" alt  style="width:200px; margin:20px;">
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="submitForm">修改</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        price: "",
        imgurl: "",
      },
      rules: {
        name: [{ required: true, message: "商品名必填", trigger: "burl" }],
        price: [{ required: true, message: "价格必填", trigger: "burl" }],
        imgurl: [{ required: true, message: "图片路径必填", trigger: "burl" }],
      },
    };
  },

  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { goodsid, ruleForm } = this;
          const { data } = await this.$request.put("/goods/update/" + goodsid, {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          return false;
        }
      });
    },
    backList(){
      this.$router.replace({
        name:"goodslist"
      })
    }
  },
  async created() {
    const { id } = this.$route.params; //  $route.query || $route.params 路由获取传过来的参数
    const { data } = await this.$request.get("/goods/find/" + id); // 通过id发送ajax
    this.goodsid = id;
    Object.assign(this.ruleForm, data.data); // 合并
  },
};
</script>
<style lang="scss">

</style>