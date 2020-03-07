<template>
  <div class="send_order">
      <div class="ipt-container">
        <el-input v-model="send_name" placeholder="寄件人姓名"></el-input>
        <el-input v-model="send_telephone" placeholder="寄件人电话"></el-input>
        <el-input v-model="send_pos" placeholder="寄件人地址"></el-input>
      </div>
      <div class="ipt-container">
        <el-input v-model="receive_name" placeholder="收件人姓名"></el-input>
        <el-input v-model="receive_telephone" placeholder="收件人电话"></el-input>
        <el-input v-model="receive_pos" placeholder="收件人地址"></el-input>
      </div>
      <div class="ipt-container">
        <el-select class="send_type" v-model="send_type" placeholder="请选择寄件方式">
          <el-option
              v-for="item in send_types" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-time-select v-if="send_type == '预约上门'" v-model="appoint_time" :picker-options="{start: '08:00', step: '01:00', end: '21:00'}"
          placeholder="选择时间">
        </el-time-select><br>
      </div>
      <el-input v-model="goods_weight" placeholder="物品重量(kg)" @blur="get_order_cost()"></el-input>
      <p v-if="order_cost != ''">订单总消耗:{{order_cost}}元</p><br>
      <el-button id="do_order" type="primary" @click="do_order()">立即下单</el-button>
      <el-button id="clear_all" type="primary" @click="clear_all()">重置</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import {base_url} from "../assets/js/base";
export default {
  name: 'SendOrder',
  data () {
    return {
      send_types: [
        '预约上门', '自送'
      ],
      send_name: '',
      send_telephone: '',
      send_pos: '',
      receive_name: '',
      receive_telephone: '',
      receive_pos: '',
      send_type: '',
      appoint_time: '',
      goods_weight: '',
      order_cost: '',
      order_cost_url: base_url + 'order/cost',
      do_order_url: base_url + 'order/do'
    }
  },
  methods: {
      do_order() {  
        var send_name = this.send_name
        var send_telephone = this.send_telephone
        var send_pos = this.send_pos
        var receive_name = this.receive_name
        var receive_telephone = this.receive_telephone
        var receive_pos = this.receive_pos
        var send_type = this.send_type
        var appoint_time = this.appoint_time //不进行判断
        var goods_weight = this.goods_weight
        if (send_name == '' || send_telephone == '' || send_pos == '' || receive_name == '' || receive_telephone == '' || receive_pos == ''
        || send_type == '' || goods_weight == '') {
            this.errorMsg('相关参数不能为空')
            return
        }
        if (appoint_time != '') {
            appoint_time = this.dateToString(new Date()) + ' ' + appoint_time.split(':')[0] + ':' + appoint_time.split(':')[1] + ":00"
        }
        appoint_time = new Date(appoint_time).getTime()
        var data = {send_name: send_name, send_telephone: send_telephone, send_pos: send_pos, 
        receive_name: receive_name, receive_telephone: receive_telephone, receive_pos: receive_pos,
        appoint_type: send_type, goods_weight: goods_weight}
        if (send_type == '预约上门') {
            data.appoint_time = appoint_time
        }
        axios.post(this.do_order_url, data, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
          if (response.data.code != 0) {
            this.errorMsg(response.data.msg);
          } else {
            this.successMsg("下单成功");
            this.clear_all()
          }
        })
        .catch(error => {
          this.errorMsg(error);
        })
      },
      clear_all() {
          this.send_name = ''
          this.send_telephone = ''
          this.send_pos = ''
          this.receive_name = ''
          this.receive_telephone = ''
          this.receive_pos = ''
          this.send_type = ''
          this.appoint_time = ''
          this.goods_weight = ''
          this.order_cost = ''
      },
      get_order_cost() {
        var send_pos = this.send_pos
        var receive_pos = this.receive_pos
        var goods_weight = this.goods_weight
        if (send_pos == '') {
            this.errorMsg('寄件人地址不能为空')
            return
        }
        if (receive_pos == '') {
            this.errorMsg('收件人地址不能为空')
            return
        }
        if (goods_weight == '') {
            this.errorMsg('物品重量不能为空')
            return
        }
        var get_cost_url = this.order_cost_url + '?send_pos=' + send_pos + '&receive_pos=' + receive_pos + '&goods_weight=' + goods_weight
        axios.get(get_cost_url)
        .then(response => {
          if (response.data.code != 0) {
            this.errorMsg(response.data.msg);
          } else {
            this.order_cost = response.data.data
          }
        })
        .catch(error => {
          this.errorMsg(error);
        })
      },
      dateToString(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
          month = '0' + month;
        }
        if (day.length == 1) {
          day = '0' + day;
        }
        var datetime = year + '-' + month + '-' + day;
        return datetime;
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
      }
  }
}
</script>

<style scoped>
  .send_order {
    width: 300px;
  }
  .ipt-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
