<template>
  <div class="my-container">
      <div v-if="user" class="header user-info">
          <div class="base-info">
              <div class="left">
                  <van-image
                    class="avatar"
                    :src="userInfo.photo ? userInfo.photo : 'https://img01.yzcdn.cn/vant/cat.jpeg'"
                    round
                    fit="cover"
                    />
                   <span class="name">{{ userInfo.name ? userInfo.name : '黑马小学生' }}</span>
              </div>
              <div class="right">
                  <van-button size="mini" round>编辑资料</van-button>
              </div>
          </div>
          <div class="data-status">
              <div class="data-item">
                  <span class="count">{{ userInfo.art-count ? userInfo.art-count : 10 }}</span>
                  <span class="text">头条</span>
              </div>
              <div class="data-item">
                  <span class="count">{{ userInfo.art-count ? userInfo.follow-count : 10 }}</span>
                  <span class="text">关注</span>
              </div>
              <div class="data-item">
                  <span class="count">{{ userInfo.art-count ? userInfo.fans-count : 10 }}</span>
                  <span class="text">粉丝</span>
              </div>
              <div class="data-item">
                  <span class="count">{{ userInfo.art-count ? userInfo.like-count : 10 }}</span>
                  <span class="text">获赞</span>
              </div>
          </div>
      </div>
      <div v-else class="header not-login">
          <div class="login-btn" @click="$router.push('/login')">
              <img class="mobile-img" src="~@/assets/mobile.png" alt="">
              <span class="text">登录 / 注册</span>
          </div>
      </div>
      <!-- 收藏和历史 宫格导航 -->
      <van-grid class="grid-nav" :column-num="2" clickable>
        <van-grid-item class="grid-item">
            <template v-slot:icon>
                <i class="iconfont icon-shoucang"></i>
            </template>
            <template v-slot:text>
                <span class="text">收藏</span>
            </template>
        </van-grid-item>
        <van-grid-item class="grid-item">
            <template v-slot:icon>
                <i class="iconfont icon-lishi"></i>
            </template>
            <template v-slot:text>
                <span class="text">历史</span>
            </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知 小智同学 退出登录-->
      <van-cell title="单元格" is-link />
      <van-cell title="小智同学" is-link class="md9" />
      <van-cell v-if="user" title="退出登录" class="logout-cell" clickable @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？',
        message: '退出后部分功能不能使用'
      })
        .then(() => {
          // on confirm
          console.log('确认！')
          //   TODO： 清除vuex数据，清除localstorage数据
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消')
        })
    },
    async getUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败，请稍后重试！')
      }
    }
  },
  created () {
    //   当用户登录之后才会请求数据
    if (this.user) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
    .header {
        height: 361px;
        background: url("~@/assets/banner.png");
        background-size: cover;
    }
    .not-login {
        display: flex;
        justify-content: center;
        align-items: center;
        .login-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .mobile-img {
                width: 132px;
                height: 132px;
                margin-bottom: 15px;
            }
            .text {
                font-size: 28px;
                color: #fff;
            }
        }
    }

    .user-info {
        .base-info {
            height: 231px;
            padding: 76px 32px 23px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                align-items: center;
                .avatar {
                    width: 132px;
                    height: 132px;
                    margin-right: 23px;
                    border: 4px solid #fff;
                }
                .name {
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
        .data-status {
            display: flex;
            .data-item {
                height: 130px;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                .count {
                    font-size: 36px;
                }
                .text {
                    font-size: 23px;
                }
            }
        }
    }

    .grid-nav {
        .grid-item {
            height: 141px;
            i.iconfont {
                font-size: 45px;
            }
            .icon-shoucang {
                color: #eb5253;
            }
            span.text {
                font-size: 28px;
            }
            .icon-lishi {
                color: #ff9d1d;
            }
        }
    }

    .van-icon-arrow {
        color: #ccc;
    }
    .logout-cell {
        text-align: center;
        color: #d86262;
    }
    .md9 {
        margin-bottom: 9px;
    }
}
</style>
