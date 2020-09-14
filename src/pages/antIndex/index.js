import moment from 'moment';
import {Link} from 'umi';
import { Row, Col, Card, List, Avatar, PageHeader, Typography } from 'antd';
// import { Radar } from '@/components/Charts';
// import EditableLinkGroup from '@/components/EditableLinkGroup';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { DonutChart, PieChart } from '@opd/g2plot-react' //G2plot
import styles from './index.less';

const { Title } = Typography;


//待办事项数据
const toDoList = [
  {
    "ApprovalDate": "",
    "CreateDate": "2019-12-04 22:52:40",
    "DeferDate": "",
    "FinishDate": "",
    "NewToDoProcessState": 0,
    "Oid": "1202239298875129856",
    "Remark": "2019_0016 111 2019-12-04 22:52:40",
    "SrcOid": "1199271976115863552",
    "SrcViewId": "ZPPUBZHGLGCSJ_JS_SH_DV",
    "StartUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "Suggestion": "",
    "Title": "工程结算_审核过程_审核过程_提交审核",
    "ToDoUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    }
  }, {
    "ApprovalDate": "",
    "CreateDate": "2019-11-25 22:17:44",
    "DeferDate": "",
    "FinishDate": "",
    "NewToDoProcessState": 0,
    "Oid": "1198969018803257344",
    "Remark": "2019_0013 测试项目001 2019-11-25 22:17:44",
    "SrcOid": "1197518027578900480",
    "SrcViewId": "ZPPUBZHGLGCSJ_SK_DV",
    "StartUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "Suggestion": "",
    "Title": "工程预算审核_资料送审_资料返还",
    "ToDoUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    }
  },
  {
    "ApprovalDate": "",
    "CreateDate": "2019-12-04 22:52:40",
    "DeferDate": "",
    "FinishDate": "",
    "NewToDoProcessState": 0,
    "Oid": "1202239298875129856",
    "Remark": "2019_0016 111 2019-12-04 22:52:40",
    "SrcOid": "1199271976115863552",
    "SrcViewId": "ZPPUBZHGLGCSJ_JS_SH_DV",
    "StartUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "Suggestion": "",
    "Title": "工程结算_审核过程_审核过程_提交审核",
    "ToDoUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "48594121348139786061",
      "UserName": "dev"
    }
  }, {
    "ApprovalDate": "",
    "CreateDate": "2019-11-25 22:17:44",
    "DeferDate": "",
    "FinishDate": "",
    "NewToDoProcessState": 0,
    "Oid": "11989690188032573442",
    "Remark": "2019_0013 测试项目001 2019-11-25 22:17:44",
    "SrcOid": "1197518027578900480",
    "SrcViewId": "ZPPUBZHGLGCSJ_SK_DV",
    "StartUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "Suggestion": "",
    "Title": "工程预算审核_资料送审_资料返还",
    "ToDoUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    }
  }
]

