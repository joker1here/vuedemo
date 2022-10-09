<template>
  <div id="app">
    <el-header style="text-align: right; font-size: 12px" >
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看<a href="../public/Coding Cat _ Nyan Cat's cousin who is listening to lo-fi.html">111</a></el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container style=" height: max-content; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            

              <router-link to="/employee">
                <el-menu-item index="1-1" >员工</el-menu-item>
              </router-link>

              <router-link to="/dept">
                <el-menu-item index="1-2" >部门</el-menu-item>
              </router-link>


              <router-link to="/job">
                <el-menu-item index="1-3">职位</el-menu-item>
              </router-link>

              <router-link to="/work">
                <el-menu-item index="1-4">任务</el-menu-item>
              </router-link>

              <router-link to="/login">
                <el-menu-item index="1-5">登陆页面</el-menu-item>
              </router-link>

            
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>