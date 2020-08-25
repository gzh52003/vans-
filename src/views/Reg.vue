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
              label-width="80px"
              class="demo-ruleForm"
            >
              <h2 :span="24" style="text-align: center;">免费注册</h2>
              <el-form-item label="用户名:" prop="username" error>
                <el-input v-model="ruleForm.username" style="width:90%" @blur="checkUser"></el-input>
              </el-form-item>
              <el-form-item label="密 码:" prop="password">
                <el-input v-model="ruleForm.password" style="width:90%" type="password"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" prop="vcode" v-model="vcode">
                <el-input v-model="ruleForm.vcode" style="width:50%"></el-input>
                <div style="display: inline-block;">
                  <!-- <el-form-item label="1" :prop="yzm"></el-form-item> -->
                  <div style="display: inline-block;">
                    <span id="svgVcode" v-html="yzm"></span>
                  </div>
                  <span id="changeCaptcha" @click="changeCaptcha">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-arrow-repeat"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"
                      />
                    </svg>
                    <label for="changeCaptcha">换一张</label>
                  </span>
                </div>
                <!-- <el-button @click="getCode()" style="width:20%"></el-button> -->
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="submitForm"
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
import changeCaptcha from '../utils/changeCapcha'
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        vcode: "",
        capFlag: true,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        vcode: [
          { required: true, message: "验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "blur" },
        ],
      },
      yzm: "",
    };
  },
  methods: {
    async getCode() {
      console.log(999);
      const result = await this.$request.get("../filter/vcode");
      console.log(result, 1);
    },
    async checkUser() {
      const username = this.ruleForm.username;
      const { data } = await this.$request.get("/reg/check/", {
        params: {
          username,
        },
      });
      if (data.code === 0) {
        //  this.rules.username[0].message = "用户名已经存在"
        //  rule.message = ""
        this.$message({
          message: "用户名已存在",
          type: "warning",
        });
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid);
        if (valid) {
          const { data } = await this.$request.post("/reg", {
            ...this.ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              message: "注册成功",
              type: "success",
              showClose: true,
            });
            setTimeout(() => {
              this.$router.push("/login");
            }, 700);
          } else if (data.code === 10) {
            this.$message({
              message: "验证码错误",
              type: "warning",
            });
            this.getCapcha();
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
   changeCaptcha,
    async getCapcha() {
      // 获取验证码
      let { data } = await this.$request.get("/vcode");
      if (data.code === 1) {
        this.yzm = data.data;
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  created() {
    this.getCapcha();
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

#svgVcode {
  width: 50px;
  height: 20px;
  overflow: hidden;
  padding: 0;
}

#svgVcode svg {
  position: relative;
  top: 15px;
}
#changeCaptcha svg,
label {
  line-height: 34px;
  cursor: pointer;
  user-select: none;
}
.rotate {
  transform: rotate(360deg);
  transition: 1s;
}
</style>