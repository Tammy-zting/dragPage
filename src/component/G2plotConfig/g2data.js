//G2plot通用属性
const g2CommConfig = {
    title: {
        label: '标题',
        comType: 'object',//分组
        value: {
            text: {
                label: '标题文本',
                comType: 'string',
                value: ''
            },
            visible: {
                label: '是否显示标题',
                comType: 'boolean',
                value: true//
            },
            style: {//
                label: '标题样式',
                comType: 'object',
                value: {}
            }
        }
    }, forceFit: {
        label: '图表是否自适应容高度',
        comType: 'boolean',
        value: true
    }, width: {
        label: '图表宽度',
        comType: 'number',
        value: 400
    }, description: {
        label: '配置图表的描述',
        comType: 'object',//分组
        value: {
            visible: {
                label: '是否显示描述',
                comType: 'boolean',
                value: true//
            },
            text: {
                label: '描述文本',
                comType: 'string',
                value: ''
            },
            style: {//
                label: '描述样式',
                comType: 'object',
                value: {}
            }
        }
    }, height: {
        label: '图表高度',
        comType: 'number',
        value: 400
    }, padding: {
        label: '图表内边距',
        comType: ['padding', 'auto'],//特殊类型，数字类型的数组
        value: [10, 10, 10, 10],//或者 auto
    }, theme: { //??
        label: '图表主题',
        comType: 'string',  //??
        value: ''
    }, meta: {//?
        label: '全局话配置图表数据元信息',
        comType: 'object',//特殊类型，需遍历数据单元的key  meta
        value: {
            alias: {
                label: '配置字段别名',
                comType: 'string',
                value: ''
            }, range: {
                label: '字段映射区间',
                comType: 'range-num',//特殊类型，区间
                value: [0, 1]//官方默认
            }
        }
    }, tooltip: {
        label: '文字提示',
        comType: 'object',
        value: {
            visible: {
                label: '是否可见',
                comType: 'boolean',
                value: true
            }, shared: {
                label: '是否只展示单条数据',
                comType: 'boolean',
                value: true
            },
            crosshairs: {
                label: '配置辅助线',
                comType: ['object', false],//特殊类型，false
                value: {
                    type: {
                        label: '辅助线类型',
                        comType: 'array',//枚举类型 ==>下拉框
                        value: ['x', 'y', 'cross'] //单选
                    }, style: {}
                }
            }
        }
    }, legend: {
        label: '图例',
        comType: 'object',
        value: {
            visible: {
                label: '是否可见',
                comType: 'boolean',
                value: true
            }, position: {
                label: '位置',
                comType: 'array',
                value: ['left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
            }, offsetX: {
                label: 'X方向偏移量(px)',
                comType: 'number',
                value: 0
            }, offsetY: {
                label: 'Y方向偏移量(px)',
                comType: 'number',
                value: 0
            }, marker: {
                label: '图例形状',
                comType: 'array',
                value: ['circle', 'square', 'diamond', 'triangle', 'triangleDown', 'hexagon', 'bowtie', 'cross', 'tick', 'plus', 'hyphen', 'line', 'hollowCircle', 'hollowSquare', 'hollowDiamond', 'hollowTriangle', 'hollowTriangleDown', 'hollowHexagon', 'hollowBowtie']
            }
        }
    }, axis: {
        label: '坐标轴',
        comType: 'object',
        value: {
            visible: {
                label: '是否可见',
                comType: 'boolean',
                value: true
            }, line: {
                label: '坐标轴轴线',
                comType: 'object',
                value: {
                    visible: {
                        label: '是否可见',
                        comType: 'boolean',
                        value: true
                    }, style: {
                        label: '坐标轴样式',
                        comType: 'object',
                        value: {
                            stroke: {
                                label: '坐标轴轴线颜色',
                                comType: 'color',////特殊类型，color 渲染调色板
                                value: ''
                            }, lineWidth: {
                                label: '描边宽度',
                                comType: 'number',
                                value: 1
                            }, lineDash: {
                                label: '描边虚线显示',
                                comType: 'range-num',
                                value: [0, 0]
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }
                        }
                    }
                }
            }, grid: {
                label: '坐标轴网格',
                comType: 'object',
                value: {
                    visible: {
                        label: '是否可见',
                        comType: 'boolean',
                        value: true
                    }, style: {
                        label: '坐标轴网格样式',
                        comType: 'object',
                        value: {
                            stroke: {
                                label: '坐标轴轴线颜色',
                                comType: 'color',////特殊类型，color 渲染调色板
                                value: ''
                            }, lineWidth: {
                                label: '描边宽度',
                                comType: 'number',
                                value: 1
                            }, lineDash: {
                                label: '描边虚线显示',
                                comType: 'range-num',
                                value: [0, 0]
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }
                        }
                    }
                }
            }, label: {
                label: '坐标轴标签',
                comType: 'object',
                value: {
                    visible: {
                        label: '是否可见',
                        comType: 'boolean',
                        value: true
                    }, precision: {
                        label: '快捷定义精度',
                        comType: 'number',
                        value: 0
                    }, suffix: {
                        label: '添加文本后缀(如：单位)',
                        comType: 'string',
                        value: ''
                    }, mask: {//??
                        label: '格式化遮罩'
                    }, offsetX: {
                        label: 'x 方向的偏移量',
                        comType: 'number',
                        value: 0
                    }, offsetY: {
                        label: 'y 方向的偏移量',
                        comType: 'number',
                        value: 0
                    }, position: {
                        label: '位置',
                        comType: 'array',
                        value: ['left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
                    }, adjustPosition: {
                        label: '是否开启数据标签位置自动调整',
                        comType: 'boolean',
                        value: true
                    }, adjustColor: {
                        label: '是否开启数据标签颜色自动调整',
                        comType: 'boolean',
                        value: true
                    }, style: {
                        label: 'label 文本样式',
                        comType: 'object',
                        value: {
                            stroke: {
                                label: '文本描边颜色',
                                comType: 'color',////特殊类型，color 渲染调色板
                                value: ''
                            }, lineWidth: {
                                label: '文本描边粗细',
                                comType: 'number',
                                value: 1
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }, fill: {
                                label: '文本颜色',
                                comType: 'color',
                                value: '#000'
                            }, fontSize: {
                                label: '文本大小',
                                comType: 'number',
                                value: 12
                            }, fontWeight: {
                                label: '文本描边粗细',
                                comType: 'step',//特殊类型，InputNumber 添加step属性
                                value: [100, 900, 100]//[min,max,step]
                            }
                        }
                    }
                }
            }, title: {
                label: '坐标轴标题',
                comType: 'object',
                value: {
                    visible: {
                        label: '是否可见',
                        comType: 'boolean',
                        value: true
                    }, style: {
                        label: 'title文本样式',
                        comType: 'object',
                        value: {
                            stroke: {
                                label: '文本描边颜色',
                                comType: 'color',////特殊类型，color 渲染调色板
                                value: ''
                            }, lineWidth: {
                                label: '文本描边粗细',
                                comType: 'number',
                                value: 1
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }, fill: {
                                label: '文本颜色',
                                comType: 'color',
                                value: '#000'
                            }, fontSize: {
                                label: '文本大小',
                                comType: 'number',
                                value: 12
                            }, fontWeight: {
                                label: '文本描边粗细',
                                comType: 'step',//特殊类型，InputNumber 添加step属性
                                value: [100, 900, 100]//[min,max,step]
                            }
                        }
                    }
                }
            }, tickLine: {
                label: '坐标轴刻度线',
                comType: 'object',
                value: {
                    visible: {
                        label: '是否可见',
                        comType: 'boolean',
                        value: true
                    }, style: {
                        label: 'title文本样式',
                        comType: 'object',
                        value: {
                            stroke: {
                                label: '文本描边颜色',
                                comType: 'color',////特殊类型，color 渲染调色板
                                value: ''
                            }, lineWidth: {
                                label: '文本描边粗细',
                                comType: 'number',
                                value: 1
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }, lineDash: {
                                label: '描边虚线显示',
                                comType: 'range-num',
                                value: [0, 0]
                            }
                        }
                    }
                }
            }
        }
    }, linearAxis: {
        label: '连续型坐标轴',
        comType: 'object',
        value: {
            min: {
                label: '坐标轴最小值',
                comType: 'number',
                value: 0
            }, max: {
                label: '坐标轴最大值',
                comType: 'number',
                value: 100
            }, tickCount: {
                label: '坐标轴刻度数量',
                comType: 'number',
                value: 5
            }, tickInterval: {
                label: '坐标轴刻度间隔',
                comType: 'number',
                value: 5
            }
        }
    }, guideLine: {//辅助线，适用于所有直角坐标系Rectangular的图表，例如折线图、柱状图、面积图、散点图等，而不适用于极坐标的图表，如饼图、环图、雷达图等。
        label: '辅助线',
        comType: 'object',
        description: '适用于所有直角坐标系Rectangular的图表，例如折线图、柱状图、面积图、散点图等，而不适用于极坐标的图表，如饼图、环图、雷达图等',
        value: {
            type: {
                label: '辅助线类型', //??
                comType: 'array',
                value: ['max', 'min', 'median', 'mean']
            }, start: {
                label: '起始位置',
                comType: 'range-str',
                description: '原始数据值（如：["2010-01-01", 100]）或绘图区域百分比位（ 如：["50%", "50%"]）',
                value: [0, 0]

            }, end: {
                label: '终点位置',
                comType: 'range-str',
                description: '原始数据值（如：["2010-01-01", 100]）或绘图区域百分比位（ 如：["50%", "50%"]）',
                value: [0, 0]

            }, lineStyle: {
                label: '辅助线样式',
                comType: 'object',
                value: {
                    stroke: {
                        label: '颜色',
                        comType: 'color',
                        value: '#000'
                    }, lineWidth: {
                        label: '宽度',
                        comType: 'number',
                        value: 1
                    }, lineDash: {
                        label: '虚线显示',
                        comType: 'range-num',
                        value: [0, 0]
                    }, opacity: {
                        label: '透明度',
                        comType: 'slider',//特殊类型，滑动条 0-100
                        value: [0, 100, 0.5]
                    }
                }
            }, text: {
                label: '辅助线文本',
                comType: 'object',
                value: {
                    position: {
                        label: '文本位置',
                        comType: 'array',
                        value: ['start', 'center', 'end', '50%', 0.5]
                    }, content: {
                        label: '文本内容',
                        comType: 'string',
                        value: ''
                    }, offsetX: {
                        label: 'X方向偏移量(px)',
                        comType: 'number',
                        value: 0
                    }, offsetY: {
                        label: 'Y方向偏移量(px)',
                        comType: 'number',
                        value: 0
                    }, style: {
                        label: '文本样式',
                        comType: 'object',
                        value: {
                            fontSize: {
                                label: '字号',
                                comType: 'number',
                                value: 12
                            }, opacity: {
                                label: '透明度',
                                comType: 'slider',//特殊类型，滑动条
                                value: [0, 100, 0.5]
                            }, fill: {
                                label: '文本颜色',
                                comType: 'color',
                                value: '#000'
                            }, textAlign: {
                                label: '水平对齐方式',
                                comType: 'array',
                                value: ['start', 'center', 'end']
                            }, textBaselin: {
                                label: '文字基线',
                                comType: 'array',
                                value: ['top', 'bottom', 'middle']
                            }


                        }
                    }
                }
            }


        }
    }

}


//G2plot图默认值
const g2DefaultVaules = {
    LineChart: {   //折线图 
        title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构',
            visible: true,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高气温', '最低气温']
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        data: [{ year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }],
        xField: 'year',
        yField: 'value',
    },
    ColumnChart:{   //柱状图
        title: {
            visible: true,
            text: '基础柱状图',
        },
        forceFit: true,
        padding: 'auto',
        xField: 'type',
        yField: 'sales',
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额(万)',
            },
        },
        data: [
            {
                type: '家具家电',
                sales: 38,
            },
            {
                type: '粮油副食',
                sales: 52,
            },
            {
                type: '生鲜水果',
                sales: 61,
            },
            {
                type: '美容洗护',
                sales: 145,
            },
            {
                type: '母婴用品',
                sales: 48,
            },
            {
                type: '进口食品',
                sales: 38,
            },
            {
                type: '食品饮料',
                sales: 38,
            },
            {
                type: '家庭清洁',
                sales: 38,
            },
        ]
    },
    PieChart:{   //饼状图
        forceFit: true,
        radius: 0.8,
        angleField: 'value',
        colorField: 'type',
        label: {
            visible: true,
            type: 'inner',
        },
        data:[
            {
              type: '分类一',
              value: 27,
            },
            {
              type: '分类二',
              value: 25,
            },
            {
              type: '分类三',
              value: 18,
            },
            {
              type: '分类四',
              value: 15,
            },
            {
              type: '分类五',
              value: 10,
            },
            {
              type: '其它',
              value: 5,
            },
          ]
    }
}

const g2ChartType =['LineChart','ColumnChart','PieChart']

export  { g2CommConfig, g2DefaultVaules,g2ChartType }
