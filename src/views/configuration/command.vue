<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:20px;margin-bottom:20px;">
      <h1>Data</h1>
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
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="VALUE" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.numvalue }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="名字">
        <template slot-scope="{row}">
          <el-button type="primary" @click="sendCommand(row)">Edit</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="地址" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" @click="sendCommand(row)">Edit</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="'Edit'">
      <el-form :model="temp" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="value" v-if="temp.type==1">
              <el-input v-model="temp.numvalue" placeholder="value description" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="control" v-if="temp.type==2">
              <el-select v-model="temp.displayon" placeholder="update">
                <el-option
                  v-for="item in displayonoff"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
  updatemode: 2,
  type: 2,
  registernum: "",
  length: "",
  startvalue: "",
  endvalue: "",
  displayon: "",
  displayoff: "",
  Datatype: "",
  unit: "",
  controllerid: ""
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
      temp: {
        id: undefined,
        updatemode: 1,
        type: 1,
        numvalue: "",
        registernum: "",
        length: "",
        startvalue: "",
        endvalue: "",
        displayon: "",
        displayoff: "",
        Datatype: "",
        unit: "",
        controllerid: this.$route.params.id
      },
      dialogStatus: "Create",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      isDecimal: true,
      displayonoff: [
        {
          value: "1",
          label: "on"
        },
        {
          value: "2",
          label: "off"
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
      typevalue: "",
      datatypes: [
        {
          value: "1",
          label: "number"
        },
        {
          value: "2",
          label: "date"
        },
        {
          value: "3",
          label: "unknow"
        }
      ]
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

    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogVisible = true;
    },
    confirmRole() {
      // this.role.controllerid=this.$route.params.id;
      if (this.dialogStatus == "create") {
        this.$axios.post("/addcontrollerparam", this.temp);
      } else {
        this.$axios.post("/updatecontrollerparam", this.temp);
      }
      this.dialogVisible = false;
      this.fetchData(this.$route.params.id);
    },
    sendCommand(row) {
      this.temp = Object.assign({}, row);
      this.dialogVisible = true;
    }
  }
};
</script>