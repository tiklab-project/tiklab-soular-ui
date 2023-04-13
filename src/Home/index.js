import React, {Component} from 'react';
import {WidgetWork} from './components';

/**
 * 工作台
 */
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
