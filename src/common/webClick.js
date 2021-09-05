jQuery(document).ready(function ($) {
  // 定义获取词语下标
  let index = 0
  $('body').click(function (e) {
    // 点击body时触发事件
    // const a = ['❤富强❤', '❤民主❤', '❤文明❤', '❤和谐❤', '❤自由❤', '❤平等❤', '公正', '法治', '爱国', '敬业', '诚信', '友善']
    // 需要显示的词语
    const language = ['HTML', 'CSS', 'JavaScript', 'Git', 'Ajax', 'Nodejs', 'Vue', 'Webpack', 'TypeScript', 'MongoDB', 'Axios', 'Express', 'Uni-app', '原型', 'ES6', 'Promise', 'this', '闭包']
    // 获取x和y的指针坐标的位置，分别相对于文档的左和右边缘。
    const x = e.pageX
    const y = e.pageY
    // 设置词语给span标签
    const $i = $('<span/>').text(language[index])
    // 下标等于原来下标+1  余 词语总数
    index = (index + 1) % language.length
    // 在鼠标的指针的位置给$i定义的span标签添加css样式
    $i.css({
      'z-index': 9999,
      top: y - 20,
      left: x,
      position: 'absolute',
      'font-weight': 'bold',
      color: randomColor(),
      'font-size': '20px'
    })
    // 随机自定义颜色
    function randomColor () {
      return 'rgb(' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ')'
    }
    // 在body添加这个标签
    $('body').append($i)
    // animate() 方法执行 CSS 属性集的自定义动画。
    // 该方法通过CSS样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果
    $i.animate(
      {
        // 将原来的位置向上移动180
        top: y - 180,
        opacity: 0
        // 1500动画的速度
      },
      1500,
      function () {
        // 时间到了自动删除
        $i.remove()
      }
    )
  })
})
