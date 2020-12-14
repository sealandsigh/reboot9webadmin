<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-input v-model="params.username" placeholder="搜索用户名" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button type="primary" @click="addUserVisible=true">主要按钮</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="日期"/>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"/>
      <el-table-column
        prop="phone"
        label="电话"/>
      <el-table-column
        prop="email"
        label="邮件"/>
      <el-table-column
        prop="is_active"
        label="账户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_active" @change="handleUserStatusChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="最后登录时间"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleModify(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-show="total>10" type="flex" justify="center" style="padding-top:20px;">
      <el-pagination
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="handleChange" />
    </el-row>
    <AddUserForm v-model="addUserVisible" @fetch="handleFetch" />
    <ModifyUser v-model="modifyUserVisible" :user-id="userId" @fetch="handleFetch" />
  </div>
</template>
<script>
import { getUserList, modifyUser } from '@/api/user'
import AddUserForm from './components/addUserForm'
import ModifyUser from './components/modifyUser'
export default {
  name: 'UserList',
  components: {
    AddUserForm,
    ModifyUser
  },
  data() {
    return {
      userList: [],
      addUserVisible: false,
      modifyUserVisible: false,
      userId: 0,
      total: 0,
      params: {
        page: 1,
        username: ''
      }
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    fetchUserList() {
      getUserList(this.params).then(res => {
        this.userList = res.results
        console.log(res)
        this.total = res.count
      })
    },
    handleUserStatusChange(obj) {
      modifyUser(obj.id, { is_active: obj.is_active }).then(res => {
        this.$message({
          message: `修改 ${obj.name} 的状态成功`,
          type: 'success'
        })
      })
    },
    handleFetch() {
      this.fetchUserList()
    },
    handleModify(obj) {
      this.userId = obj.id
      this.modifyUserVisible = true
    },
    handleChange(val) {
      this.params.page = val
      this.fetchUserList()
    },
    handleSearch(val) {
      this.params.page = 1
      this.fetchUserList()
    }
  }
}
</script>
