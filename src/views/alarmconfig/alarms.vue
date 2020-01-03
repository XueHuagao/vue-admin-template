<template>
  <div class="app-container">
    <h1>警报</h1>
    <div class="filter-container" style="margin-top:20px;margin-bottom:20px;">
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button> -->
      <el-button class="filter-item" style="margin-left:10px;" type="primary" @click="handleCreate">
        <i class="el-icon-plus">添加</i>
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
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="名字">
        <template slot-scope="{row}">
          <router-link :to="'/devices/gatewaydetail/'+row.id" class="link-type">
            <span>{{ row.description }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="设备" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gatewayname }}</span>
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
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
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
      // role: Object.assign({}, defaultRole),
      dialogVisible: false,
      dialogType: "new",
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
  methods: {
    fetchData() {
      this.$axios.get("/gatewayalarmlist", this.listQuery).then(response => {
        this.list = response.data.result;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleSearch() {
      this.fetchData();
    },
    handleCreate() {
      this.dialogVisible = true;
    },
    confirmRole() {
      this.$axios.post("/addGatewayapi", this.role);
      this.dialogVisible = false;
      this.fetchData();
    }
  }
};
</script>
