<template>
  <div class="logi-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录" class="page-nav-bar">
        <van-icon slot="left" name="cross" @click="$router.back()"/>
      </van-nav-bar>
       <!-- 登录表单 -->
       <van-form @submit="onSubmit">
        <van-field
        ref="loginForm"
        v-model="user.mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        left-icon="smile-o"
        :rules="userFormRules.mobile"
        maxlength="11"
        >
         <i slot="left-icon" class="iconfont icon-shouji"></i>
        </van-field>
        <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        maxlength="6"
        >
         <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="1000 * 10" format="ss s" @finish="isCountDownShow = false" />
            <van-button v-else class="send-sms-btn" size="small" round type="default" @click="onSendSms" native-type="button">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
            <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能空'
        },
        {
          pattern: /^1[3|5|6|8]\d{9}$/,
          message: '手机号格式错误！'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式不正确！'
        }]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取表单数据

      // 2、验证表单数据

      // 3、提交表单请求
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data) // 将用户信息保存到vuex
        this.$toast.success('登录成功！')
        console.log('登录成功！')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或者密码错误！')
        } else {
          this.$toast.fail('未知错误，稍后重试！')
        }
      }
    },
    async onSendSms () {
      // 验证手机号
      try {
        // await this.$refs.loginForm.validata('mobile')
        console.log('验证通过！')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 显示倒计时
      this.isCountDownShow = true

      // 发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        this.isCountDownShow = false // 隐藏倒计时
        if (error.response.status === 429) {
          this.$toast('操作过于频繁，请稍后重试！')
        } else {
          this.$toast('发送验证码失败，请稍后重试')
        }
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
