<template>
  <div class="modify-user-form">
    <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
      <el-form ref="modifyUserForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="手机号: " prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUser } from '@/api/user'
export default {
  name: 'ModifyUser',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      form: {
        phone: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ]
      },
      uid: 0,
      title: '',
      userObj: ''
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    userId(val) {
      if (val === 0) return
      this.uid = val
      this.fetchUser()
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.resetForm()
      this.title = ''
    },
    resetForm() {
      this.$refs.modifyUserForm.resetFields()
      this.form.phone = this.userObj.phone
    },
    submitForm() {
    },
    fetchUser() {
      getUser(this.uid).then(res => {
        this.title = `修改 ${res.name} 的信息`
        this.userObj = res
        this.form.phone = res.phone
      })
    }
  }
}
</script>
