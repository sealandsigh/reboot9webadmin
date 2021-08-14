<template>
  <div class="estopic-form">
    <el-form ref="form" :model="form" label-width="100px" class="demo-form">

      <el-form-item label="索引保留时间" prop="saveDay">
        <el-select v-model="form.saveDay" placeholder="索引保留时间选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
  name: 'EstopicForm',
  props: {
    form: { // 接受父组件传递过来的值渲染表单
      type: Object,
      default() {
        return {
          name: '',
          saveDay: ''
        }
      }
    }
  },

  data() {
    return {
      options: [{
        value: '5',
        label: '5天'
      }, {
        value: '7',
        label: '7天'
      }, {
        value: '10',
        label: '10天'
      }, {
        value: '14',
        label: '14天'
      }, {
        value: '20',
        label: '20天'
      }, {
        value: '25',
        label: '25天'
      }, {
        value: '30',
        label: '30天'
      }],
      saveDay: ''
    }
  },

  watch: {
    form(val) {
      this.saveDay = val.saveDay
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
.estopic-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>
