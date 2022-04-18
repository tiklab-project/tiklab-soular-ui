/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-25 09:09:40
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-25 16:54:43
 */

import React, {useState} from 'react';
import { Button,Row,Col} from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import AddWorkBench from "./components/workBenchAdd"
import "./components/workBench.scss"
const WorkBench = (props) => {
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };

    const workList = [
        {
            name: "接口管理",
        },
        {
            name: "自动化测试",
        },
        {
            name: "接口管理",
        },
        {
            name: "接口管理",
        },
        {
            name: "自动化测试",
        },
        {
            name: "接口管理",
        }
    ]
    return(
        <Row justify={'center'} style={{width:'100%'}}>
            <Col xl={{span:24}} xxl={{span:16}}>
                    <div>
                    <div className="title">
                        应用链接管理
                    </div>
                    <div className="box-gather">
                        {
                            workList && workList.map((item,index)=> {
                                return <div className="box-item" key={index}>
                                    <div className="box-icon">
                                        {item.name}
                                    </div>
                                    <div className= "box-operate">
                                        <Button type="link">编辑</Button>
                                        <Button type="link" danger>
                                            删除
                                        </Button>
                                    </div>
                                </div>
                            })
                        }
                        <div className="box-item" onClick={()=>showModal() }>
                            <div className="box-icon">
                                <PlusOutlined className={{fontSize: 20}}/>
                            </div>
                            <div className= "box-operate">
                                <Button type="link">编辑</Button>
                                <Button type="link" danger>
                                    删除
                                </Button>
                            </div>
                        </div>
                    </div>
                    <AddWorkBench 
                        {...props}
                        visible = {visible}
                        setVisible = {setVisible}
                    />
                </div>  
                </Col>
            </Row> 
    )
}

export default WorkBench;
// export default inject('orgStore')(observer(OrgContent))