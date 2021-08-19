<template>
  <div class="estopic">
    <div>
      <!--选择-->
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <el-select v-model="value" multiple clearable placeholder="集群筛选：-- ALL --" @change="searchEnv" @visible-change="fetchclusterName">
            <el-option
              v-for="item in options"
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
    <estopic-list :value="estopics" @edit="handleEdit" @delete="handleDelete" @sort="sortChange"></estopic-list>

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
import { getEsclusterList } from '@/api/esmanager/escluster'
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
      estmpList: [],
      searchList: [],
      dialogVisibleForAdd: false,
      dialogVisibleForEdit: false,
      currentValue: {},
      estopics: [],
      esclusters: [],
      searchEstopics: [],
      totalNum: 0,
      totalesNum: 0,
      pagesize: 10,
      params: {
        page: 1,
        search: '',
        ordering: '',
        cluster_include: '',
        page_size: ''
      },
      // options: [{
      //   value: 'testtest',
      //   label: 'testtest'
      // }, {
      //   value: 't-me-elk',
      //   label: 't-me-elk'
      // }, {
      //   value: 'd-appsearch-elk',
      //   label: 'd-appsearch-elk'
      // }],
      options: [],
      value: ''
    }
  },

  computed: {
  },

  // watch: {
  //   esclusters(val) {
  //     this.fetchclusterName()
  //   }
  // },

  // watch: {
  //   value(val) {
  //     if (this.value === '') {
  //       this.estopics = this.searchEstopics
  //     } else {
  //       this.estopics = this.searchEnv(val)
  //     }
  //   },
  //   valuePort(val) {
  //     if (this.valuePort === '') {
  //       this.estopics = this.searchEstopics
  //     } else {
  //       this.estopics = this.searchPort(val)
  //     }
  //   }
  // },

  /* 根据生命周期，调用接口初始化数据 */
  created() {
    this.fetchData(this.params)
    this.fetchclusterData()
  },

  /* 接口调用集 */
  methods: {

    /* 调用list接口，拉取数据 */
    async fetchData(params) {
      const { results, count } = await getTopicList(params)
      // console.log(results)
      this.searchEsclusters = this.estopics = results
      this.totalNum = count
      // getTopicList(params).then(res => {
      //   this.searchEsclusters = this.estopics = res.results
      //   this.totalNum = res.count
      // })
    },

    fetchclusterData() {
      getEsclusterList(this.params).then(res => {
        // console.log(res)
        this.esclusters = res.results
        this.totalesNum = res.count
      })
    },

    unique(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },

    fetchclusterName(val) {
      if (val === true) {
        console.log('True')
        if (parseInt(this.totalesNum) >= parseInt(this.esclusters.length)) {
          this.estmpList = []
          this.params.page_size = this.totalesNum
          console.log(this.params.page_size)
          // this.fetchclusterData().then(val => {
          //   console.log(this.esclusters)
          // })
          this.fetchclusterData()
          setTimeout(() => {
            console.log(this.esclusters)
            for (let index = 0; index < this.esclusters.length; index++) {
              this.estmpList.push(this.esclusters[index].code)
            }
            // console.log(this.estmpList)
            // console.log(this.unique(this.estmpList))
            for (let index = 0; index < this.unique(this.estmpList).length; index++) {
              var data = {
                value: this.estmpList[index],
                label: this.estmpList[index]
              }
              this.options.push(data)
            }
          }, 200)
        } else {
          console.log(this.totalesNum / this.esclusters.length)
          console.log(this.totalesNum)
          console.log(this.esclusters.length)
          console.log('small 1111')
        }
      } else {
        this.options = []
      }
    },

    /* 获取当前页码，并作为参数调用list接口 */
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData(this.params)
      // console.log(this.params.page)
    },
    searchClick() {
      this.fetchData(this.params)
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
        this.fetchData(this.params)
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
        this.fetchData(this.params)
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
        this.fetchData(this.params)
      },
      err => {
        console.log(err.message)
      })
    },
    searchEnv(val) {
      // var searchList = []
      // console.log(val)
      // console.log(val['length'])
      if (val['length'] === 0) {
        this.params.cluster_include = ''
        this.fetchData(this.params)
      } else {
        this.params.cluster_include = val.join(',')
        this.fetchData(this.params)
        // for (let index = 0; index < val.length; index++) {
        //   // console.log(val[index])
        //   this.params.cluster = val[index]
        //   console.log(val[index])
        //   getTopicList(this.params).then((res) => {
        //     if (res.results.length > 0) {
        //       this.searchList.push(res.results)
        //       val = []
        //       console.log(this.searchList)
        //     }
        //   })

        // if (data.results.length > 1) {
        //   searchList.push(data.results)
        // }
        // console.log(searchList)
        // getTopicList(this.params).then(res => {
        //   console.log(res.results, 88)
        //   searchList.push(this.estopics)
        // })
        // console.log(this.estopics)
        // }
      }
      // return this.estopics.filter(item => {
      //   if (item.env === val) {
      //     console.log(item)
      //     return item
      //   }
      // })
    },
    sortChange(column) {
      console.log(column)
      if (column) {
        if (column.prop === 'createTime' && column.order === 'ascending') {
          console.log(column.prop)
          console.log(column.order)
          this.params.ordering = 'createTime'
          getTopicList(this.params).then(res => {
            this.estopics = res.results
          })
        } else if (column.prop === 'createTime' && column.order === 'descending') {
          console.log(column.prop)
          console.log(column.order)
          this.params.ordering = '-createTime'
          getTopicList(this.params).then(res => {
            console.log(res)
            this.estopics = res.results
          })
        } else if (column.prop === null && column.order === null) {
          console.log(column.prop)
          console.log(column.order)
          this.params.ordering = ''
          getTopicList(this.params).then(res => {
            console.log(res)
            this.estopics = res.results
          })
        }
      }
    }
  }
}
</script>
