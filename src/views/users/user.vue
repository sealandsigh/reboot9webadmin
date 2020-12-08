<template>
  <div>
    <el-row type="flex" justify="end" style="padding-right:20px;">
      <el-button type="primary" @click="addUserVisible=true">主要按钮</el-button>
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
    </el-table>
    <AddUserForm v-model="addUserVisible" @fetch="handleFetch" />
  </div>
</template>
<script>
import { getUserList, modifyUser } from '@/api/user'
import AddUserForm from './components/addUserForm'
export default {
  name: 'UserList',
  components: {
    AddUserForm
  },
  data() {
    return {
      userList: [],
      addUserVisible: false
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    fetchUserList() {
      getUserList().then(res => {
        this.userList = res.results
        console.log(res)
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
    }
  }
}
</script>