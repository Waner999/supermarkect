<template>
  <div class="addAcc">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">添加账号</span>
      </div>

      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="Newpwd">
            <el-input v-model="ruleForm.Newpwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdEx">
            <el-input v-model="ruleForm.pwdEx" clearable show-password></el-input>
          </el-form-item>

          <el-select v-model="userGroup" placeholder="请选择用户组" class="userGroup">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 按钮 -->
          <el-button type="primary" class="btn1" @click="submitForm">确认添加</el-button>
          <el-button type="primary" class="btn2" @click="resetForm">重置</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addAccount } from "@/apis/apis"; //
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      //定义验证规则
      let reg = /^\w{5,16}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("用户名必须是5-16位字母数字下划线"));
      }
    };
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
      //用户组
      userGroup: "",
      options: [
        { value: "1", label: "超级管理员" },
        { value: "2", label: "管理员" }
      ],
      ruleForm: {
        //类似ID选中dom
        name: "",
        Newpwd: "",
        pwdEx: ""
      },
      rules: {
        //表单验证规则
        name: [{ validator: validatePass, trigger: "blur" }],
        Newpwd: [{ validator: validatePassPwd, trigger: "blur" }],
        pwdEx: [{ validator: validatePassPwdEx, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let acc = this.ruleForm.name;
          let pwd = this.ruleForm.Newpwd;
          let userGroup = this.userGroup;
          //发送请求
          addAccount(acc, pwd, userGroup).then(res => {
            if (res.data == "ok") {
              this.$message({
                message: "系统提示 :  添加账号成功!",
                type: "success"
              });
            //清空输入框
              this.ruleForm = { name: "", Newpwd: "", pwdEx: "" };
            } else if (res.data == "2") {
              this.$message({
                message: "系统提示:用户名已存在",
                type: "warning"
              });
            } else {
              this.$message.error("系统提示:网络故障,请刷新");
            }
          });
        } else {
          this.$message.error("系统提示  :  请确认用户名或密码是否正确");
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
.addAcc {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .box-card {
    width: 550px;
    height: 500px;
    background: #ece2e22e;
    .userGroup {
      margin-left: 100px;
      margin-bottom: 30px;
    }
    .title {
      display: flex;
      justify-content: center;
      font-size: 20px;
    }
    .btn1 {
      margin-top: 40px;
      margin-left: 100px;
    }
  }
}
</style>