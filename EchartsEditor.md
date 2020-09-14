#Echarts设计器
- 标题title
    - show 是否显示
    - textStyle：{color/fontStyle/fontWeight/fontFamily/fontSize/width/height/lineHeight} 标题样式
    - subtextStyle:{color/fontStyle/fontWeight/fontFamily/fontSize/width/height/lineHeight/align/verticalAlign} 副标题样式
    - textAlign
    - textVerticalAlign
    - padding
    - left
    - top
    - right
    - bottom
    - backgroundColor
    - borderWidth
    - borderRadius
- 图例legend
    - show 是否显示
    - left
    - top
    - right
    - bottom
    - width
    - height
    - align
    - padding
    - itemGrap 图例标记间隔
    - itemWidth 图例标记的图形宽度
    - itemHeight 图例标记的图形高度
    - textStyle:{color/fontStyle/fontWeight/fontFamily/fontSize/width/height/lineHeight/}
    - tooltip:{show:false} 图例配置 默认不显示
    - icon 标记类型'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
    - borderColor
- 直角坐标内绘制网格 grid
    - show 是否显示
    - left
    - top
    - right
    - bottom
    - width
    - height
    - containLabel 是否包含坐标轴刻度标签
    - backgroundColor 网格背景色
    - borderColor 网格边框线颜色
    - borderWidth 网格边框线宽
- xAxis
    - show 是否显示
    - position：top/bottom
    - type:value 数值/category 类目轴/time 时间轴/log 对数轴
    - nameLocation:end /start/middle/center
    - nameTextStyle:{color/fontStyle/fontWeight/fontFamily/fontSize/width/height/lineHeight/align/verticalAlign/width/height}
    - nameGap：15 坐标轴名称与轴线之间的距离
    - inverse 是否反向坐标轴
    - min 坐标轴刻度最小值 ,可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度,不设置时会自动计算最小值保证坐标轴刻度的均匀分布。
    - max
    - scale 坐标轴是否包含0刻度，只在数值轴中（type: 'value'）有效。
    - splitNumber 坐标轴的分割段数
    - minInterval 可以设置成1保证坐标轴分割刻度显示成整数
    - maxInterval自动计算的坐标轴最大间隔大小
    - interval 强制设置坐标轴分割间隔
    - axisLine:{show 是否显示坐标轴轴线 lineStyle：{color 颜色 ,type：solid/dashed/dotted,opacity 透明度}}
    - axisTick:{show 是否显示刻度}
- yAxis 同上类似
  