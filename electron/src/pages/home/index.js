/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-30 10:33
 * @description：index
 * @update: 2021-09-30 10:33
 */
import { Button, message } from 'antd'
import React, { memo,useEffect } from 'react'


export default memo(function HomePage() {
    return (
        <div>
            <Button onClick={() => message.info('info----')}>+++++++2</Button>
        </div>
    )
})
