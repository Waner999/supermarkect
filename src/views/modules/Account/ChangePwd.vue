<template>
  <div class="changePwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">修改密码</span>
      </div>

      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="原密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="Newpwd">
            <el-input v-model="ruleForm.Newpwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdEx">
            <el-input v-model="ruleForm.pwdEx" clearable show-password></el-input>
          </el-form-item>

          <!-- 错误提示 -->
          <el-alert v-if="success" title="修改成功" type="success" show-icon center></el-alert>
          <el-alert v-if="error" title="原密码不正确" type="error" show-icon center></el-alert>
          <!-- 按钮 -->
          <el-button type="primary" class="btn1" @click="submitForm">确认修改</el-button>
          <el-button type="primary" class="btn2" @click="resetForm">重置</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { changePwd } from "@/apis/apis"; //引入axios
export default {
  data() {
    let validatePassPwd = (rule, value, callback) => {
      //定义验证规则

      let reg = /^\w{5,16}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("密码必须是5-16位字母数字下划线"));
      }
    };
    let validatePassPwdEx = (rule, value, callback) => {
      //定义验证规则

      if (value == this.ruleForm.Newpwd) {
        callback();
      } else {
        callback(new Error("密码不一致"));
      }
    };
    return {
      //提示信息
      error: false,
      success: false,
      ruleForm: {
        //类似ID选中dom
        pwd: "",
        Newpwd: "",
        pwdEx: ""
      },
      rules: {
        //表单验证规则
        pwd: [{ validator: validatePassPwd, trigger: "blur" }],
        Newpwd: [{ validator: validatePassPwd, trigger: "blur" }],
        pwdEx: [{ validator: validatePassPwdEx, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let pwd = this.ruleForm.pwd; //原密码
          let newpwd = this.ruleForm.Newpwd; //新密码
          let userid = localStorage.getItem("userid"); //获取id
          console.log(pwd, newpwd, userid);

          changePwd(pwd, newpwd, userid).then(res => {
            if (res.data == "2") {
              this.$notify.error({
                title: "系统提示",
                message: "用户原密码错误",
                showClose: false
              });
            } else if (res.data == "ok") {
              this.$notify.success({
                title: "系统提示",
                message: "密码修改成功",
                showClose: false
              });
              this.ruleForm = { pwd: "", Newpwd: "", pwdEx: "" };
            }
          });
        } else {
          this.$alert("请正确输入密码", "系统提示", {
            confirmButtonText: "确定",
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields(); //重置函数
    }
  }
};
</script>

<style lang="less" scoped>
.changePwd {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .box-card {
    width: 550px;
    height: 450px;
    background: #ece2e22e;

    .title {
      display: flex;
      justify-content: center;
      font-size: 20px;
    }
    .btn1 {
      margin-left: 100px;
      margin-top: 20px;
    }
  }
}
</style>