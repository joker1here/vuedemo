<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane label="我的任务" name="first" v-cloak>
                <!-- 表单 -->
                <el-table :data="tableData" stripe style="width: 100%" key="workId" v-loading="loading"
                    v-if="activeName === 'first'">
                    <el-table-column prop="workId" label="id">
                    </el-table-column>
                    <el-table-column prop="workText" label="任务内容">
                    </el-table-column>
                    <el-table-column prop="workTime" label="任务截止时间">
                    </el-table-column>
                    <el-table-column prop="workFinish" label="任务进度">
                    </el-table-column>
                    <el-table-column prop="employee.employeeName" label="发布者">
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" circle @click="getOne(scope.row.workId)"
                                :disabled="me.userLevel<=scope.row.userLevel"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我发布的任务" name="second" v-cloak>
                <el-button type="primary" @click="open">发布任务</el-button>
                <!-- 表单 -->
                <el-table :data="tableData" stripe style="width: 100%" key="workId" v-loading="loading"
                    v-if="activeName === 'second'">
                    <el-table-column prop="workId" label="id">
                    </el-table-column>
                    <el-table-column prop="workText" label="任务内容">
                    </el-table-column>
                    <el-table-column prop="workTime" label="任务截止时间">
                    </el-table-column>
                    <el-table-column prop="workFinish" label="任务进度">
                    </el-table-column>
                    <el-table-column prop="workToEmployee.employeeName" label="接收者">
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" circle @click="getOne(scope.row.workId)"
                                :disabled="me.userLevel<=scope.row.userLevel"></el-button>
                            <el-popconfirm confirm-button-text='是的' cancel-button-text='不了' icon="el-icon-info"
                                icon-color="red" @confirm='del(scope.row.workId)' title="确定删除吗？">
                                <el-button slot="reference" type="danger" icon="el-icon-delete" circle
                                    :disabled='me.userLevel<=scope.row.userLevel'></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage" :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 修改弹窗 -->
        <el-dialog title="详情" :visible.sync="centerDialogVisible" width="50%" center>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="id">
                    <el-input v-model="form.workId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="任务内容">
                    <el-input v-model="form.workText" type="textarea" :disabled="activeName==='first'"></el-input>
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.workTime" style="width: 100%;"
                            :disabled="activeName==='first'">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="任务进度">
                    <el-slider v-model="form.workFinish" show-input>
                    </el-slider>
                </el-form-item>
                <el-form-item label="部门" v-if="activeName==='second'">
                    <el-select v-model="deptId" placeholder="请选择部门" @change="changeDept">
                        <el-option v-for="item in deptList" :key="item.deptId" :label="item.deptName"
                            :value="item.deptId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" v-if="activeName==='second'">
                    <el-select v-model="jobId" placeholder="请选择职位" @change="changeJob">
                        <el-option v-for="item in jobList" :key="item.jobId" :label="item.jobName" :value="item.jobId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收者" v-if="activeName==='second'">
                    <el-select v-model="form.workTo" filterable remote reserve-keyword
                        :placeholder="form.workToEmployee.employeeName" :remote-method="remoteMethod"
                        :loading="selectLoading" @change="changeEmployee">
                        <el-option v-for="item in employeeList" :key="item.employeeId" :label="item.employeeName"
                            :value="item.employeeId">
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
                addFlag: false,
                me: "",
                deptList: '',
                deptId: '',
                jobList: '',
                jobId: '',
                employeeList: '',
                selectData: {
                    workId: '',
                    workTime: '',
                    employeeId: '',
                    workTo: '',
                    workText: '',
                    workFinish: '',
                    employee: '',
                    workToEmployee: ''
                },
                tableData: [],
                pagination: {
                    pageSize: 5,
                    currentPage: 1,
                    total: 0
                },
                form: {
                    workId: '',
                    workTime: '',
                    employeeId: '',
                    workTo: '',
                    workText: '',
                    workFinish: '',
                    employee: '',
                    workToEmployee: ''
                },
                centerDialogVisible: false,
                loading: true,
                selectLoading: false,
                activeName: 'first'
            }
        },
        methods: {
            //职位变化时
            changeJob() {
                this.form.workTo = '';
                this.form.workToEmployee.employeeName = '';
                //this.getEmployeeList();
                this.filterEmployee();
            },
            //部门变化
            changeDept() {
                this.form.workTo = '';
                this.form.workToEmployee.employeeName = '';
                //this.getEmployeeList();
                this.filterEmployee();
            },
            //
            changeEmployee() {
                this.getEmployee(this.form.workTo);
                // this.deptId=this.employee.dept.deptId;
                // this.jobId=this.employee.job.jobId
                this.selectLoading = true;
            },
            //获取部门列表
            getDept() {
                this.$axios.get('/dept').then(res => {
                    var r = res.data;
                    console.log("部门列表：" , r);
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
                    console.log("职位列表：" , r);
                    if (!r.success) {
                        //this.wrong(r.errorMsg)
                    } else {
                        this.jobList = r.data;
                    }
                })
            },
            //查找所有员工
            getAllEmployee() {
                this.$axios.get('/employee').then(res => {
                    var r = res.data;
                    console.log("员工列表：" , r);
                    if (!r.success) {
                        //this.wrong(r.errorMsg)
                    } else {
                        this.list = r.data;
                    }
                })
            },
            //按id查员工
            getEmployee(id) {
                this.$axios.get('/employee/'+id).then(res => {
                    var r = res.data;
                    console.log("职位列表：" , r);
                    if (!r.success) {
                        //this.wrong(r.errorMsg)
                    } else {
                        this.employee = r.data;
                    }
                })
            },

            //分页
            getList() {
                //axios
                var workText = this.selectData.workText;
                var http = '';
                if (this.activeName == 'first') {
                    http += '/receiveWork/';
                } else {
                    http += '/sendWork/';
                }
                http += this.pagination.currentPage
                    + '/' + this.pagination.pageSize + '?q';
                if (workText != null && workText != '')
                    http += '&workText=' + workText;

                console.log(http)
                this.$axios.get(http).then((response) => {
                    // 处理成功情况
                    console.log("分页数据：{}" , response.data.data.current);
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
                var http = '';
                if (this.activeName == 'first') {
                    http += '/receiveWork/';
                } else {
                    http += '/sendWork/';
                }
                this.$axios.get(http + id).then(res => {
                    var r = res.data;
                    if (!r.success) {
                        this.wrong(r.errorMsg)
                    } else {
                        this.centerDialogVisible = true;
                        this.form = r.data;
                        this.deptId = this.form.workToEmployee.dept.deptId;
                        this.jobId = this.form.workToEmployee.job.jobId;
                        //this.getEmployeeList();
                        this.employeeList=r.data;
                    }
                })
            },
            //改一个
            change() {
                var http = '';
                if (this.activeName == 'first') {
                    http += '/receiveWork/';
                } else {
                    http += '/sendWork/';
                }
                if (this.form.workId == null || this.form.workId == '') {
                    this.add();
                    return;
                }
                this.$axios.put(http, this.form).then(res => {
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
                var http = '';
                if (this.activeName == 'first') {
                    http += '/receiveWork/';
                } else {
                    http += '/sendWork/';
                }
                this.$axios.delete(http + id).then(res => {
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
                var http = '';
                if (this.activeName == 'first') {
                    http += '/receiveWork/';
                } else {
                    http += '/sendWork/';
                }
                this.$axios.post(http, this.form).then(res => {
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
            //切换页面事件
            handleClick(tab, event) {
                this.loading = true;
                this.getList();
                console.log(tab, event);
            },
            //员工查找匹配
            remoteMethod(query) {
                if (query !== '') {
                    this.selectLoading = true;
                    setTimeout(() => {
                        this.filterEmployee(query);
                        //按名字查询
                        //this.getEmployeeList(query);
                    }, 200);
                } else {
                    this.employeeList = [];
                }
            },
            //过滤
            filterEmployee(query){
                this.selectLoading = false;
                var list = this.list;
                this.employeeList = list.filter(item => {
                    if(query==''||query==null){
                        return item.dept.deptId === this.deptId &&
                        item.job.jobId === this.jobId;
                    }
                    
                    return item.employeeName.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1 &&
                        item.dept.deptId === this.deptId &&
                        item.job.jobId === this.jobId;
                }); 
            },
            //按条件查询员工结果
            //暂时不需要用到，使用过滤器，减少对数据库的访问量
            getEmployeeList(employeeName) {
                //axios

                var deptId = this.deptId;
                var jobId = this.jobId;
                var http = '/employee/1/10?q';
                if (employeeName != null && employeeName != '')
                    http += '&employeeName=' + employeeName;
                if (deptId != null && deptId != '' && deptId != 0)
                    http += '&deptId=' + deptId;
                if (jobId != null && jobId != '' && jobId != 0)
                    http += '&jobId=' + jobId;
                console.log(http)
                this.$axios.get(http).then((response) => {
                    // 处理成功情况
                    console.log("分页数据：{}" , response.data);
                    var r = response.data;
                    if (!r.success) {
                        this.wrong(r.errorMsg)
                    } else {
                        this.loading = false;
                        this.employeeList = r.data.records
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
                    workId: '',
                    workTime: '',
                    employeeId: '',
                    workTo: '',
                    workText: '',
                    workFinish: '',
                    employee: '',
                    workToEmployee: ''
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
            this.getDept();
            this.getJob();
            this.getAllEmployee();
            //this.getEmployeeList();
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