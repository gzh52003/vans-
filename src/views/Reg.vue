<template>
  <el-container style="height:100%">
    <el-main calss="main">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form label-width="80px" :rules="rules" :model="formUrl" ref="formUrl">
              <h2 :span="24" style="text-align: center;">免费注册</h2>
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="formUrl.username" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="密 码:" prop="password">
                <el-input v-model="formUrl.password" style="width:90%" type="password"></el-input>
              </el-form-item>
              <el-form-item for="svgCode" label="验证码:" prop="vccode">
                <el-input v-model="formUrl.vccode" style="width:70%"></el-input>
                <el-button id="vcCode" style="width:20%">nbsp</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="rootHome" style="falot:left">立即注册</el-button>
                <el-button type="text" @click="rootLogin" style="falot:right">已注册，请登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
/* import user from "../api/scr/router/user" */
export default {
  data() {
    return {
      formUrl: {
        username: "",
        password: "",
        vccode: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        vccode: [
          { required: true, message: "验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    rootHome() {
      this.$router.push("/Home");
    },
    rootLogin() {
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    
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