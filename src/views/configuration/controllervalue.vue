<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:20px;margin-bottom:20px;">
      <el-button class="filter-item" style="margin-left:10px;" type="primary" @click="handleCreate">
        <i class="el-icon-plus"></i>
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
      <el-table-column label="名字">
        <template slot-scope="{row}">
          <router-link :to="'/devices/gatewaydetail/'+row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">{{ scope.row.registernum }}</template>
      </el-table-column>
      <el-table-column label="长度" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updatemode }}</span>
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

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'Edit Role':'Define value'"
    >
      <el-form :model="role" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="name">
              <el-input v-model="role.name" placeholder="value description" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="update">
              <el-input v-model="role.mac" placeholder="MAC地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="type">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Address">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="length">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="min">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="max">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Data type">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Unit">
              <el-input v-model="role.type" />
            </el-form-item>
          </el-col>
        </el-row>
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
  mac: ""
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
        id: this.$route.params.id
      }
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      this.$axios.get("/controllerconfig?id=" + id).then(response => {
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