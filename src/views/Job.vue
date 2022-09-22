<template>
  <div>
    <!-- 查询 -->
    <el-row :gutter="20">
      <el-col :span="3.5">
        <div class="grid-content ">
          <el-input placeholder="请输入职位名称" v-model="selectData.jobName" clearable>
          </el-input>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="grid-content ">
          <el-button plain @click="search">查询</el-button>
        </div>
      </el-col>

      <el-col :span="2">
        <div class="grid-content ">
          <!-- 添加 -->
          <el-button type="primary" @click="open">添加</el-button>
        </div>
      </el-col>
    </el-row>


    <!-- 表单 -->
    <el-table :data="tableData" stripe style="width: 100%" key="jobId" v-loading="loading" >
      <el-table-column prop="jobId" label="id">
      </el-table-column>
      <el-table-column prop="jobName" label="职位名称">
      </el-table-column>
      <el-table-column prop="jobIntroduce" label="职位介绍">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="getOne(scope.row.jobId)"
            :disabled="me.userLevel<=scope.row.userLevel"></el-button>
          <el-popconfirm confirm-button-text='是的' cancel-button-text='不了' icon="el-icon-info" icon-color="red"
            @confirm='del(scope.row.jobId)' title="确定删除吗？">
            <el-button slot="reference" type="danger" icon="el-icon-delete" circle
              :disabled='me.userLevel<=scope.row.userLevel'></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
      </el-pagination>
    </div>

    <!-- 修改弹窗 -->
    <el-dialog title="详情" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="职位id">
          <el-input v-model="form.jobId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input v-model="form.jobName"></el-input>
        </el-form-item>
        <el-form-item label="职位介绍">
          <el-input type="textarea" v-model="form.jobIntroduce"></el-input>
        </el-form-item>
        <el-button type="primary" @click="change()">确认</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        me: "",
        selectData: {
          jobId: '',
          jobName: '',
          jobIntroduce: ''
        },
        tableData: [],
        pagination: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        form: {
          jobId: '',
          jobName: '',
          jobIntroduce: ''
        },
        centerDialogVisible: false,
        loading: true
      }
    },
    methods: {
      //分页
      getList() {
        //axios
        var jobName = this.selectData.jobName;
        var jobIntroduce = this.selectData.jobIntroduce;
        var http = '/job/' + this.pagination.currentPage
          + '/' + this.pagination.pageSize + '?q';
        if (jobName != null && jobName != '')
          http += '&jobName=' + jobName;
        if (jobIntroduce != null && jobIntroduce != '')
          http += '&jobIntroduce=' + depjobIntroducetId;
        console.log(http)
        this.$axios.get(http).then((response) => {
          // 处理成功情况
          console.log("分页数据：" + response.data.data.current);
          var r = response.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.loading = false;
            this.pagination.total = r.data.total
            this.tableData = r.data.records
          }
        })
      },

      //查一个
      getOne(id) {
        this.$axios.get('/job/' + id).then(res => {
          var r = res.data;
          console.log(r);
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.centerDialogVisible = true;
            this.form = r.data
          }
        })
      },
      //改一个
      change() {
        if (this.form.jobId == null || this.form.jobId == '') {
          this.add();
          return;
        }
        this.$axios.put('/job', this.form).then(res => {
          var r = res.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.centerDialogVisible = false;
            this.loading = true;
            this.getList();
            this.success("成功修改数据！");
          }
        })
      },
      //删一个
      del(id) {
        this.$axios.delete('/job/' + id).then(res => {
          var r = res.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            //重新计算页面符合不符合预期
            var pages = this.cal(this.pagination.total - 1, this.pagination.pageSize)
            if (this.pagination.currentPage > pages) {
              this.pagination.currentPage = pages
            }
            this.loading = true;
            this.getList();
            this.success("成功删除数据！");
          }
        })
      },
      //增一个
      add() {
        this.$axios.post('/job', this.form).then(res => {
          var r = res.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.centerDialogVisible = false;
            this.loading = true;
            this.getList();
            this.success("成功添加数据！");
          }
        })
      },
      //打开弹窗
      open() {
        this.cancel();
        this.centerDialogVisible = true;
      },
      //取消弹窗
      cancel() {
        this.centerDialogVisible = false;
        this.form = {
          jobId: '',
          jobName: '',
          jobIntroduce: ''
        };
      },

      //分页大小改变
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.loading = true;
        this.getList();
        console.log(`每页 ${val} 条`);
      },
      //当前页改变
      handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.loading = true;
        this.getList();
        console.log(`当前页: ${val}`);
      },
      //成功
      success(msg) {
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success',
        });
      },
      //失败
      wrong(msg) {
        this.$notify.error({
          title: '错误',
          message: msg,
        });
      },
      //搜索
      search() {
        this.pagination.currentPage=1;
        this.getList();
      },
      //向上取整
      cal(x, y) {
        return x / y + (x % y != 0 ? 1 : 0);
      },
    },

    mounted() {
      //获取session中的数据
      var me = JSON.parse(sessionStorage.getItem("employee"));
      this.me = me;
      this.getList();
    }
  }
</script>
<style>
  .el-alert .el-alert__description {
    font-size: 18px;
    margin: 0px 0 0;
  }

  .el-pagination .el-select .el-input .el-input__inner {
    padding-right: 25px;
    border-radius: 3px;
    width: 100px;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 30px;
    width: auto;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    width: max-content;
  }
</style>
<!-- 布局样式 -->
<style>
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>