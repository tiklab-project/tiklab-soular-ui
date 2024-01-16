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
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
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
