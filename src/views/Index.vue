<template>
  <div class="container">
    <div class="top">
      <h3>后台管理系统</h3>
      <!-- 用户名 -->
      <div class="user-info">
        <span class="user-head" title="修改头像">
          <el-upload
            class="avatar-uploader"
            method="POST"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="inputFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
        <span title="用户名" @click="loginuser">{{ username }}</span>
        <span class="el-icon-switch-button" title="退出系统" @click="outWindow"></span>
      </div>
    </div>
    <div class="content">
      <div class="left-box">
        <!-- 导航菜单 -->
        <el-menu
          :default-active="active"
          class="menu"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#ffd04b"
          text-color="#fff"
          background-color="#333844"
          unique-opened
          router
        >
          <!-- 
          [{index:'1',class:'el-icon-shopping-bag-1',title:'商品管理',child:[{index:'/main/mangement',name:'商品管理'},{index:'/main/addCommodity',name:'添加商品'},
          ]}]
          -->
          <el-submenu
            :index="item.index"
            v-for="item in treeList"
            v-show="item.usergroup.indexOf(group) != -1"
          >
            <template slot="title">
              <i :class="item.class"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group class="submenu" v-for="child in item.child">
              <el-menu-item :index="child.index">{{ child.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { token } from "@/apis/apis";
// import Axios from 'axios';
export default {
  data() {
    return {
      action:'',
      //头像地址
      imageUrl: "",
      //用户名
      username: "请登录",
      group: [], //管理组
      //菜单激活数据
      active: "/main/mangement",
      //树菜单数据
      treeList: [
        //商品管理
        {
          index: "1",
          class: "el-icon-shopping-bag-1",
          title: "商品管理",
          child: [
            { index: "/main/mangement", name: "商品管理" },
            { index: "/main/addCommodity", name: "添加商品" }
          ],
          usergroup: ["1", "2"]
        },
        {
          index: "2",
          class: "el-icon-s-claim",
          title: "进货管理",
          child: [
            { index: "/main/Stock", name: "库存管理" },
            { index: "/main/AddStock", name: "添加库存" }
          ],
          usergroup: ["1", "2"]
        },
        {
          index: "3",
          class: "el-icon-sold-out",
          title: "出货管理",
          child: [
            { index: "/main/SalesList", name: "销售列表" },
            { index: "/main/OutGoods", name: "商品出库" },
            { index: "/main/GoodsReturn", name: "商品退货" }
          ],
          usergroup: ["1", "2"]
        },
        {
          index: "4",
          class: "el-icon-crop",
          title: "统计管理",
          child: [
            { index: "/main/SalesStatistics", name: "销售统计" },
            { index: "/main/StockStatistics", name: "进货统计" }
          ],
          usergroup: ["1"]
        },
        {
          index: "5",
          class: "el-icon-user",
          title: "会员管理",
          child: [
            { index: "/main/Account", name: "账号管理" },
            { index: "/main/AddAccount", name: "添加账号" },
            { index: "/main/ChangePwd", name: "密码修改" }
          ],
          usergroup: ["1"]
        },

        {
          index: "7",
          class: "el-icon-setting",
          title: "账号管理",
          child: [
            { index: "/main/Vip", name: "会员管理" },
            { index: "/main/Addvip", name: "添加会员" },
          ],
          usergroup: ["1"]
        }
      ]
    };
  },
  created() {
    //根据hash变化 改变默认active
    this.active = location.hash.replace("#", "");
    //获取tokenID
    let tokenid = localStorage.getItem("token");
    //设置头像地址
    this.action = 'http://172.16.14.188:3000/upload?id='+localStorage.getItem('userid')
    //设置头像 
    this.imageUrl = localStorage.getItem('avatarUrl')
    //默认头像
    if( this.imageUrl  == 'null' ){
      this.imageUrl =  require('@/assets/images/user-head.jpg')
    }
    //获取管理组
    this.group = localStorage.getItem("group");
    //发送token
    token(tokenid).then(res => {
      if (res.data == "ok") {
        //还在登陆状态
        this.username = localStorage.getItem("acc");
      } else {
        this.username = "请登录";
      }
    });
  },

  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    outWindow() {
      this.$router.push("/");
      localStorage.clear();
    },
    loginuser() {
      let user = this.username;
      if (user == "请登录") {
        this.$router.push("/");
      } else {
        this.$router.push("/main");
      }
    },
    handleAvatarSuccess(res, file) {
       localStorage.setItem('avatarUrl',res) 
      this.imageUrl = res
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>

a {
  color: #fff;
  text-decoration: none;
}
.container {
  height: 100%;
  width: 100%;
  .top {
    height: 10%;
    background: #254864;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url("../assets/images/bg_head.jpg") no-repeat;
    background-size: cover;
    h3 {
      margin: 0;
      color: #fff;
      font-size: 30px;
      text-indent: 110px;
    }
    .user-info {
      display: flex;
      align-items: center;
      margin-right: 100px;
      .user-head {
        background-size: cover;
        border-radius: 25px;
        img{
          height: 100%;
          width: 100%;
          border-radius: 25px;
        }
      }
      span {
        text-align: center;
        line-height: 50px;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 30px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .content {
    display: flex;
    height: 90%;
    width: 100%;
    .left-box {
      height: 100%;
      width: 250px;
      min-width: 300px;
      .menu {
        height: 100%;
      }
    }
    .right-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>