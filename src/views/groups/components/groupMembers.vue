<template>
  <div class="group-members">
    <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
      <el-table
        v-loading="loading"
        :data="memberList"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"/>
        <el-table-column
          prop="email"
          label="email"/>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"/>
        <el-table-column
          prop="phone"
          label="电话"/>
        <el-table-column
          fixed="right"
          label="成员管理">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleRemoveMember(scope.row)" >移除成员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-show="total>params.page_size" type="flex" justify="center" style="padding-top:20px;">
        <el-pagination
          :total="total"
          :page-size="params.page_size"
          :current-page.sync="params.page"
          background
          layout="total, prev, pager, next"
          @current-change="handleChange" />
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getGroupMemberList } from '@/api/group'
import { removeGroupMemberList } from '@/api/group'
export default {
  name: 'GroupMember',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gid: {
      type: Number,
      default: 0
    },
    gname: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      memberList: [],
      total: 0,
      params: {
        page: 1,
        page_size: 6
      }
    }
  },
  computed: {
    title() {
      return `${this.gname} 的成员列表`
    }
  },
  watch: {
    value(val) {
      if (val !== true) return
      this.visible = val
      this.params.page = 1
      this.fetchGroupMemberList()
    },
    gid(val) {
      if (val < 0) return
      this.groupId = val
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.$emit('fetch')
      setTimeout(() => {
        this.memberList = []
      }, 500)
    },
    fetchGroupMemberList() {
      this.loading = true
      if (this.memberList.length === 1 && this.params.page > 1) {
        this.$set(this.params, 'page', this.params.page - 1)
      }
      getGroupMemberList(this.gid, this.params).then(res => {
        this.memberList = res.results
        this.total = res.count
        console.log(res)
        this.loading = false
      })
    },
    handleChange(val) {
      this.params.page = val
      this.fetchGroupMemberList()
    },
    handleRemoveMember(obj) {
      removeGroupMemberList(this.gid, { uid: obj.id }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: `从 ${this.gname} 组中移除 ${obj.name} 成功`,
            type: 'success'
          })
          this.fetchGroupMemberList()
        } else {
          this.$message({
            message: `从 ${this.gname} 组中移除 ${obj.name} 失败: ${res.errmsg}`,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
