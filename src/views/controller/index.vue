<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:20px;margin-bottom:20px;">
      <el-input
        v-model="listQuery.name"
        placeholder="控制器名"
        style="width:200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button>
      <el-button class="filter-item" style="margin-left:10px;" type="primary" @click="handleCreate">
        <i class="el-icon-plus">添加控制器</i>
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="控制器ID">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="名字">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="站号">
        <template slot-scope="scope">{{ scope.row.station_address }}</template>
      </el-table-column>
      <el-table-column label="System Code">
        <template slot-scope="scope">{{ scope.row.system_code }}</template>
      </el-table-column>
      <el-table-column label="二次供水温度">
        <template slot-scope="scope">{{ scope.row.二次供水温度 }}</template>
      </el-table-column>
      <el-table-column label="一次回水温度">
        <template slot-scope="scope">{{ scope.row.一次回水温度 }}</template>
      </el-table-column>
      <el-table-column label="室外温度">
        <template slot-scope="scope">{{ scope.row.室外温度 }}</template>
      </el-table-column>
      <el-table-column label="循环泵状态">
        <template slot-scope="scope">{{ scope.row.循环泵状态 }}</template>
      </el-table-column>
      <el-table-column label="运行模式">
        <template slot-scope="scope">{{ scope.row.运行模式 }}</template>
      </el-table-column>
      <el-table-column label="报警代码">
        <template slot-scope="scope">{{ scope.row.报警代码 }}</template>
      </el-table-column>
      <el-table-column label="阀门设定开度">
        <template slot-scope="scope">{{ scope.row.阀门设定开度 }}</template>
      </el-table-column>
      <el-table-column label="一次回水温度设定值">
        <template slot-scope="scope">{{ scope.row.一次回水温度设定值 }}</template>
      </el-table-column>
      <el-table-column label="二次供水温度设定值">
        <template slot-scope="scope">{{ scope.row.二次供水温度设定值 }}</template>
      </el-table-column>
      <el-table-column label="夜间室内温度设定值">
        <template slot-scope="scope">{{ scope.row.夜间室内温度设定值 }}</template>
      </el-table-column>
      <el-table-column label="日间室内温度设定值">
        <template slot-scope="scope">{{ scope.row.日间室内温度设定值 }}</template>
      </el-table-column>
      <el-table-column label="时间按表运行室内温度设定值">
        <template slot-scope="scope">{{ scope.row.时间按表运行室内温度设定值 }}</template>
      </el-table-column>
      <el-table-column label="远程本地切换按钮">
        <template slot-scope="scope">{{ scope.row.远程本地切换按钮 }}</template>
      </el-table-column>
      <el-table-column label="设置超时时间">
        <template slot-scope="scope">{{ scope.row.设置超时时间 }}</template>
      </el-table-column>
      <el-table-column label="超时">
        <template slot-scope="scope">{{ scope.row.超时 }}</template>
      </el-table-column>
      <el-table-column label="lastdate">
        <template slot-scope="scope">{{ scope.row.lastdate }}</template>
      </el-table-column>
      <el-table-column label="registerDate">
        <template slot-scope="scope">{{ scope.row.registerDate }}</template>
      </el-table-column>
      <el-table-column label="serialnum">
        <template slot-scope="scope">{{ scope.row.serialnum }}</template>
      </el-table-column>
      <el-table-column label="firmwarever">
        <template slot-scope="scope">{{ scope.row.firmwarever }}</template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :title="dialogType==='edit'?'Edit Role':'添加'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="网关名称">
          <el-select
            v-model="role.gatewayid"
            filterable
            remote
            :remote-method="remoteMethod"
            placeholder="请选择"
          >
            <pagination
              v-show="optionTotal>0"
              :total="optionTotal"
              :page.sync="optionListQuery.page"
              :limit.sync="optionListQuery.limit"
              @pagination="fetchOptions"
            />
            <el-option
              v-for="item in optionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="test">
          <el-input v-model="role.gatewayid" placeholder="test" />
        </el-form-item> -->
        <el-form-item label="控制器">
          <el-input v-model="role.name" placeholder="控制器名称" />
        </el-form-item>
        <el-form-item label="站号">
          <el-input v-model="role.station_address" placeholder="站号" />
        </el-form-item>
        <!-- <el-select
          v-model="value"
          filterable
          remote
          :remote-method="remoteMethod"
          placeholder="请选择"
        >
          <pagination
            v-show="optionTotal>0"
            :total="optionTotal"
            :page.sync="optionListQuery.page"
            :limit.sync="optionListQuery.limit"
            @pagination="fetchOptions"
          />
          <el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>-->
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getList } from "@/api/table";

const defaultRole = {
  name: "",
  station_address: "",
  gatewayid:""
};

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      dialogVisible: false,
      dialogType: "new",
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      },

      optionListQuery: {
        page: 1,
        limit: 10,
        name: ""
      },
      value: [],
      loading: false,

      options: null,
      optionList: null,
      optionTotal: 0
    };
  },

  created() {
    this.fetchData();
    this.fetchOptions();
  },
  mounted() {
    // this.optionlist = this.states.map(item => {
    //   return { value: `value:${item}`, label: `label:${item}` };
    // });
  },
  methods: {
    remoteMethod(query) {
      let param;
      query === "" ? (param = {}) : (param = { name: query });
      this.$axios.post("/gatewaylist", this.optionListQuery).then(response => {
        this.optionList = response.data.result;
        this.optionTotal = response.data.total;
        this.role.gatewayid=value;
      });
    },

    fetchData() {
      this.$axios.post("/controllerlist", this.listQuery).then(response => {
        this.list = response.data.result;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    fetchOptions() {
      this.$axios.post("/gatewaylist", this.optionListQuery).then(response => {
        this.optionList = response.data.result;
        this.optionTotal = response.data.total;
      });
    },
    handleSearch() {
      this.fetchData();
    },
    handleCreate() {
      this.dialogVisible = true;
    },
    confirmRole() {
      this.$axios.post("/addcontroller", this.role);
      this.dialogVisible = false;
      this.fetchData();
    }
  }
};
</script>
