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
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
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

    <el-dialog :visible.sync="dialogVisible" :title="textMap[dialogStatus]">
      <el-form :model="temp" label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="name">
              <el-input v-model="temp.name" placeholder="value description" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="update">
              <el-select v-model="temp.updatemode" placeholder="update">
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
              <el-select v-model="temp.type" @change="changetype">
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
              <el-input v-model="temp.registernum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="length">
              <el-input v-model="temp.length" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="min" v-if="temp.type == 1">
              <el-input v-model="temp.startvalue" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="max" v-if="temp.type == 1">
              <el-input v-model="temp.endvalue" />
            </el-form-item>
          </el-col>
<!--displayon off 先隐藏了 这就是个弱智设计-->
          <el-col :span="8">
            <el-form-item label="displayon" v-if="temp.type == 6">
              <el-input v-model="temp.displayon" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="displayoff" v-if="temp.type == 6">
              <el-input v-model="temp.displayoff" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Data type" v-if="temp.type == 1">
              <el-input v-model="temp.Datatype" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Unit" v-if="temp.type == 1">
              <el-input v-model="temp.unit" />
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
    handleSearch() {
      this.fetchData();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        updatemode: "1",
        type: "1",
        registernum: "",
        length: "",
        startvalue: "",
        endvalue: "",
        displayon: "",
        displayoff: "",
        Datatype: "",
        unit: "",
        controllerid: this.$route.params.id
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogVisible = true;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      console.log(this.temp.id);
      this.dialogStatus = "update";
      this.dialogVisible = true;
    },
    confirmRole() {
      // this.role.controllerid=this.$route.params.id;
      if (this.dialogStatus == "create") {
        this.$axios.post("/addcontrollerparam", this.temp);
      } else {
        this.$axios.post("/updatecontrollerparam",this.temp);
      }
      this.dialogVisible = false;
      this.fetchData(this.$route.params.id);
    },
    // confirmRole(){
    //   this.$axios.post("/addGatewayapi",this.role);
    //   this.dialogVisible=false;
    //   this.fetchData();
    // },
    changetype() {
      if (this.temp.type == 2) {
        this.isDecimal = false;
      } else {
        this.isDecimal = true;
      }
    }
  }
};
</script>