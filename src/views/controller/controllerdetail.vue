<template>
  <div class="app-container">
    <el-tag>
      <router-link :to="'/devices/controllerdetail/'+result.id" class="link-type">
        <span>控制器</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/alarms?id='+id" class="link-type">
        <span>配置警报</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/notification?id='+result.id" class="link-type">
        <span>警报提醒</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/schema?id='+result.id" class="link-type">
        <span>schema</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/controllerconfig/'+result.id" class="link-type">
        <span>Configuration</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/controllercommand/'+result.id" class="link-type">
        <span>Command</span>
      </router-link>
    </el-tag>
    <el-tag>
      <router-link :to="'/devices/controllerstatistics/'+result.id" class="link-type">
        <span>Statistics</span>
      </router-link>
    </el-tag>

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
            <td>注册日期</td>
            <td>{{result.registerDate}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <router-link :to="'/devices/alarms?id='+result.id" class="link-type">
        <span>配置警报</span>
      </router-link>
      <router-link :to="'/devices/notification?id='+result.id" class="link-type">
        <span>警报提醒</span>
      </router-link>
      <router-link :to="'/devices/schema?id='+result.id" class="link-type">
        <span>schema</span>
      </router-link>
      <router-link :to="'/devices/controllerconfig/'+result.id" class="link-type">
        <span>Configuration</span>
      </router-link>
      <router-link :to="'/devices/controllercommand/'+result.id" class="link-type">
        <span>Command</span>
      </router-link>
      <router-link :to="'/devices/controllerstatistics/'+result.id" class="link-type">
        <span>Statistics</span>
      </router-link>-->
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
      displayname: "",
      id:0
    };
  },
  created() {
    this.id=this.$route.params.id;
    this.fetchData(this.id);
  },
  methods: {
    fetchData(id) {
      this.$axios.get("/controllerdetail?id=" + id).then(response => {
        this.result = response.data.result;
        this.listLoading = false;
      });
    },
    Manageuser() {
      alert("!");
    }
  }
};
</script>