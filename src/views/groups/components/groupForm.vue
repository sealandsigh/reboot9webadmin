<template>
  <div class="group-form-container">
    <el-dialog :visible.sync="visible" :title="title" @close="handleClose">
      <el-form ref="groupForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户组: " prop="name">
          <el-input v-model="form.name" placeholder="请输入用户组"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addGroup, modifyGroup } from '@/api/group'
export default {
  name: 'GroupForm',
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
      groupId: 0,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入组名字', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      if (this.groupId === 0) return '创建用户组'
      else return '修改用户组'
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    gid(val) {
      if (val < 0) return
      this.groupId = val
    },
    gname(val) {
      if (val === '') return
      this.form.name = val
    }
  },
  methods: {
    resetForm() {
      this.$refs.groupForm.resetFields()
      // 此处再思考
      if (this.groupId === 0) this.form.name = ''
      else this.form.name = this.gname
    },
    handleClose() {
      this.visible = false
      this.groupId = 0
      this.resetForm()
      // this.form.name = ''
      // 如果在这里设置name为空修改后是有作用，但是点击创建的重置之前的name还会过去
      this.$emit('input', false)
    },
    submitForm() {
      // console.log(this.form)
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.save()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    save() {
      if (this.groupId === 0) {
        this.create()
      } else {
        this.update()
      }
    },
    create() {
      addGroup(this.form).then(() => {
      // // 此代码为测试，当下面逻辑有问题时用这个才可以正常传递
      // addGroup({ 'name': this.form.name }).then(() => {
        this.$message({
          message: `添加用户组 ${this.form.name} 成功`,
          type: 'success'
        })
        this.handleClose()
        this.$emit('fetch')
      })
      // // 需要注意这块代码执行逻辑顺序有误，如果放在这里值无法正常传递，添加失败.
      // this.handleClose()
      // this.$emit('fetch')
    },
    update() {
      modifyGroup(this.groupId, this.form).then(() => {
        this.$message({
          message: `修改用户组 ${this.form.name} 成功`,
          type: 'success'
        })
        this.handleClose()
        this.$emit('fetch')
      })
    }
  }
}
</script>
