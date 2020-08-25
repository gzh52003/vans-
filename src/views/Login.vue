<template>
  <el-container style="height:100%">
    <el-main calss="main">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple" style="height:430px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
              <h2 :span="24" style="text-align: center;">欢迎登录</h2>
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="ruleForm.username" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="密 码:" prop="password">
                <el-input v-model="ruleForm.password" style="width:90%" type="password"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" prop="vccode">
                <el-input v-model="ruleForm.vccode" style="width:70%"></el-input>
                <el-button style="width:20%">nbsp</el-button>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="7天免登录" name="type"></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="submitForm('ruleForm')"
                  native-type="submit"
                  type="primary"
                  style="margin-right:100px"
                >立即登录</el-button>
                <el-button type="text" style="text-decoration: underline;" @click="goReg">点击注册</el-button>
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
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
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
    async submitForm(formName) {
      const url = `/user?username=${this.ruleForm.username}&password=${this.ruleForm.password}`;
      const { data } = await this.$request.get(url);
      let timer = new Date()
      timer.setDate(timer.getDate() + 1)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (data.code === 1) {
            this.$message({
              message: "登陆成功",
              type: "success",
              showClose: true,
            });
            this.$router.push('/home')
            // cookie
            document.cookie = `usermane=${this.ruleForm.username};expires=${timer}`
            //localStorage
            localStorage.setItem("data" , JSON.stringify(data.data[0]))
          } else if(data.code === 0) {
            this.$message({
              message: "账号或密码错误",
              type: "error",
            });
          } else {
            //验证码错误
            this.$message({
              showClose: true,
              message: "验证码错误",
              type: "error",
            });
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    goReg() {
      this.$router.push("/reg");
    },
  },
};
</script>

<style scoped>
</style>
