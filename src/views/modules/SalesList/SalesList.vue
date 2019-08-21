<template>
  <div class="salesList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售明细</span>
      </div>
    </el-card>
    <div class="block">
      <span class="title-date">订单时间:</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
    <!-- search -->

    <div style="margin-top: 15px;" class="search">
      <el-input placeholder="商品名称、订单号、客户名字、会员卡号" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="orderNumber" label="订单号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="salePrice" label="实际售价"></el-table-column>
      <el-table-column prop="promotion" label="优惠(促销/会员)"></el-table-column>
      <el-table-column prop="isOut" label="退款"></el-table-column>
      <el-table-column prop="time" label="销售时间"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block-page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="row"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { salesList } from "@/apis/apis";
export default {
  data() {
    return {
      pickerOptions: {
        //时间
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      //搜索
      input3: "",
      //分页
      currentPage: 1,
      //行
      row: 5,
      total: 0,
      //表格数据
      tableData: [{}]
    };
  },
  methods: {
    //分页函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage3 = val;

     this.ajaxsalesList(val)
    },
    //ajax
    ajaxsalesList(page) {
      salesList(page, this.row).then(res => {
        console.log(res);
        //获取数据
        this.tableData = res.data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].promotion =
            this.tableData[i].promotion == "0" ? "折扣" : "未折扣";
          this.tableData[i].isOut =
            this.tableData[i].isOut == "0" ? "未退货" : "已退货";
        }
        //最大页数
        this.total = res.data.total;
      });
    }
  },
  created() {
    this.ajaxsalesList(this.currentPage)
  }
};
</script>
<style lang="less" scoped>
.block {
  margin-top: 20px;
  .title-date {
    margin: 0 20px 0 100px;
  }
}
.search {
  width: 355px;
  margin-left: 187px;
}
.block-page {
  text-align: center;
  margin-top: 30px;
}
</style>