<template>
  <div class="salesSta">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售统计</span>
      </div>
      <el-form :inline="true" :model="formInline" class="salesForm">
        <el-form-item label="时间">
          <div class="block">
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
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="销售情况统计">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <div id="myChart"></div>
    </el-card>
  </div>
</template>

<script>
import { statistics } from "@/apis/apis";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  mounted() {
    this.drawLine();
  },

  methods: {
    drawLine() {
      //获取数据
      statistics().then(res => {
        //创建数组接收数据
        let categoryArr = [];
        let valueArr = [];
        for (let key in res.data[0]) {
          categoryArr.push(key);
          valueArr.push(res.data[0][key]);
        }

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: "category",
            data: categoryArr
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: valueArr,
              type: "line"
            }
          ]
        });
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less" scoped>
  
.salesSta {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    height: 99%;
    width: 100%;
  }
}
.salesForm {
  display: flex;
  justify-content: center;
}

#myChart{
  width: 1100px;
  height: 500px;
}
</style>