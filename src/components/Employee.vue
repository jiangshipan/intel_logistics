<template>
    <div class="employee">
        <el-table :data="customer_list" style="width: 100%" border size="medium">
            <el-table-column prop="number" label="序号" width="180" align="center" type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180" align="center"></el-table-column>
            <el-table-column prop="real_name" label="真实姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="identity_type" label="人员类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button class="delete" type="danger" @click="doOption('此操作将把该员工从系统中删除, 是否继续?', scope.row.username)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import {base_url} from "../assets/js/base";
axios.defaults.withCredentials =true;


export default {
    name: 'Employee',
    data() {
        return {
           customer_list: [],
           get_customer_url: base_url + 'user/all',
           del_customer_url: base_url + 'user/del'
        }
    },
    mounted() {
        this.get_all_employees()
    },
    methods: {
      get_all_employees() {
        axios.get(this.get_customer_url + '?identity_type=1')
        .then(response => {
            var res = response.data;
            if (res.code != 0) {
                this.errorMsg(response.data.msg);
                return;
            }
            this.customer_list = res.data;
        })
        .catch(error => {
            this.errorMsg(error)
        }) 
      },
      delete_user(username) {
          axios.get(this.del_customer_url + '?username=' + username)
          .then(response => {
              var res = response.data;
              if (res.code == 0) {
                  this.get_all_employees();
                  this.successMsg('操作成功');
              } else {
                  this.errorMsg(res.msg);
              }
          }) 
          .catch(error => {
              this.errorMsg(error)
          })
      },
      doOption(msg, username) {
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete_user(username)
        }).catch(() => {
          this.successMsg('已取消')     
        });
      },
      successMsg(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
          duration: 2000
        });
      },
      errorMsg(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
          duration: 2000
        });
      },
      indexMethod(index) {
        return index + 1;
      }
    }
}
</script>

<style scoped>
  .input-container {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: 50px 0 10px 0;
  }
  .delete {
      width: 80px;
  }
  .block {
    margin: auto;
    width: 40%;
    margin-top: 10px;
  }

</style>