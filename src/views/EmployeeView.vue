<template>
  <div>
    <!-- 查询 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content ">
          <el-input placeholder="请输入姓名" v-model="selectData.employeeName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content ">
          <el-select v-model="selectData.deptId" placeholder="请选择部门">
            <el-option label="无" :value="0"></el-option>
            <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
          <el-select v-model="selectData.jobId" placeholder="请选择职位">
            <el-option label="无" :value="0"></el-option>
            <el-option v-for="item in jobList" :key="item.jobId" :label="item.jobName" :value="item.jobId">
            </el-option>
          </el-select>
          <el-button plain @click="search">查询</el-button>
          </el-input>
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
    <el-table :data="tableData" stripe style="width: 100%" key="employeeId" v-loading="loading"
      max-height="max-content">
      <el-table-column prop="employeeId" label="id">
      </el-table-column>
      <el-table-column prop="employeeName" label="姓名">
      </el-table-column>
      <el-table-column prop="job.jobName" label="职位">
      </el-table-column>
      <el-table-column prop="dept.deptName" label="部门">
      </el-table-column>
      <el-table-column prop="userLevel" label="用户等级">
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex==0">女</span>
          <span v-if="scope.row.sex==1">男</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="getOne(scope.row.employeeId)"
            :disabled="me.userLevel<=scope.row.userLevel"></el-button>
          <el-popconfirm confirm-button-text='是的' cancel-button-text='不了' icon="el-icon-info" icon-color="red"
            @confirm='del(scope.row.employeeId)' title="确定删除吗？">
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
        <el-form-item label="员工id">
          <el-input v-model="form.employeeId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="form.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option v-for="item in sexList" :key="item.sexId" :label="item.sexName" :value="item.sexId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input v-model="form.userLevel"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.deptId" placeholder="请选择部门">
            <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="form.jobId" placeholder="请选择职位">
            <el-option v-for="item in jobList" :key="item.jobId" :label="item.jobName" :value="item.jobId">
            </el-option>
          </el-select>
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
          employeeId: '',
          employeeName: '',
          pwd: '',
          address: '',
          birthday: '',
          email: '',
          mobile: '',
          sex: '',
          userLevel: '',
          deptId: '',
          jobId: ''
        },
        tableData: [],
        deptList: [],
        jobList: [],
        sexList: [
          {
            sexId: 0,
            sexName: '女'
          },
          {
            sexId: 1,
            sexName: '男'
          },
        ],
        errorMessage: "",
        error: false,
        pagination: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        form: {
          employeeId: '',
          employeeName: '',
          pwd: '',
          address: '',
          birthday: '',
          email: '',
          mobile: '',
          sex: '',
          userLevel: '',
          deptId: '',
          jobId: ''
        },
        centerDialogVisible: false,
        loading: true
      }
    },
    methods: {
      //获取部门列表
      getDept() {
        this.$axios.get('/dept').then(res => {
          var r = res.data;
          console.log("部门列表：" + r);
          if (!r.success) {
            //this.wrong(r.errorMsg)
          } else {
            this.deptList = r.data;
          }
        })
      },
      //获取职位列表
      getJob() {
        this.$axios.get('/job').then(res => {
          var r = res.data;
          console.log("职位列表：" + r);
          if (!r.success) {
            //this.wrong(r.errorMsg)
          } else {
            this.jobList = r.data;
          }
        })
      },
      //分页
      getList() {
        //axios
        var employeeName = this.selectData.employeeName;
        var deptId = this.selectData.deptId;
        var jobId = this.selectData.jobId;
        var http = '/employee/' + this.pagination.currentPage
          + '/' + this.pagination.pageSize + '?q';
        if (employeeName != null && employeeName != '')
          http += '&employeeName=' + employeeName;
        if (deptId != null && deptId != '' && deptId != 0)
          http += '&deptId=' + deptId;
        if (jobId != null && jobId != '' && jobId != 0)
          http += '&jobId=' + this.selectData.jobId;
        console.log(http)
        this.$axios.get(http).then((response) => {
          // 处理成功情况
          console.log(response.data);
          var r = response.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.loading = false;
            this.pagination.total = r.data.total;
            this.tableData = r.data.records
          }
        })
      },
      getAll() {
        //axios
        this.$axios.get('/employee').then((response) => {
          // 处理成功情况
          var r = response.data;
          if (!r.success) {
            this.wrong(r.errorMsg)
          } else {
            this.restaurants = r.data.records
          }
        })
      },
      //查一个
      getOne(id) {
        this.$axios.get('/employee/' + id).then(res => {
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
        if (this.form.employeeId == null || this.form.employeeId == '') {
          this.add();
          return;
        }
        this.$axios.put('/employee', this.form).then(res => {
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
        this.$axios.delete('/employee/' + id).then(res => {
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
        this.$axios.post('/employee', this.form).then(res => {
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
        this.getDefault()
        this.centerDialogVisible = true;
      },
      //取消弹窗
      cancel() {
        this.centerDialogVisible = false;
        this.form = {
          employeeId: '',
          employeeName: '',
          pwd: '',
          address: '',
          birthday: '',
          email: '',
          mobile: '',
          sex: '',
          userLevel: '',
          deptId: '',
          jobId: ''
        };
      },
      getDefault() {
        console.log("初始化")
        for (var i = 0; i < this.deptList.length; i++) {
          if (this.deptList[i].deptName == '无部门') {
            this.form.deptId = this.deptList[i].deptId;
            break;
          }
        }
        for (var i = 0; i < this.jobList.length; i++) {
          if (this.jobList[i].jobName == '无职位') {
            this.form.jobId = this.jobList[i].jobId;
            break;
          }
        }
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
      this.getDept();
      this.getJob();
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
    width: 100%;
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