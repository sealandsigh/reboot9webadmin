<template>
  <div class="estopic">
    <div>
      <!--选择-->
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-select v-model="value" clearable placeholder="环境筛选：-- ALL --">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-select v-model="valuePort" clearable placeholder="端口筛选：-- ALL --">
            <el-option
              v-for="item in optionsPort"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <!--搜索-->
        <el-col :span="6">
          <el-input v-model="params.search" placeholder="搜索" @keyup.enter.native="searchClick">
            <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
          </el-input>
        </el-col>

        <!--添加按钮-->
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="handleAddBtn">添加ES集群</el-button>
        </el-col>
      </el-row>
    </div>

    <!--表格-->
    <estopic-list :value="estopics" @edit="handleEdit" @delete="handleDelete"></estopic-list>

    <!--模态窗增加表单-->
    <el-dialog
      :visible.sync="dialogVisibleForAdd"
      title="添加"
      width="50%">
      <estopic-form
        ref="estopicForm"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd">
      </estopic-form>
    </el-dialog>

    <!--模态窗更新表单-->
    <el-dialog
      :visible.sync="dialogVisibleForEdit"
      title="更新"
      width="50%">
      <estopic-form
        ref="estopicForm"
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
import { getTopicList, createTopic, updateTopic, deleteTopic } from '@/api/esmanager/indexmanager'
import EstopicList from './table'
import EstopicForm from './form'

export default {
  name: 'Escluster',
  components: {
    EstopicList,
    EstopicForm
  },
  /* 数据 */
  data() {
    return {
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      estopics: [],
      searchEstopics: [],
      totalNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        search: ''
      },
      options: [{
        value: 'test',
        label: 'test'
      }, {
        value: 'stg',
        label: 'stg'
      }, {
        value: 'prod',
        label: 'prod'
      }],
      optionsPort: [{
        value: '9200',
        label: '9200'
      }, {
        value: '9300',
        label: '9300'
      }, {
        value: '1',
        label: '1'
      }],
      value: '',
      valuePort: ''
    }
  },

  watch: {
    value(val) {
      if (this.value === '') {
        this.estopics = this.searchEstopics
      } else {
        this.estopics = this.searchEnv(val)
      }
    },
    valuePort(val) {
      if (this.valuePort === '') {
        this.estopics = this.searchEstopics
      } else {
        this.estopics = this.searchPort(val)
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
      getTopicList(this.params).then(res => {
        console.log(res)
        this.searchEsclusters = this.estopics = res.results
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
      const { id, ...params } = value
      console.log(id)
      createTopic(value).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.handleCancelAdd()
        this.fetchData()
      },
      err => {
        console.log(err.response)
        this.$message({
          message: `创建 ${params.code} 失败: ${err.response.request.response}`,
          type: 'error',
          duration: 5000
        })
      })
    },
    handleCancelAdd() {
      this.dialogVisibleForAdd = false
      this.$refs.estopicForm.$refs.form.resetFields() // 清除掉子组件表单的数据
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
      updateTopic(id, params).then(res => {
        this.$message({
          message: '更新ES集群成功',
          type: 'success'
        })
        this.handleCancelEdit()
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    },
    handleCancelEdit() {
      this.dialogVisibleForEdit = false
      this.$refs.estopicForm.$refs.form.resetFields()
    },
    /* 删除 */
    handleDelete(id) {
      deleteTopic(id).then(res => {
        this.$message({
          message: '删除ES集群成功',
          type: 'success'
        })
        this.fetchData()
      },
      err => {
        console.log(err.message)
      })
    },
    searchEnv(val) {
      return this.estopics.filter(item => {
        if (item.env === val) {
          console.log(item)
          return item
        }
      })
    },
    searchPort(val) {
      return this.estopics.filter(item => {
        if (item.port === parseInt(val)) {
          console.log(item)
          return item
        }
      })
    }
  }
}
</script>
