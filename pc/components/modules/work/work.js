/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {Component} from 'react';
import {WidgetWork} from 'tiklab-widget-ui'
import {Widgets} from "./widgets";

class WorkBench extends Component{

    render() {
        return(
            <WidgetWork Widgets={Widgets}/>
        )
    }
}

export default WorkBench
