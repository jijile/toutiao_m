<template>
  <div class="my-container">
      <div class="header not-login">
          <div class="login-btn" @click="$router.push('/login')">
              <img class="mobile-img" src="~@/assets/mobile.png" alt="">
              <span class="text">登录 / 注册</span>
          </div>
      </div>
      <div class="header user-info">
          <div class="base-info">
              <div class="left">
                  <van-image
                    class="avatar"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    round
                    fit="cover"
                    />
                   <span class="name">黑马新手</span>
              </div>
              <div class="right">
                  <van-button size="mini" round>编辑资料</van-button>
              </div>
          </div>
          <div class="data-status">
              <div class="data-item">
                  <span class="count">10</span>
                  <span class="text">头条</span>
              </div>
              <div class="data-item">
                  <span class="count">10</span>
                  <span class="text">关注</span>
              </div>
              <div class="data-item">
                  <span class="count">10</span>
                  <span class="text">粉丝</span>
              </div>
              <div class="data-item">
                  <span class="count">10</span>
                  <span class="text">获赞</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  data () {
    return {}
  },
  methods: {},
  created () {}
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
}
</style>
