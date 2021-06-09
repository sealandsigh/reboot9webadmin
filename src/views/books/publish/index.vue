<template>
  <div class="publish">
    <!--表格-->
    <publish-list :value="publishs" @edit="handleEdit" @delete="handleDelete"></publish-list>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <publish-form
        ref="publishForm"
        :form="currentValue"
        @submit="handleSubmitEdit"
        @cancel="handleCancelEdit" />
    </el-dialog>

    <!--分页-->
    <center>
      <el-pagination
        :page-size="pagesize"
        :total="totalNum"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange" />
    </center>
  </div>
</template>

<script>
/* 引入api，组件 */
import { getPublishList, createPublish, updatePublish, deletePublish } from '@/api/books/publish'
import PublishList from './table'
import PublishForm from './form'

export default {
  name: 'Publish',
  /* 注册组件 */
  components: {
    PublishList,
    PublishForm
  },
  /* 数据 */
  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      publishs: [],
      totalNum: 0,
      pagesize: 2,
      params: {
        page: 1,
        search: ''
      }
    }
  },

  /* 根据生命周期，调用接口初始化数据 */
  created() {
    this.fetchData()
  },

  /* 接口调用集 */
  methods: {

    /* 调用list接口，拉取数据 */
    fetchData() {
      getPublishList(this.params).then(res => {
        console.log(res)
        this.publishs = res.results
        this.totalNum = res.count
      })
    },

    /* 获取当前页码，并作为参数调用list接口 */
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
      // console.log(this.params.page)
    },
    searchClick() {
      this.fetchData()
    },

    /* 添加功能,弹出模态窗、提交数据、取消 */
    handleAddBtn() {
      this.dialogVisibleForAdd = true
    },
    handleSubmitAdd(value) {
      console.log(value)
      createPublish(value).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.publishForm.$refs.form.resetFields() // 清除掉子组件表单的数据
    },
    handleEdit(value) {
      this.currentValue = { ...value } // 将子组件传来的值给父组件的变量，然后渲染表单
      console.log(this.currentValue)
      this.dialogVisibleForEdit = true
    },
    handleSubmitEdit(value) {
      const { id, ...params } = value // 很神奇，能把表单的值拆解成自己想要的样子
      console.log(id)
      console.log(params)
      updatePublish(id, params).then(res => {
        this.$message({
          message: '更新组成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.publishForm.$refs.form.resetFields()
    },
    /* 删除 */
    handleDelete(id) {
      deletePublish(id).then(res => {
        this.$message({
          message: '删除组成功',
          type: 'success'
        })
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    }
  }
}
</script>
