import { Select, Input, Switch } from "antd"




function CommConfig({ config, currentValue }) {

    // let referenceList = {
    //     'boolean': 'Switch',
    //     'string': 'Input'
    // }

    function onValueChange() {

    }
    return Object.entries(config).map(item => {
        let k = item[0]
        let v = item[1]

        
        if (v.type === 'array') {
            return (
                <div key={v.title}>
                    <label>{v.title} ：</label>

                    { v.type === 'array' && <Select value={currentValue[k] || v.value[0]} onChange={onValueChange}>
                        {v.value.map(i => <Option value={i}>i</Option>)}
                    </Select>}
                    {v.type === 'string' && <Input value={currentValue[k] || v.value}  onChange={onValueChange}/>}
                    {

                    }
                </div>
            )
        } else if (v.type === 'string'){
            let OtherCom = referenceList[v.type]
            return (
                <div key={v.title}>
                    <label>{v.title}</label>
                    <Input value={defaultValue[k] || v.value} onChange={onValueChange} />
                </div>
            )
        }
    })
}

export default CommConfig