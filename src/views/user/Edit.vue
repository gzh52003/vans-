<template>
    <div>
        <h1>编辑用户</h1>
        <el-from :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item lable="用户名" prop="username">
                <el-input type="text" v-bind:value="ruleFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item lable="性别" prop="gender">
            <el-select v-model="ruleFrom.gender">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
                <el-option label="保密" value="dontknow"></el-option>
            </el-select> 
            </el-form-item>
            <el-item>
                <el-input v-model.number="ruleFrom.age"></el-input>
            </el-item>
            <el-form-item>
                <el-button type="success" @click="sbmitForm">修改</el-button>
            </el-form-item>
        </el-from>
    </div>
    
</template>
<script>
export default {
    data(){
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("未满18禁止浏览"));
      }else{
          // 规则通过后的回掉
          callback();
      }
    };
    return {
      userid: "",
      ruleForm: {
        username: "",
        password: "",
        gender: "male",
        age: "",
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
      this.$refs["ruleForm"].validate(async (valid) => {console.log(13,valid)
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
            const {userid,ruleForm} = this
          const {data} = await this.$request.put("/user/"+userid,{
              ...ruleForm
          });
          if(data.code === 1){
              this.$message({
                type: "success",
                message: "修改成",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    console.log("Router=", this.$router);
    console.log("Route=", this.$route);
    // const {a,b} = this.$route.query;
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/" + id);
    this.userid = id;
    Object.assign(this.ruleForm, data.data);
  },
}
</script>