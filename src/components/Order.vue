<template>
    <div class="order">
        <el-table :data="order_list" style="width: 100%" border size="medium">
            <el-table-column prop="number" label="序号" width="180" align="center" type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="send_name" label="寄件人" width="180" align="center"></el-table-column>
            <el-table-column prop="send_telephone" label="寄件人电话" width="180" align="center"></el-table-column>
            <el-table-column prop="send_pos" label="寄件人位置" align="center"></el-table-column>
            <el-table-column prop="order_cost" label="订单消费" align="center"></el-table-column>
            <el-table-column prop="create_time" label="订单创建时间" align="center"></el-table-column>
            <el-table-column prop="status" label="订单是否完成" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import {base_url} from "../assets/js/base";
axios.defaults.withCredentials =true;


export default {
    name: 'Order',
    data() {
        return {
           order_list: [],
           get_all_orders_url: base_url + 'order/all',
        }
    },
    mounted() {
        this.get_all_orders()
    },
    methods: {
      get_all_orders() {
        axios.get(this.get_all_orders_url)
        .then(response => {
            var res = response.data;
            if (res.code != 0) {
                this.errorMsg(response.data.msg);
                return;
            }
            this.order_list = res.data;
        })
        .catch(error => {
            this.errorMsg(error)
        }) 
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