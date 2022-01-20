<template>
  <div class="report">
    <Breadcrumb name1="数据统计" name2="数据报表" />
    <!--  卡片-->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->

      <div id="main" style="width: 650px;height:300px;"></div>

      <!-- 地图模块 -->
      <!-- <div id="bar" style="width: 650px;height:300px;">
        <div></div>
        <div></div>
      </div> -->

    </el-card>
  </div>
</template>

<script>
// 1. 引入 echarts 按需引入
import * as echarts from 'echarts'
import _ from 'lodash'
import Breadcrumb from 'components/content/breadcrumb/Breadcrumb'
export default {
  name: 'Report',
  components: { Breadcrumb },
  data () {
    return {
      // 需要合并的数据
      options1: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            data: ['2021-12-27', '2021-12-28', '2021-12-29', '2021-12-30', '2021-12-31', '2022-1-1'],
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
      // option2: {
      //   color: ['#2f89cf'],
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   grid: {
      //     left: '0%',
      //     top: '10px',
      //     right: '0%',
      //     bottom: '4%',
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       data: [
      //         '旅游行业',
      //         '教育培训',
      //         '游戏行业',
      //         '医疗行业',
      //         '电商行业',
      //         '社交行业',
      //         '金融行业'
      //       ],
      //       axisTick: {
      //         alignWithLabel: true
      //       },
      //       axisLabel: {
      //         textStyle: {
      //           color: 'rgba(255,255,255,.6)',
      //           fontSize: '12'
      //         }
      //       },
      //       axisLine: {
      //         show: false
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       axisLabel: {
      //         textStyle: {
      //           color: 'rgba(255,255,255,.6)',
      //           fontSize: '12'
      //         }
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: 'rgba(255,255,255,.1)'
      //           // width: 1,
      //           // type: "solid"
      //         }
      //       },
      //       splitLine: {
      //         lineStyle: {
      //           color: 'rgba(255,255,255,.1)'
      //         }
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: '直接访问',
      //       type: 'bar',
      //       barWidth: '35%',
      //       data: [200, 300, 300, 900, 1500, 1200, 600],
      //       itemStyle: {
      //         barBorderRadius: 5
      //       }
      //     }
      //   ]
      // }
    }
  },

  // 此时,页面上的元素,已经被渲染完毕了
  async mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败!')
    }
    // 4. 指定图表的配置项和数据
    // console.log(res.data.xAxis[0].data)
    const result = _.merge(res.data, this.options1)
    // 5. 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(result)

    // 画图
    // var myChart2 = echarts.init(document.getElementById('bar'))
    // // const { data: res } = await this.$http.get('reports/type/1')
    // // if (res.meta.status !== 200) {
    // //   return this.$message.error('获取折线图数据失败!')
    // // }
    // // 4. 指定图表的配置项和数据
    // // console.log(res.data.xAxis[0].data)
    // // const result2 = _.merge(res.data, this.options2)
    // myChart2.setOption(this.option2)
  }
}
</script>

<style lang='less' scoped>
</style>