//进行中的项目
const doingList = [
  {
    "CreateUser": {
      "Avatar": "",
      "FullName": "系统管理员",
      "Oid": "5279027094793132806",
      "UserName": "system"
    },
    "EntityCompany": {
      "Code": "Gree",
      "Name": "格力电器集团股份公司",
      "Oid": "1189558424769626112"
    },
    "Month": 7,
    "Name": "被审单位2019年度管理审计",
    "Oid": "5031255182209947505",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "方华",
      "Oid": "4635744958993638539",
      "UserName": "100000345"
    },
    "SeqId": 193,
    "SerialNumber": "01_201904_0001",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2021,
    "ZPPUBXMZYxmflMaster": {
      "Code": "",
      "FullName": "管理审计",
      "Oid": "5173828829797331873"
    }
  }, {
    "CreateUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "EntityCompany": {
      "Code": "002",
      "Name": "被审单位2",
      "Oid": "1186556194760130560"
    },
    "Month": 2,
    "Name": "某某大学经济责任审计",
    "Oid": "1198612551990476800",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "符金凤",
      "Oid": "5556003249135000783",
      "UserName": "100000455"
    },
    "SeqId": 195,
    "SerialNumber": "2019_000026",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2019,
    "ZPPUBXMZYxmflMaster": {
      "Code": "003",
      "FullName": "经济责任审计\\院系-任期",
      "Oid": "4777597941291040574"
    }
  },
  {
    "CreateUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "EntityCompany": {
      "Code": "002",
      "Name": "被审单位2",
      "Oid": "1186556194760130560"
    },
    "Month": 2,
    "Name": "某某大学经济责任审计",
    "Oid": "11986125519904768001",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "符金凤",
      "Oid": "5556003249135000783",
      "UserName": "100000455"
    },
    "SeqId": 195,
    "SerialNumber": "2019_000026",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2019,
    "ZPPUBXMZYxmflMaster": {
      "Code": "003",
      "FullName": "经济责任审计\\院系-任期",
      "Oid": "4777597941291040574"
    }
  },
  {
    "CreateUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "EntityCompany": {
      "Code": "002",
      "Name": "被审单位2",
      "Oid": "1186556194760130560"
    },
    "Month": 2,
    "Name": "某某大学经济责任审计",
    "Oid": "11986125519904768002",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "符金凤",
      "Oid": "5556003249135000783",
      "UserName": "100000455"
    },
    "SeqId": 195,
    "SerialNumber": "2019_000026",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2019,
    "ZPPUBXMZYxmflMaster": {
      "Code": "003",
      "FullName": "经济责任审计\\院系-任期",
      "Oid": "4777597941291040574"
    }
  }, {
    "CreateUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "EntityCompany": {
      "Code": "002",
      "Name": "被审单位2",
      "Oid": "1186556194760130560"
    },
    "Month": 2,
    "Name": "某某大学经济责任审计",
    "Oid": "1198612551990476800",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "符金凤",
      "Oid": "55560032491350007833",
      "UserName": "100000455"
    },
    "SeqId": 195,
    "SerialNumber": "2019_000026",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2019,
    "ZPPUBXMZYxmflMaster": {
      "Code": "003",
      "FullName": "经济责任审计\\院系-任期",
      "Oid": "4777597941291040574"
    }
  },
  {
    "CreateUser": {
      "Avatar": "",
      "FullName": "开发人员",
      "Oid": "4859412134813978606",
      "UserName": "dev"
    },
    "EntityCompany": {
      "Code": "002",
      "Name": "被审单位2",
      "Oid": "1186556194760130560"
    },
    "Month": 2,
    "Name": "某某大学经济责任审计",
    "Oid": "11986125519904768004",
    "ProjectLeader": {
      "Avatar": "",
      "FullName": "符金凤",
      "Oid": "5556003249135000783",
      "UserName": "100000455"
    },
    "SeqId": 195,
    "SerialNumber": "2019_000026",
    "XMNBLY": 0,
    "XMZYWCZT": {
      "Code": "",
      "Name": "",
      "Oid": ""
    },
    "Year": 2019,
    "ZPPUBXMZYxmflMaster": {
      "Code": "003",
      "FullName": "经济责任审计\\院系-任期",
      "Oid": "4777597941291040574"
    }
  }
]


//图公用数据
const chartData = [
  {
    "ZPPUBSYSFlag": 2,
    "XMZYWCZT": {
      "Code": "01",
      "Name": "未开始",
      "Oid": "1242643019484069888"
    }
  }, {
    "ZPPUBSYSFlag": 1,
    "XMZYWCZT": {
      "Code": "02",
      "Name": "进行中",
      "Oid": "1242643125495103488"
    }
  }, {
    "ZPPUBSYSFlag": 1,
    "XMZYWCZT": {
      "Code": "03",
      "Name": "已完成",
      "Oid": "1242643202674491392"
    }
  }
]

/**
 * 新构建图数据
 * @param {array} data  图表数据源
 * @param {array} value 坐标轴的对应数据字段名 ['ZPPUBSYSFlag', 'XMZYWCZT.Name']
 */
