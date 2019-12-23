<template>
  <div class="app-container">
    
 
    <div class="col-md-10">
    <h3 class="navbar-text">控制器信息</h3>
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
            <td>注册日期
            </td>
            <td>{{result.registerDate}}</td>
        </tr>
        </tbody>
    </table>
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
      result:[],
      displayname:""
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
        this.$axios.get("/gatewaydetails?id=92")
        .then(response=>{    
            this.result=response.data.result;
            this.listLoading=false;
        });
    }


  }
};
</script>