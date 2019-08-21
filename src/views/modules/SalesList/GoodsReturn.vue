<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <div class="table">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model.number="formData.orderNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="time" label="日期"></el-table-column>
        <el-table-column property="name" label="商品名称"></el-table-column>
        <el-table-column property="num" label="数量"></el-table-column>
        <el-table-column property="salePrice" label="单价"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOut">退 货</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodsReturn, out } from "@/apis/apis";
export default {
  data() {
    return {
      //开启退款框
      dialogTableVisible: false,
      formData: {
        orderNumber: ""
      },
      gridData: {}
    };
  },
  methods: {
    //查询
    onSubmit() {
      //获取订单号
      let orderNumber = this.formData.orderNumber;

      goodsReturn(orderNumber).then(res => {
        console.log(res);
        //更新数据
        this.gridData = res.data.data;
        //显示修改框
        this.dialogTableVisible = true;
      });
    },
    isOut() {
      //获取订单号
      let orderNumber = this.formData.orderNumber;
      out(orderNumber).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "退货成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "退货失败",
            type: "warning"
          });
        }
        console.log(res);
      });
      //修改框
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>