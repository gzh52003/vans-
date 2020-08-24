<template>
  <el-container style="height:100%">
    <el-main calss="main">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form 
            :model="ruleForm" 
            :rules="rules" 
            ref="ruleForm" 
            label-width="80px">
              <h2 :span="24" style="text-align: center;">免费注册</h2>
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="ruleForm.username" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="密 码:" prop="password">
                <el-input v-model="ruleForm.password" style="width:90%" type="password"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" prop="vccode">
                <el-input v-model="ruleForm.vccode" style="width:70%"></el-input>
                <el-button @click="getCode()" style="width:20%">nbsp</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="submitForm('ruleForm')"
                  native-type="submit"
                  type="primary"
                  style="falot:left"
                >立即注册</el-button>
                <el-button type="text" @click="goLogin" style="margin-left: 140px;">已注册，请登录</el-button>
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
      ruleForm: {
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
    async getCode() {
      console.log(999);
      const result = await this.$request.get("../filter/vcode");
      console.log(result , 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/user/insert/";
          const { ruleForm } = this;
          const { data } = await this.$request.post(url, {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              message: "注册成功",
              type: "success",
              showClose: true,
            });
            this.$router.push('/login');
          } else {
            this.$message({
              message: "用户名或密码不能为空",
              type: "warning",
            });
          }
        } else {
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  created () {
    
  }
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