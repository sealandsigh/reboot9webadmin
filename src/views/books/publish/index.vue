<template>
  <div class="publish">
    <!--表格-->
    <publish-list :value="publishs" @edit="handleEdit" @delete="handleDelete"></publish-list>

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
  name: 'publish',
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
    handleEdit(value) {
      this.currentValue = { ...value } // 将子组件传来的值给父组件的变量，然后渲染表单
      console.log(this.currentValue)
      this.dialogVisibleForEdit = true
    }
  }
}
</script>
