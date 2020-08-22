<template>
  <div>
    <el-container>
      <el-header>
        <h1>商品添加</h1>
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
          <el-form-item label="商品名称" prop="name">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="littername">
            <el-input type="text" v-model="ruleForm.littername" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input type="text" v-model="ruleForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="imgurl">
            <el-input v-model="ruleForm.imgurl"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加商品</el-button>
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
        littername: "",
        price: "",
        imgurl: "",
      },
      rules: {
        name: [{ required: true, message: "商品名必填", trigger: "change" }],
        price: [{ required: true, message: "商品名必填", trigger: "change" }],
        imgurl: [{ required: true, message: "商品名必填", trigger: "change" }],
      },
    };
  },
  methods:{
      submitForm(){
          // validate  被校验的表单项 prop 值，校验是否通过
          this.$refs.ruleForm.validate(async (valid) =>{
              if(valid) {
            
                  const {data} = await this.$request.post("/goods/insert/",{
                      ...this.ruleForm
                  });
                  if(data.code === 1){
                      this.$message({
                          type: "success",
                          message: "添加成功"
                      })
                  }
              }
          })
      }
  }
};
</script>