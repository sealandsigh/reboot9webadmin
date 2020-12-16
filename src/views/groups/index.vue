<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-input v-model="params.name" placeholder="搜索用户组" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button type="primary" @click="groupFormVisible=true">增加用户组</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="groupData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"/>
      <el-table-column
        prop="name"
        label="组名"
        width="180"/>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
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
    <GroupForm v-model="groupFormVisible" @fetch="handleFetch" />
  </div>
</template>
<script>
import { getGroupList } from '@/api/group'
import GroupForm from './components/groupForm'
export default {
  name: 'Groups',
  components: {
    GroupForm
  },
  data() {
    return {
      groupData: [],
      total: 0,
      params: {
        page: 1,
        name: ''
      },
      groupFormVisible: false,
      groupId: 0
    }
  },
  created() {
    this.fetchGroupList()
  },
  methods: {
    fetchGroupList() {
      getGroupList(this.params).then(res => {
        this.groupData = res.results
        this.total = res.count
        console.log(res)
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchGroupList()
    },
    handleSearch(val) {
    },
    handleFetch() {
      this.params.page = 1
      this.groupId = 0
      this.fetchGroupList()
    }
  }
}
</script>
