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
            <div>
                <WidgetWork {...this.props}/>
            </div>

        )
    }
}

export default WorkBench
