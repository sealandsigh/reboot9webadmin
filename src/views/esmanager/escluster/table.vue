<template>
  <div class="escluster-list">
    <el-table
      :data="value"
      border
      stripe
      style="width: 100%">

      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>

      <el-table-column
        label="集群名称"
        prop="name">
      </el-table-column>

      <el-table-column
        label="集群code"
        prop="code">
      </el-table-column>

      <el-table-column
        label="环境"
        prop="env">
      </el-table-column>

      <el-table-column
        label="集群ip地址"
        prop="clientIp">
      </el-table-column>

      <el-table-column
        label="监控ip地址"
        prop="monitorIp">
      </el-table-column>

      <el-table-column
        label="集群端口"
        prop="port">
      </el-table-column>

      <el-table-column
        label="集群监控端口"
        prop="monitorPort">
      </el-table-column>

      <el-table-column
        label="索引默认保留天数"
        prop="saveDay">
      </el-table-column>

      <el-table-column
        label="集群用户名"
        prop="username">
      </el-table-column>

      <el-table-column
        label="集群密码"
        prop="password">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'EsclusterList',
  // props: ['value'],
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    /* 点击编辑按钮，将子组件的事件传递给父组件 */
    handleEdit(value) {
      this.$emit('edit', value)
    },

    /* 删除 */
    handleDelete(escluster) {
      const id = escluster.id
      const name = escluster.name
      this.$confirm(`此操作将删除: ${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
