<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <el-row>
          <el-col :span="2" style>
            <img src="../../public/vans-logo.png" alt style="width:100%" />
          </el-col>
          <el-col :span="10" class="logo" style="padding-left:15px">后台管理系统</el-col>
          <el-col :span="12" style="text-align:right">
            <el-button type="text" class="headbtn" @click="gotoreg">注册</el-button>
            <el-button type="text" class="headbtn" @click="gotologin">登陆</el-button>
          </el-col>
        </el-row>
      </el-header>

      <!-- 主体部分 -->
      <el-container style="height:663px;overflow:hidden">
        <!-- 侧边栏 -->
        <el-aside width="250px" >
          <el-menu
            style="height:100%"
    
            :default-active="activeIndex"
            mode="vertical"
            background-color="rgba(36, 41, 53, 0.781)"
            text-color="rgb(92, 206, 250)"
            active-text-color="rgb(45, 94, 194)"
            @select="changeMenu"
            :default-openeds="openMenu"
            router
          >
            <template v-for="item in menu">
              <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
                <i :class="item.icon" stle="color:rgb(92, 206, 250)"></i>
                {{item.text}}
              </el-menu-item>
              <el-submenu :key="item.path" :index="item.path" v-else>
                <template v-slot:title>
                  <i :class="item.icon" style="color:rgb(92, 206, 250)"></i>
                  {{item.text}}
                </template>
                <el-menu-item
                  :key="sub.path"
                  :index="item.path+sub.path"
                  v-for="sub in item.submenu"
                >{{sub.text}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <!-- 主体显示框 -->
        <el-main class="main-con">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/user' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/order' }">订单管理</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="padding:20px 0;">
            <router-view />
          </div>
          <!-- <router-view /> -->
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>
export default {
   name:"App",
  data(){
    return{
      activeIndex:"/home",
      openMenu:[],
      menu:[
        // {
        //   path:"/login"
        // },{
        //   path:"reg"
        // },
        {
          text:"首页",
          path:"/home",
          icon:"el-icon-s-home",
        },
        {
          text:"用户管理",
          path:"/home/user",
          icon:"el-icon-user-solid",
          submenu:[
            {
              text:"添加用户",
              path:"/add"
            },
            {
              text:"编辑用户",
              path:"/edit",
            },
            {
              text:"用户列表",
              path:"/list"
            }
          ]
        },
        {
          text:"商品管理",
          path:"/home/goods",
          icon:"el-icon-s-goods",
          submenu:[
            {
              text:"添加商品",
              path:"/add"
            },
            {
              text:"商品列表",
              path:"/list"
            }
          ]
        },
        {
          text:"订单管理",
          path:"/home/order",
          icon:"el-icon-document",
        }
      ]
    }
  },
  methods:{
    gotoreg(){
      console.log('11')
      this.$router.replace({
        name : 'reg'
      })
    },
    gotologin(){
      this.$router.replace({
        name: 'login'
      })
    }
  }
};
</script>
<style lang="scss">
html{height: 100%;
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
body{
  margin: 0;
  height: 100%;
}
.header{
  img{
    padding: 2px 0 0 10px;
    margin: 5px;
  }
  line-height: 60px;
  color: aqua;
  background: rgba(67, 68, 85, 0.781);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .logo{
    font-size: 24px;
    color:rgb(92, 206, 250);
    font-weight: bolder;
    
  }
  .headbtn{
    color:rgb(92, 206, 250);
  }
}
.main-con{
  background:url(../../public/bg.png)no-repeat center center;
  background-size: 100% 100%;
}
</style>