<template>
  <div class="background">
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- 标题 -->
          <span class="title">Waner后台管理系统</span>
        </div>
        <!-- 登陆 -->
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="login-form"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" clearable show-password></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-button type="primary" class="btn" @click="submitForm">登陆</el-button>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { login } from "@/apis/apis"; //引入请求
export default {
  data() {
    //用户名验证
    var validatePass = (rule, value, callback) => {
      //定义验证规则
      let reg = /^\w{5,16}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("用户名必须是5-16位的字母数字下划线"));
      }
    };
    let validatePassPwd = (rule, value, callback) => {
      //定义验证规则
      let reg = /^\w{5,16}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("密码必须是5-16位的字母数字下划线"));
      }
    };
    return {
      error: false,
      ruleForm: {
        //类似ID选中dom
        name: "",
        pwd: ""
      },
      rules: {
        //表单验证规则
        name: [{ validator: validatePass, trigger: "blur" }],
        pwd: [{ validator: validatePassPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //发送请求
          login(this.ruleForm.name, this.ruleForm.pwd).then(res => {
            //保存id
            localStorage.setItem("userid", res.data.id);
            //保存管理组
            localStorage.setItem("group", res.data.userGroup);
            //保存token
            localStorage.setItem('token',res.data.token)
            //保存头像地址
            localStorage.setItem('avatarUrl',res.data.avatarUrl)
            if (res.data.data == "ok") {
              //登陆成功
              this.$router.push("/main/mangement");
              //保存用户名
              localStorage.setItem("acc", this.ruleForm.name);
            } else {
              //登陆失败
              this.$message.error('系统提示 :   用户名或密码错误');
            
            }
          });
        } else {
         this.$message.error('系统提示 :   请正确输入账号密码');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 登陆框
.background {
  height: 100%;
  width: 100%;
  background: url("../assets/images/login-body.jpg") no-repeat;
  background-size: cover;
  .login {
    //外层登陆盒子
    height: 720px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .box-card {
      //登陆卡片
      width: 500px;
      height: 300px;
      margin-right: 50px;
      background: rgba(255, 255, 255, 0.815);
      //标题
      .title {
        display: block;
        font-size: 20px;
        text-indent: 10px;
        color: rgb(145, 224, 235);
      }
      //登陆表单
      .login-form {
        width: 400px;
        height: 300px;
      }
      .btn {
        width: 180px;
        font-size: 18px;
        margin-left: 140px;
      }
    }
  }
}
</style>