function createChartData(data, value) {
  // 判断字段名是否有包含下一级
  let flag = value.find(item => item.includes('.'))
  // 新构建所需数据
  if (flag) {
    let newData = []
    chartData.forEach(field => {
      let newObj = {}
      value.forEach((item, j) => {
        if (item.includes('.')) {
          const currentArray = item.split('.')
          const len = currentArray.length
          let current = field
          for (let i = 0; i < len; i++) {
            current = current[currentArray[i]]
          }
          newObj[currentArray[len - 1]] = current
        } else {
          newObj[item] = field[item]
        }

      })
      newData.push(newObj)
    })

    return newData

  } else {  //没有则直接使用传入的数据源
    return data
  }
}
//图表公用属性设置
const chartAttr = {
  // forceFit: true,  
  data: createChartData(chartData, ['ZPPUBSYSFlag', 'XMZYWCZT.Name']),  //数据源  传入图表数据 轴线的键值
  // radius: 0.8,
  angleField: 'ZPPUBSYSFlag',
  colorField: 'Name',
  label: {
    visible: true,
    type: 'inner',
  },
  xField: 'Name',  //x轴对应数据源的key  对于折线图和柱状图生效
  yField: 'ZPPUBSYSFlag', //y轴对应数据源的key 对于折线图和柱状图生效
  width:350,  //设置图的宽
  height:301, //设置图的高
  meta: {  //坐标轴的别名设置  对于柱状图生效
    Name: {
      alias: '名称',  
    },
    ZPPUBSYSFlag: {
      alias: '值',
    },
  },
}

function Workplace() {

  //待办事项渲染
  const RenderTodoList = (
    toDoList.map(item => {
      return (
        <List.Item key={item.Oid}>  
          <List.Item.Meta
            //头像  
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={
              <div className={styles.toDoItemContent}>
                <div className={styles.toDoContent}>{item.Title} </div>
                <div className={styles.toDoCreate}>创建人： {item.StartUser.FullName}</div>
              </div>
            }
            // 创建日期
            description={
              <span className={styles.datetime} title={item.CreateDate}>
                {/* {moment(item.CreateDate).fromNow()} */}
                {item.CreateDate}
              </span>
            }
          />
        </List.Item>
      );
    })
  )
  //页头渲染
  const PageHeaderContent = (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
              {/* 用户名 */}
          Tony
              {/* {currentUser.name}   */}
          ，祝你开心每一天！
            </div>
      </div>
    </div>)


  return (
    <>
      {/* 页头 */}
      <PageHeader
        // 标题
        title={
          <Title
            level={4}
            style={{
              marginBottom: 0,
              display: 'inline-block',
            }}
          >
          工作台
        </Title>
        }
      >
        {/* 内容 */}
        {PageHeaderContent}
      </PageHeader>
      {/* 主内容区 */}
      <div className={styles.pageContent}>
        <Row>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="待办事项"
              extra={<Link to="/">全部事项</Link>}
            >
              <List size="large">
                <div className={styles.activitiesList}>{RenderTodoList}</div>
              </List>
            </Card>
            <Card
              className={styles.projectList}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              bodyStyle={{padding: 0 ,height:355}}
            >
              {doingList.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.Oid}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          <Link to={"/"}>{item.ProjectLeader.FullName}</Link>
                        </div>
                      }
                      description={item.Name}
                    />
                    <div className={styles.projectItemContent}>
                      <div className={styles.proCreateuser}>创建人： {item.CreateUser.FullName}</div>
                      <div className={styles.datetime}>
                        创建时间： {item.Year}
                      </div>
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="饼图"
              bordered={false}
              className={styles.chart}
              bodyStyle={{textAlign:'center'}}
            >
              <PieChart {...chartAttr} />
            </Card>
            <Card
              title="环形图"
              bordered={false}
              className={styles.chart}
              bodyStyle={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}

            >
              <DonutChart {...chartAttr} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Workplace;