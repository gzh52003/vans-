<template>
    <div>
        <el-container>
            <el-header>
                <h1>用户添加</h1>
            </el-header>
            <el-main>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
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
                <el-button type="success" @click="submitForm">添加</el-button>
            </el-form-item>
            </el-form>
            </el-main>
        </el-container>
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
        return{
            ruleForm:{
                username:"",
                password:"",
                gender:"",
                age:""  
            },
            rules:{
                age: [
                        { required: true, message: "年龄必填", trigger: "change" },
                        { type: "number", message: "只能输入数字", trigger: "change" },
                        // 自定义校验规则
                        {
                            validator: checkAge,
                            trigger: "change",
                        },
                        ],
                username:[{required:true,message:"用户名必填",tigger:"channge"}],
                password:[{required:true,message:"密码必填",tigger:"change"},],
                gender:[{required:true,message:"性别必选",tigger:"change"}]
            },
        };
    },
    methods:{
        submitForm(){
            this.$refs.ruleFrom.validate(async(vaild)=>{
                if(vaild){
                    const{data}=await this.$request.post("/user/insert",{
                        ...this.ruleForm
                    });
                    if(data.code === 1){
                        this.$message({
                            type:"success",
                            message:"添加成功"
                        })
                    }
                }
            })
        }
    }
};
</script>