<template>
  <div class="app-container">
    <div class="col-md-10">
      <h3 class="navbar-text">设备信息</h3>
      <table class="table table-hover">
        <tbody>
          <tr>
            <td>名称</td>
            <td>{{result.name}}</td>
          </tr>
          <tr>
            <td>状态</td>
            <td>{{result.status}}</td>
          </tr>
          <tr>
            <td>序列号</td>
            <td>{{result.serialnum}}</td>
          </tr>
          <tr>
            <td>固件版本</td>
            <td>{{result.firmwarever}}</td>
          </tr>
          <tr>
            <td>IMSI</td>
            <td>{{result.IMSI}}</td>
          </tr>
          <tr>
            <td>IMEI</td>
            <td>{{result.IMEI}}</td>
          </tr>
          <tr>
            <td>最近出现</td>
            <td>{{result.lastdate}}</td>
          </tr>
          <tr>
            <td>注册日期</td>
            <td>{{result.registerDate}}</td>
          </tr>
        </tbody>
      </table>
      <el-button type="primary">主要按钮</el-button>
      <router-link :to="'/devices/alarmconfig?id='+result.id" class="link-type">
        <span>{{ result.name }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      },
      result: [],
      displayname: ""
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      // this.$axios.post("/gatewaylist", {})
      this.$axios.get("/gatewaydetails?id=" + id).then(response => {
        // this.list=response.data.result;
        // this.responseresult=JSON.stringify(response);

        this.result = response.data.result;
        this.listLoading = false;
      });
    },

    // fetchData() {
    //   this.$axios.post("/gatewaylist", this.listQuery).then(response => {
    //     this.list = response.data.result;
    //     this.total = response.data.total;
    //     this.listLoading = false;
    //   });
    // }
    configAlarm() {}
  }
};
</script>