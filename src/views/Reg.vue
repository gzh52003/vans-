<template>
  <el-container style="height:100%">
    <el-main calss="main">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form label-width="80px">
              <h2 :span="24" style="text-align: center;">免费注册</h2>
              <el-form-item label="用户名:">
                <el-input v-model="form.name" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="密 码:" style="width:92%">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item for="svgCode" label="验证码:">  
                <el-input style="width:70%"></el-input>
                <el-button id="vcCode" style="width:20%">nbsp</el-button>                 
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-right:140px">立即注册</el-button>
                <el-button type="text">已注册，请登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
.grid-content {
  box-sizing: border-box;
  height: 400px;
  width: 60%;
  padding: 30px;
  margin-top: 50px;
  background-color: #e9eef3;
  float: right;
}
</style>