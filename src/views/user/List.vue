<template>
    <div>
    <el-table
    :data="userlist"
    height="600"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="200">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="200">
    </el-table-column>
    <el-table-column label="操作">
    <template v-slot:default="scope">
        <el-button-group>
  <el-button type="primary" icon="el-icon-edit" plain @click="goto
  (scope.row._id)">
  编辑
  </el-button>

  <el-button type="primary" icon="el-icon-delete" plain @click="deleteUser(scope.row._id)">
  删除</el-button>
</el-button-group>
    </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
    data() {
      return {
        userlist: [
        {
          username: "",
          gender:"",
          age:"",
        }, ],
      };
    },
    components:{
          // search,
    },
    methods:{
        async deleteUser(id){
            console.log(1);
            this.$confirm("你确认要删除这个用户信息吗","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning",
            }).then(async()=>{
                let{data}=await this.$request.delete("/user/delete/"+id);
                if(data.code===1){
                    this.userlist=this.userlist.filter((item)=>item._id !==id)
                    this.$message({
                        type:"success",
                        message:"删除成功",
                    })
                }
            })
        },
        goto(id){
            this.$router.push({
                name:"userEdit",
                params:{id},
            })
        },
    },
    async  created(){
        console.log("List=",this);
        
        let{data}=await this.$request.get("/user",{
          paraams:{
            size: 8,
          }
        });
        console.log(data);
        this.userlist=data.data
    }
}
</script>
<style lang="scss">
.el-table,.el-table__row {
  background: rgba($color: #ffffff, $alpha: 0.3) !important;
}
.el-button-group{
    padding-left: 200px;
}
</style>