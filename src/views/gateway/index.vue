<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:20px;margin-bottom:20px;">
      <el-input
        v-model="listQuery.name"
        placeholder="网关名"
        style="width:200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button>
      <el-button class="filter-item" style="margin-left:10px;" type="primary" @click="handleCreate">
        <i class="el-icon-plus">添加网关</i>
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
      <el-table-column align="center" label="网关ID">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="名字">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="mac地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mac }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.RegisterDate }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="反馈电压" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.voltage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmwarever }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序列号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serialnum }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="网关名称">
          <el-input v-model="role.name" placeholder="网关名称" />
        </el-form-item>
        <el-form-item label="MAC地址">
          <el-input v-model="role.mac" placeholder="MAC地址"/>
        </el-form-item>
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
  name: '',
  mac:''
}

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
      dialogType: 'new',
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  // methods: {
  //   fetchData() {
  //     this.$axios({
  //       url:'/gatewaylist',
  //       method:'post',
  //       params:this.listQuery
  //     })
  //     .then(response => {
  //       this.list = response.data.result;
  //       this.listLoading = false;
  //     });
  //   }
  // }
  methods: {
    fetchData() {
      this.$axios.post("/gatewaylist", this.listQuery).then(response => {
        this.list = response.data.result;
        this.total = 100;
        this.listLoading = false;
      });
    },
    handleSearch() {
      this.fetchData();
      // alert("!");
    },
    handleCreate() {
      this.dialogVisible=true
    },
    confirmRole(){
      this.$axios.post("/addGatewayapi",this.role);
      this.dialogVisible=false;
      this.fetchData();
    }
  }
};
</script>
