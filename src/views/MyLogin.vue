<template>
    <div>
        <el-alert type="success" center show-icon v-if="alert.success">{{alert.msg}}
        </el-alert>
        <el-input placeholder="请输入内容" v-model="name" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button type="primary" @click="logout">退出登陆</el-button>
        <span v-model="msg"></span>
    </div>
</template>
<style>
    .el-input--suffix .el-input__inner {
        padding-right: 30px;
        width: 300px;
    }
</style>
<script>
    export default {
        data() {
            return {
                name: '',
                pwd: "",
                msg: "",
                alert: {
                    success: false,
                    msg: ""
                }
            }
        },
        methods: {
            login() {
                var name = this.name;
                var pwd = this.pwd;

                console.log("login运行");
                const axios = require('axios');
                axios.get('/login/' + name + '/' + pwd)
                    .then((response) => {
                        // 处理成功情况
                        var Result = response.data
                        if (!Result.success) {
                            this.wrong(Result.errorMsg);
                        } else {
                            this.success("登陆成功")
                            //存入session中
                            window.sessionStorage.setItem("employee", JSON.stringify(Result.data))
                            console.log(Result);
                            this.msg = Result;
                        }
                    })
            },

            //登出
            logout(){
                this.$axios.get('/login').then(res=>{
                    var r=res.data;
                    if(!r.success){
                        this.wrong(r.errorMsg);
                    }else{
                        this.success("成功退出")
                    }
                })
            },

            success(msg) {
                this.$notify({
                    title: '成功',
                    message: msg,
                    type: 'success',
                });
            },

            wrong(msg) {
                this.$notify.error({
                    title: '错误',
                    message: msg,
                });
            }
        }
    }
</script>