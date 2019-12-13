<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
            <el-table-column align="center" label="网关ID">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="名字">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="mac地址"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mac }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期"  align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.RegisterDate }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态"  align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="反馈电压"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.voltage }}</span>
        </template>
      </el-table-column>
            <el-table-column label="固件号"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.firmwarever }}</span>
        </template>
      </el-table-column>
            <el-table-column label="序列号"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serialnum }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios
        .post("/gatewaylist", {})
        .then(response => {
          this.list = response.data.result;
          this.listLoading = false
        })
    }
  }
}
</script>
