<template>
  <div class="estopic-list">
    <el-table
      :data="value"
      border
      stripe
      style="width: 100%"
      @sort-change="sortChange">

      <el-table-column
        label="ID"
        prop="id"
        width="40px">
      </el-table-column>

      <el-table-column
        label="索引名称"
        prop="name"
        width="290px">
      </el-table-column>

      <el-table-column
        label="索引保留时间"
        prop="saveDay"
        width="110px"
        sortable>
      </el-table-column>

      <el-table-column
        label="索引创建时间"
        prop="createTime"
        sortable="custom">
      </el-table-column>

      <el-table-column
        label="索引更新时间"
        prop="updateTime"
        sortable>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>

export default {
  name: 'EstopicList',
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
    },

    sortChange(column) {
      this.$emit('sort', column)
    }
  }
}
</script>

<style lang="scss">
  .el-table .cell {
    white-space: pre-line;
  }
</style>
