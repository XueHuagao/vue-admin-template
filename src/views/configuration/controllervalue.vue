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
              <el-select v-model="role.updatemode" placeholder="update">
                <el-option
                  v-for="item in updates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="type">
              <el-select v-model="role.type" @change="changetype">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Address">
              <el-input v-model="role.registernum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="length">
              <el-input v-model="role.length" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="min" v-if="isDecimal">
              <el-input v-model="role.startvalue" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="max" v-if="isDecimal">
              <el-input v-model="role.endvalue" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="displayon" v-if="!isDecimal">
              <el-input v-model="role.displayon" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="displayoff" v-if="!isDecimal">
              <el-input v-model="role.displayoff" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Data type" v-if="isDecimal">
              <el-input v-model="role.Datatype" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Unit" v-if="isDecimal">
              <el-input v-model="role.unit" />
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
  updatemode: "",
  type:"",
  registernum:"",
  length:"",
  startvalue:"",
  endvalue:"",
  displayon:"",
  displayoff:"",
  Datatype:"",
  unit:"",
  controllerid:""
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
      },
      isDecimal: true,
      updates: [
        {
          value: "1",
          label: "every minute"
        },
        {
          value: "2",
          label: "all 15 Minutes"
        },
        {
          value: "3",
          label: "all 24 Hours"
        }
      ],
      updatevalue: "",
      types: [
        {
          value: "1",
          label: "holding register"
        },
        {
          value: "2",
          label: "coil"
        }
      ],
      typevalue: ""
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
      this.role.controllerid=this.$route.params.id;
      this.$axios.post("/addGatewayapi", this.role);
      this.dialogVisible = false;
      this.fetchData();
    },
    changetype() {
      if (this.role.type == 2) {
        this.isDecimal = false;
      } else {
        this.isDecimal = true;
      }
    }
  }
};
</script>