/**
 * @name: index
 * @author mahai
 * @date 2022/10/21 11:34 AM
 * @description index
 */
import React, {useState, memo, useEffect, useRef} from "react";

import './styles/index';
import {Tooltip} from "antd";

const PortalMenu = memo(({tooltip, children, visibility, Icon, width=140}) => {

    const [visible,setVisible] = useState(false);

    const  tiklab_portal_menu = useRef(null);

    useEffect(() => {
        if (visible && visibility) {
            setVisible(!visibility)
        } else {
            setVisible(visibility)
        }
    }, [visibility]);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(tiklab_portal_menu.current && tiklab_portal_menu.current.contains(e.target)) {
            } else {
                setVisible(false)
            }
        });
        return() => window.removeEventListener('click', () => {
            setVisible(false)
        })
    },[visible]);
    return(
        <div className={'tiklab_portal'} ref={tiklab_portal_menu}>
            <div className={'tiklab_portal_block'}>
                <span className={visible ? "tiklab_portal_block_item tiklab_portal_block_linked" : 'tiklab_portal_block_item'} onClick={()=> setVisible(!visible)}>
                    <Tooltip title={tooltip} mouseEnterDelay={0.3}>
                        <span className={"tiklab_portal_block_icon"}>
                            {
                                Icon
                            }
                        </span>
                    </Tooltip>
                </span>
            </div>
            <div
                style={{width}}
                className={visible ? 'tiklab_portal_menu' : "tiklab_portal_menu tiklab_portal_hidden"}
            >
                {children}
            </div>
        </div>

    )
});

export default PortalMenu;
