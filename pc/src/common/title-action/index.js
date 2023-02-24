/**
 * @name: 左标题 右操作按钮
 * @author mahai
 * @date 2022/10/28 2:37 PM
 * @description index
 */

import React from "react";
import { Row, Col, Space} from "antd";

import './style/index.scss';

const TitleAction = ({title, icon, children, style={}}) => {

    return(
        <Row>
            <Col span={24}>
                <div className={'tiklab_title'} style={style}>
                    <Space>
                        {icon}
                        <span>
                            {title}
                        </span>
                    </Space>

                    {children}
                </div>
            </Col>
        </Row>
    )
};
export default TitleAction
