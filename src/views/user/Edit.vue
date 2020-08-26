<template>
  <div>
    <el-upload
      name="avatar"
      class="avatar-uploader"
      action="https://img1.vans.com.cn/public/images/53/7c/cd/2a3ff2a2eff7ec3c1a21a78e040e9cf24bfb972a.jpg?1591340670#h"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      style="display:inline-block;position:absolute;"
    >
      <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:70%;float:right; margin-right:14%;"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
          <el-option label="保密" value="dontknow"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("未满18禁止浏览"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };
    return {
      userid: "",
      ruleForm: {
        username: "",
        password: "",
        gender: " ",
        age: " ",
        imageUrl: "",
      },
      rules: {
        age: [
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          // 自定义校验规则
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        password: [
          {
            min: 6,
            max: 12,
            message: "密码长度必须在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          console.log(this.imageUrl);
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/user/update/" + userid, {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let data = new FormData();
      data.set("_id", this.userid);
      data.set("avatar", file);
      const result = await this.$request.post("upolad/avatar", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.imageUrl = `http://127.0.0.1:2003` + result.data.data.avatarUrl;
      this.ruleForm.imageUrl =
        `http://127.0.0.1:2003` + result.data.data.avatarUrl;
      console.log(this.ruleForm.imageUrl);
      return isJPG && isLt2M;
    },
  },
  async created() {
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/find/" + id);
    this.userid = id;
    Object.assign(this.ruleForm, data.data);
    this.ruleForm.password = "";
  },
  mounted() {

  },
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon-plus:before {
  content: "\e6d9";
  line-height: 180px;
}
</style>