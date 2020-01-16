<template>
  <div class="app-container">
    <h1>statistics</h1>
    <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button> -->
    <div id="myChart" :style="{width: '1600px', height: '600px'}"></div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      },
      xdata: [],
      ydata: "",
      hehe: ""
    };
  },
  created() {
    //  this.fetchData();
    // this.drawLine();
    // this.handleSearch();
  },
  mounted() {
    // this.fetchData();
    this.drawLine();
  },
  methods: {
    fetchData() {
      this.$axios
        .post("/controllermsgvaluelist", this.listQuery)
        .then(response => {
          this.ydata = response.data.result;
        });
    },

    async drawLine() {
      await this.$axios
        .post("/controllermsgvaluelist", this.listQuery)
        .then(response => {
          this.ydata = response.data.result;
        });

      await this.$axios
      .post("/controllermsgdatelist",this.listQuery)
      .then(response=>{
        this.xdata=response.data.result;
      });

      // await this.fetchData();

      console.log(this.ydata);

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));

      var option = {
        // title: { text: "试试" },
        tooltip: {},
        xAxis: {
          // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          data: this.xdata
        },
        yAxis: {},
        series: [
          {
            name: "温度",
            type: "bar",
            // data: [5, 20, 36, 10, 10, 20],
            data: this.ydata
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>