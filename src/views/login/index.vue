<template>
  <div class="logi-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录" class="page-nav-bar" />
       <!-- 登录表单 -->
       <van-form @submit="onSubmit">
        <van-field
        v-model="user.mobile"
        name="用户名"
        type="number"
        placeholder="请输入手机号"
        left-icon="smile-o"
        >
         <i slot="left-icon" class="iconfont icon-shouji"></i>
        </van-field>
        <van-field
        v-model="user.code"
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        >
         <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
          <template #button>
            <van-button class="send-sms-btn" size="small" round type="default">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取吧表单数据

      // 2、验证表单数据

      // 3、提交表单请求
      try {
        await login(this.user)
        console.log('登录成功！')
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logi-container {
  .iconfont {
    font-size: 37px;
  }
}
.send-sms-btn {
  background-color: #ededed;
  line-height: 46px;
  font-style: 12px;
  width: 162px;
  height: 46px;
  color: #666;
}

.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }

}
</style>
