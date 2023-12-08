import React from 'react';
import {Row,Col} from "antd";
import OpLogWidget from './OplogWidget';
import QuickEntry from "./QuickEntry";
import './WidgetWork.scss';

/**
 * 工作台
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWork = props =>{

    return (
        <Row className='workLayout'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="eas-home-limited">
                    <QuickEntry
                        history={props.history}
                    />
                    <OpLogWidget
                        history={props.history}
                    />
                </div>
            </Col>
        </Row>
    )
}


export default WidgetWork
