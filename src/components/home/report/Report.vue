<template>
  <div class="report">
    <Breadcrumb name1="数据统计" name2="数据报表" />
    <!--  卡片-->
    <el-card>
      <div class="card">
        <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main"></div>

        <!-- 饼状图 -->
        <div id="pie"></div>s
        <!-- 柱状图 -->
        <div id="bar"></div>

      </div>
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
      options: {
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

      },
      options2: {
        title: {
          text: '用户评价'
        },
        tooltip: {
          trigger: 'axis'// 触发类型，可选值有item\axis
          // triggerOn: 'click' // 触发时机，可选值mouseOver\click
          // formatter: '{b}:{c}'// 格式化显示，字符串模板
        },
        toolbox: {
          feature: { // 工具栏的按钮是配置在 feature 的节点之下
            saveAsImage: {}, // 将图表保存为图片
            dataView: {}, // 是否显示出原始数据
            restore: {}, // 还原图表
            // dataZoom: {}, // 数据缩放
            magicType: { // 将图表在不同类型之间切换,图表的转换需要数据的支持
              type: ['bar', 'line']
            }
          }
        },
        legend: {
          data: ['质量', '服务', '物流']// 数组，data 的值需要和 series 数组中某组数据的 name 值一致
        },
        xAxis: {
          type: 'category',
          data: ['手机', '家电', '零食', '服装', '生活用品', '药品', '玩具', '珠宝']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '物流',
            type: 'bar',
            data: [88, 92, 93, 77, 94, 80, 72, 86],
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值'
                },
                {
                  type: 'min', name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', name: '平均值'
                }
              ]
            },
            label: {
              show: true, // 是否可见
              rotate: 60 // 旋转角度
            },
            smooth: true,
            lineStyle: { // 线条样式 lineStyle
              color: 'green',
              type: 'dashed' // 可选值还有 dotted solid
            }
            // barWidth: '50%' // 柱的宽度
            // markArea: {
            //   data: [
            //     [
            //       {
            //         xAxis: '手机'
            //       }, {
            //         xAxis: '家电'
            //       }
            //     ]
            //   ]
            // }

          },
          {
            name: '质量',
            type: 'bar',
            data: [88, 92, 83, 77, 84, 80, 72, 86],
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值'
                },
                {
                  type: 'min', name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', name: '平均值'
                }
              ]
            },
            label: {
              show: true, // 是否可见
              rotate: 60 // 旋转角度
            }
          },
          {
            name: '服务',
            type: 'bar',
            data: [93, 60, 61, 82, 95, 70, 71, 86],
            markPoint: {
              data: [
                {
                  type: 'max', name: '最大值'
                },
                {
                  type: 'min', name: '最小值'
                }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average', name: '平均值'
                }
              ]
            },
            label: {
              show: true, // 是否可见
              rotate: 60 // 旋转角度
            }
          }
        ]

      },
      options3: {
        title: {
          text: '用户平台'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 11231,
                name: '拼多多'
              },
              {
                value: 22673,
                name: '京东'
              },
              {
                value: 6123,
                name: '唯品会'
              },
              {
                value: 8989,
                name: '1号店'
              },
              {
                value: 16700,
                name: '淘宝'
              }
            ],
            label: {
              show: true,
              formatter: function (arg) {
                return arg.data.name + '平台' + arg.data.value + '元\n' +
                  arg.percent + '%'
              }
            }
            // roseType: 'radius'

          }
        ]
      }
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
    console.log(res.data)
    const result = _.merge(res.data, this.options)
    console.log(result)
    // 5. 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(result)

    // 柱状图
    var myChart2 = echarts.init(document.getElementById('bar'))
    myChart2.setOption(this.options2)
    //
    var myChart3 = echarts.init(document.getElementById('pie'))
    myChart3.setOption(this.options3)
  }
}
</script>

<style lang='less' scoped>
.card {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
#main,
#pie {
  width: 500px;
  height: 300px;
}
#bar {
  width: 1000px;
  height: 300px;
  margin-top: 60px;
}
</style>
