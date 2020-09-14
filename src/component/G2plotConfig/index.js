
import {g2CommConfig} from './g2data'
import { Input, InputNumber, Switch, Select, Slider, Row, Col, Collapse, Divider } from 'antd'
import { useState,useEffect } from 'react'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import React from 'react'
import _ from 'lodash';


const { Panel } = Collapse;
const { Option } = Select;




function getValue(path, commConfig) {//获取data中对应的数据
    let value
    if (path.includes('.') && Object.keys(commConfig).length > 0) {
        let pathArr = path.split(".")
        value = commConfig[pathArr[0]]
        if (typeof (value) != 'undefined') {
            for (let i = 1; i < pathArr.length; i++) {
                if (typeof (value) != 'undefined') {
                    value = value[pathArr[i]]
                } else {
                    break;
                }
            }
        }

    } else {
        value = commConfig[path] //根
    }

    return value

}


//迭代渲染节点  
/**
 * 
 * @param {child, isRoot, path,cusValue } {子节点，是否为根节点，路径，自定义默认值} 
 */
function childLoop({ child, isRoot, path, cusValue, G2plotValueChange,commConfig }) {


    ////console.log('childLoop',commConfig)

    //创建区间数据 或者 Padding值
    function createRange(value,path, index, newArray) {
        ////console.log({value, index, newArray})
        newArray[index] = value
        G2plotValueChange(newArray, path)
    }


    if (Object.prototype.toString.call(child.value) === '[object Object]' && child.comType === 'object' && Object.keys(child.value).length !== 0) {
        //二次遍历，渲染二级标题
        return (
            <React.Fragment key={path}>
                {isRoot === undefined ? <Col span={24}><Divider style={{ fontSize: 10, fontWeight: 600 }} orientation="left">{child.label}</Divider></Col> : ''}
                {
                    //无二级标题
                    Object.entries(child.value).map((v) => childLoop({ child: v[1], path: path + "." + v[0] ,commConfig,G2plotValueChange}))
                }
            </React.Fragment >
        )
    } else {
        let vType = child.comType //判断渲染组件类型

        let defaultValue


        if (typeof (cusValue) !== 'undefined' && cusValue.toString().length > 0) {
            defaultValue = cusValue
        } else if (typeof (getValue(path, commConfig)) !== 'undefined' && getValue(path, commConfig).toString().length > 0) {
            defaultValue = getValue(path, commConfig)
        } else if (typeof (child.value) !== 'undefined' && child.value.toString().length > 0) {
            defaultValue = child.value
        }


        if (typeof (vType) === 'string') {
            if (vType === 'object') {
                if (Object.keys(child.value).length !== 0) {
                    childLoop({ child: child.value, path ,G2plotValueChange})
                }


            } else if (vType === 'number') {

                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}><InputNumber value={defaultValue} onChange={(value) => G2plotValueChange(value, path)} /></Col>
                    </React.Fragment>
                )
            } else if (vType === 'string') {
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}><Input value={defaultValue} onChange={(e) => G2plotValueChange(e.target.value, path)} /></Col>
                    </React.Fragment>
                )
            } else if (vType === 'boolean') {
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}><Switch checked={defaultValue} onChange={(value) => G2plotValueChange(value, path)} /></Col>
                    </React.Fragment>
                )
            } else if (vType === 'array') {
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}>
                            <Select placeholder="请选择" value={defaultValue[0]} onChange={(value) => G2plotValueChange(value, path)}>
                                {child.value.map((item, index) => (
                                    <Option value={item} key={index}>{item}</Option>
                                ))}
                            </Select>
                        </Col>
                    </React.Fragment>
                )
            } else if (vType === 'range-num') {
                let newArray = getValue(path, commConfig) || child.value || [0, 0]
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}>
                            <InputNumber value={newArray[0]} onChange={(value) => createRange(value, path, 0, newArray)} /> - <InputNumber value={newArray[1]} onChange={(value) => createRange(value, path, 1, newArray)} />
                        </Col>
                    </React.Fragment>
                )
            } else if (vType === 'range-str') {
                let newArray = getValue(path, commConfig) || child.value || ['', '']
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={8}>
                            <Input value={child.value[0]} onChange={(e) => createRange(e.target.value, path, 0, newArray)} />
                        </Col>
                        <Col span={8}>
                            <Input value={child.value[1]} onChange={(e) => createRange(e.target.value, path, 0, newArray)} />
                        </Col>
                    </React.Fragment>
                )
            } else if (vType === 'color') {
                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}>
                            <ColorPicker
                                animation="slide-up"
                                value={defaultValue}
                                onChange={(value) => G2plotValueChange(value, path)}
                            />
                        </Col>
                    </React.Fragment>  
                )

            } else if (vType === 'slider') {

                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}>
                            <Slider min={child.value[0]} max={child.value[1]} step={child.value[2]} value={child.value[0]} onChange={(value, e) => G2plotValueChange(value, path)} />
                        </Col>
                    </React.Fragment>
                )
            } else if (vType === 'step') {

                return (
                    <React.Fragment key={path}>
                        <Col span={6}>{child.label}</Col>
                        <Col span={18}>
                            <InputNumber min={child.value[0]} value={child.value[0]} max={child.value[1]} step={child.value[2]} onChange={(value) => G2plotValueChange(value, path)} />
                        </Col>
                    </React.Fragment>
                )
            } else if (vType === 'meta') {

            }

        } else if (Array.isArray(vType)) {  //多类型 [padding,auto] [object,false] [number,auto]


            if (vType.includes('object')) {
                return (
                    <TooltipHook data={child} path={path} key={path} commConfig={commConfig} G2plotValueChange={G2plotValueChange}/>
                )
            } else if (vType.includes('padding')) {
                return (
                    <SwitchPadd data={child} path={path} key={path} createRange={createRange} commConfig={commConfig} G2plotValueChange={G2plotValueChange}/>
                )

            }
        }
    }



}


