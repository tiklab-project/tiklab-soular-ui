/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {Component} from 'react';
import {WidgetWork} from 'tiklab-widget-ui'
class WorkBench extends Component{

    constructor(props) {
        super(props);
    }
    render() {
        return(
            <WidgetWork {...this.props} isCe={true}/>
        )
    }
}

export default WorkBench
