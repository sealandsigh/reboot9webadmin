<template>
  <div class="publish">
    <div>
      <!--搜索-->
      <el-col :span="8">
        <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
      </el-col>

      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn">添加ES集群</el-button>
      </el-col>
    </div>

    <!--表格-->
    <escluster-list :value="esclusters" @edit="handleEdit" @delete="handleDelete"></escluster-list>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%">
      <escluster-form
        ref="esclusterForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </escluster-form>
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <escluster-form
        ref="esclusterForm"
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
import { getEsclusterList, createEscluster, updateEscluster, deleteEscluster } from '@/api/esmanager/escluster'
import EsclusterList from './table'
import EsclusterForm from './form'

export default {
  name: 'Escluster',
  components: {
    EsclusterList,
    EsclusterForm
  },
  /* 数据 */
  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      esclusters: [],
      totalNum: 0,
      pagesize: 10,
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
      getEsclusterList(this.params).then(res => {
        console.log(res)
        this.esclusters = res.results
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
      createEscluster(value).then(res => {
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
      this.$refs.esclusterForm.$refs.form.resetFields() // 清除掉子组件表单的数据
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
      updateEscluster(id, params).then(res => {
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
      this.$refs.esclusterForm.$refs.form.resetFields()
    },
    /* 删除 */
    handleDelete(id) {
      deleteEscluster(id).then(res => {
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
