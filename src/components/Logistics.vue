<template>
    <div class="logistics">
        <el-table :data="logistics_list" style="width: 100%" border size="medium">
            <el-table-column prop="number" label="序号" width="100" align="center" type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="order_number" label="订单号" width="360" align="center"></el-table-column>
            <el-table-column prop="send_name" label="寄件人姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="send_name" label="寄件人姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="status" label="物流状态" width="180" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="check_info(scope.row.contents)">查看物流信息</el-button>
                    <el-button v-if="scope.row.status == '等待配送'" type="primary" @click="make(scope.row.order_number)">指派快递员</el-button>
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
    name: 'Logistics',
    data() {
        return {
           logistics_list: [],
           get_all_logistics_url: base_url + 'logistics/all',
           make_employee_to_deliver_url: base_url + 'logistics/make'
        }
    },
    mounted() {
        this.get_all_logistics()
    },
    methods: {
      get_all_logistics() {
        axios.get(this.get_all_logistics_url)
        .then(response => {
            var res = response.data;
            if (res.code != 0) {
                this.errorMsg(response.data.msg);
                return;
            }
            this.logistics_list = res.data;
        })
        .catch(error => {
            this.errorMsg(error)
        }) 
      },
      check_info(contents) {
        var html = ''
        for (var i = 0; i < contents.length; i++) {
            html = html.concat('<p>' + contents[i].content + '</p>')
        }
        this.$alert(html, '物流信息', {
            dangerouslyUseHTMLString: true,
            center: false
          });
      },
      make(order_number) {
        this.$alert('请输入快递员姓名',{
            center: true,
            showInput:true,
            inputValue: '',
            callback: (action, instance) => {
                var employee_name = instance.inputValue
                axios.get(this.make_employee_to_deliver_url + '?order_number=' + order_number + '&employee_name=' + employee_name)
                .then(response => {
                    var res = response.data;
                    if (res.code != 0) {
                        this.errorMsg(response.data.msg);
                        return;
                    }
                    this.successMsg('指派成功')
                    this.get_all_logistics()
                })
                .catch(error => {
                    this.errorMsg(error)
                }) 
            }
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
  .block {
    margin: auto;
    width: 40%;
    margin-top: 10px;
  }

</style>