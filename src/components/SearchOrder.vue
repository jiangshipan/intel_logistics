<template>
  <div class="search_order">
    <div>
      <el-input placeholder="请输入寄件人电话或订单编号查询物流信息" v-model="order_number" class="order_number_input">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div><br>
    <p v-if="order_infos.length != 0">您的物流信息如下:</p>
    <br><br>
    <div v-for="(order_info, index) in order_infos" :key="index">
      <el-timeline>
        当前物流快递编号: {{order_info.order_number}}<br>
        <el-timeline-item v-for="(contnet, index) in order_info.contents" :key="index" :color="contnet.color">
        {{contnet.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {base_url} from "../assets/js/base";
export default {
  name: 'SearchOrder',
  data () {
    return {
      order_number: '',
      search_url: base_url + 'logistics/get',
      order_infos: []
    }
  },
  methods: {
      search() {
        if (this.order_number == '') {
          this.errorMsg("寄件人手机号或快递编号必填其一")
          return
        }
        axios.get(this.search_url + '?order_number=' + this.order_number)
        .then(response => {
          if (response.data.code != 0) {
            this.errorMsg(response.data.msg);
          } else {
            this.order_infos = response.data.data
            for (var i = 0; i < this.order_infos.length; i++) {
              this.order_infos[i].contents[0].color = '#0bbd87'
            }
            if (this.order_infos.length == 0) {
              this.errorMsg("暂无相关物流信息")
            } else {
              this.successMsg("查询成功");
            }
          }
        })
        .catch(error => {
          this.errorMsg(error);
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
      }
  }
}
</script>

<style scoped>
.order_number_input {
  width: 300px
}
.search_order {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 800px;
}
</style>
