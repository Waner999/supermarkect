<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加vip账号</span>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="100px" class="form">
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="会员卡卡号">
        <el-input v-model="form.vipCard"></el-input>
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item label="用户组">
        <el-select v-model="form.region" placeholder="请选择会员组">
          <el-option label="普通会员" value="普通会员"></el-option>
          <el-option label="超级会员" value="超级会员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <!-- 单选 -->

      <el-form-item label="用户状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="启用" value="启用"></el-radio>
          <el-radio label="禁用" value="禁用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>

      <el-form-item label="邮箱地址">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.add"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { setvip } from "@/apis/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        vipCard: "",
        region: "",
        resource: "",
        id: "",
        tel: "",
        add: "",
        email: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //获取数据
      let name = this.form.name;
      let vipCard = this.form.vipCard;
      setvip(name, vipCard).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.form = {
            name: "",
            vipCard: "",
            region: "",
            resource: "",
            id: "",
            tel: "",
            add: "",
            email: ""
          };
        } else {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  height: 99%;
  width: 99%;
  .form {
    width: 500px;
    height: 100%;
    .el-input {
      width: 300px;
    }
  }
}
</style>