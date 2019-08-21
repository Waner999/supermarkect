<template>
  <div class="acc">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="用户名称" width="500">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.acc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="管理组" width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userGroup == '1' ? '超级管理员' : '管理员' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="changePage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="total"
          class="page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

    </div>
    </el-card>
  </div>
</template>
 
 <script>
import { account, delAcc } from "@/apis/apis";
export default {
  methods: {
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该账户数据, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //获取id
          let id = row.id;
          delAcc(id).then(res => {
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.ajaxgetacc();
            } else {
              this.$message({
                type: "warning",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // delAcc(id).then(res => {
      //   if (res == "ok") {
      //   }
      // });
    },
    ajaxgetacc(curpage) {
      account(curpage,this.pagesize).then(res => {
        console.log(res);
        this.tableData = res.data.data;

        //最大页数
        this.total =  res.data.total
      });
    },
    changePage(curpage){
       this.curpage = curpage

       //调用数据
       this.ajaxgetacc(this.curpage)
    }
  },

  data() {
    //  {   acc: "",   userGroup: ""  }
    return {
      tableData: [],
      pagesize:2,
      total:0,
      curpage:1,

    };
  },
  created() {
    this.ajaxgetacc(this.curpage);
  }
};
</script>

<style lang="less" scoped>
.acc,
.box-card,
.table {
  height: 99%;
}
.page{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>