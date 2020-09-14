
// G2plot测试界面
import React, { useCallback, useState } from 'react'
import { Row, Col } from 'antd';
import G2plotConfig from '../component/G2plotConfig'
import { LineChart } from '@opd/g2plot-react'


//G2plot 配置数据
const config = {
    height: 400,
    width: 20,
    title: {
        visible: true,
        text: 'LineChart',
    },
    description: {
        visible: true,
        text: 'This is Description',
    },
    padding: 'auto',

    xField: 'year',
    yField: 'value',
    label: {
        visible: true,
        type: 'point',
    },
    point: {
        visible: true,
        size: 5,
    },
    xAxis: {
        tickCount: 10,
    },
    data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 11 },
    ],
    forceFit: true
}


export default function () {
    //初始化G2plot配置数据
    const [commConfig, setCommConfig] = useState(config)

    //G2plot
    const handleChartMount = useCallback(chart => {
        ////console.log("chart",chart)
    }, [])

    return (
        <Row gutter={8} >
            <Col span={8}><G2plotConfig commConfig={commConfig} setCommConfig={setCommConfig} /></Col>
            <Col span={16}><LineChart {...commConfig} onMount={handleChartMount} /></Col>
        </Row >
    )
}