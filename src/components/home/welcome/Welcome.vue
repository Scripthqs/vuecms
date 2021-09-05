<template>
  <div class="welcome">
    <h2>
      欢迎使用
    </h2>
    <p>欢迎使用本后台管理系统，本系统有用户管理，权限管理，商品管理，订单管理和数据统计等功能</p>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="less" scoped>
.welcome {
  margin: 30px auto 0;
  font-size: 20px;
  text-align: center;
  color: #666;
  p {
    margin: 40px;
  }
}
</style>