//文字提示是否配置辅助线开关 [object,false]
function TooltipHook(props) {
    const { data, path, G2plotValueChange,commConfig } = props
    let defaultChecked = false
    if (Object.prototype.toString.call(getValue(path, commConfig)) === '[object Object]') {
        defaultChecked = true
    }

    const [isShow, setIsShow] = useState(defaultChecked) //判断是否显示配置组件

    const onSwitchClick = () => {
        if (isShow) {
            G2plotValueChange(false, path)
        }
        setIsShow(!isShow)
    }

    return (
        <>
            <Col span={6}>{data.label}</Col>
            <Col span={18}><Switch defaultChecked={isShow} onClick={onSwitchClick} unCheckedChildren={'否'} checkedChildren={'是'} /></Col>
            {isShow && Object.entries(data.value).map(item => {
                if (Object.values(item[1]).length !== 0) {
                    let newpath = path + "." + item[0]
                    let defaultValue = getValue(newpath, commConfig) || item[1].value[0]
                    return childLoop({ child: item[1], path: path + "." + item[0], cusValue: defaultValue ,G2plotValueChange})
                }
            })
            }
        </>
    )
}

//[padding,auto]
function SwitchPadd(props) {
    const { data, path, G2plotValueChange,createRange,commConfig } = props
    let newArray = getValue(path, commConfig) || data.value

    let defaultshow

    if (Array.isArray(newArray)) {
        defaultshow = true
    } else {

        defaultshow = false
        newArray = [0, 0, 0, 0]
    }

    const [isShow, setIsShow] = useState(defaultshow)

    const switchClick = () => {
        if (isShow) {
            G2plotValueChange(data.comType[1], path)
        }
        setIsShow(!isShow)

    }
    return (
        <>
            <Col span={6}>{data.label}</Col>
            <Col span={18}><Switch unCheckedChildren={data.comType[1]} checkedChildren={"自定义"} defaultChecked={isShow} onClick={switchClick} /></Col>
            {isShow &&
                <>
                    <Col span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18}> 上 <InputNumber value={newArray[0]} onChange={(value) => createRange(value, path, 0, newArray)} /></Col>
                        </Row>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18}>右 <InputNumber value={newArray[1]} onChange={(value) => createRange(value, path, 1, newArray)} /></Col>
                        </Row>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18}>下 <InputNumber value={newArray[2]} onChange={(value) => createRange(value, path, 2, newArray)} /></Col>
                        </Row>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18}>左 <InputNumber value={newArray[3]} onChange={(value) => createRange(value, path, 3, newArray)} /></Col>
                        </Row>

                    </Col>
                </>
            }
        </>
    )

}

//配置面板
function G2plotConfig(props) {

    const { commConfig, setCommConfig } = props


    //修改数据
    function G2plotValueChange(value, path) {
        let newObj = _.cloneDeep(commConfig)
        let pathArr = path.split(".")
        _.updateWith(newObj, pathArr, _.constant(value))
        setCommConfig(newObj)
    }

    return (
        <Collapse>
            {Object.entries(g2CommConfig).map((item, index) => {
                //一次遍历，根节点渲染分组组件
                return (
                    <Panel header={item[1].label} key={index}>
                        <Row gutter={[8, 8]}>
                            {childLoop({ child: item[1], isRoot: 0,commConfig, path: item[0], G2plotValueChange})}
                        </Row>
                    </Panel>
                )
            })}
        </Collapse>
    )

}

export default G2plotConfig
