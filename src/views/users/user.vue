<template>
  <div>
    <el-table
      :data="userList"
      stripe="true"
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
          <span v-if="scope.row.is_active">正常</span>
          <span v-else >禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="最后登录时间"/>
    </el-table>
  </div>
</template>
<script>
import { getUserList } from '@/api/user'
export default {
  name: 'UserList',
  data() {
    return {
      userList: []
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
    }
  }
}
</script>
