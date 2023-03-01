/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {Component} from 'react';
import {WidgetWork} from './components';

class Home extends Component{

    constructor(props) {
        super(props);
    }
    render() {
        return(
            <WidgetWork {...this.props} isCe={true}/>
        )
    }
}

export default Home
