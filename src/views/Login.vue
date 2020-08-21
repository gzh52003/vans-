<template>
  <el-container style="height:100%">
    <el-main calss="main">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple" style="height:430px">
            <h2 :span="24" style="text-align: center;">欢迎登录</h2>
            <el-form ref="form" label-width="80px">
              <el-form-item type="search"
              ref="search" label="用户名:">
                <el-input v-model="form.username" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="密 码:">
                <el-input v-model="form.password" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item for="svgCode" label="验证码:">  
                <el-input v-model="form.vccode" style="width:70%"></el-input>
                <el-button id="vcCode" style="width:20%">nbsp</el-button>                 
              </el-form-item>
              <el-form-item>
                <el-checkbox label="7天免登录" name="type"></el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-right:100px" @click="rootHome">立即登录</el-button>
                <el-button type="text" style="text-decoration: underline;" @click="rootReg">点击注册</el-button>
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
        username: "",
        password: "",
        vccode: ""
      },
    };
  },
  methods: {
    rootHome(){
      this.$router.push("/Home")
    },
    rootReg(){
      this.$router.push("/Reg")
    }
  },
};
</script>

<style scoped>
html,body,#app{
  height: 100%;
}
body{
  margin: 0;
}
.el-container{
  background: url(../../public/images/logo.jpg);
  background-size: 60px;
}
</style>
