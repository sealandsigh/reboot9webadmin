<template>
  <div class="escluster-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-form">

      <el-form-item label="集群名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入集群名称"></el-input>
      </el-form-item>

      <el-form-item label="集群code" prop="code">
        <el-input v-model="form.code" placeholder="请输入集群code"></el-input>
      </el-form-item>

      <el-form-item label="集群环境" prop="env">
        <el-input v-model="form.env" placeholder="请输入集群环境"></el-input>
      </el-form-item>

      <el-form-item label="集群ip地址" prop="clientIp">
        <el-input v-model="form.clientIp" placeholder="请输入集群ip地址"></el-input>
      </el-form-item>

      <el-form-item label="集群监控ip地址" prop="monitorIp">
        <el-input v-model="form.monitorIp" placeholder="请输入集群监控ip地址"></el-input>
      </el-form-item>

      <el-form-item label="集群端口" prop="port">
        <el-input v-model="form.port" placeholder="请输入集群端口"></el-input>
      </el-form-item>

      <el-form-item label="集群监控端口" prop="monitorPort">
        <el-input v-model="form.monitorPort" placeholder="请输入集群监控端口"></el-input>
      </el-form-item>

      <el-form-item label="集群索引保留时间" prop="saveDay">
        <el-input v-model="form.saveDay" placeholder="请输入集群索引保留时间"></el-input>
      </el-form-item>

      <el-form-item label="集群用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入集群用户名"></el-input>
      </el-form-item>

      <el-form-item label="集群密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入集群密码"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'EsclusterForm',
  props: {
    form: { // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          name: '',
          code: '',
          env: '',
          clientIp: '',
          monitorIp: '',
          port: '',
          monitorPort: '',
          saveDay: '',
          username: '',
          password: ''
        }
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入集群名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入集群code', trigger: 'blur' }
        ],
        env: [
          { required: true, message: '请输入集群环境', trigger: 'blur' }
        ],
        clientIp: [
          { required: true, message: '请输入集群ip地址', trigger: 'blur' }
        ],
        monitorIp: [
          { required: true, message: '请输入集群监控ip地址', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入集群端口', trigger: 'blur' }
        ],
        monitorPort: [
          { required: true, message: '请输入集群监控端口', trigger: 'blur' }
        ],
        saveDay: [
          { required: true, message: '请输入集群索引保留时间', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.form)
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang='scss' scoped>
.escluster-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>
