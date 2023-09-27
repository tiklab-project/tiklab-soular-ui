/**
 * @name: index
 * @author mahai
 * @date 2022/10/21 11:34 AM
 * @description index
 */
import React, {useState, memo, useEffect, useRef} from "react";
import './styles';

const PortalMenu = memo(({tooltip, children, visibility, Icon, onClick,width=140}) => {

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

    const link = () =>{
        setVisible(!visible)
    }

    return(
        <div className="eas_dropdown" ref={tiklab_portal_menu}>
            <div className="eas_dropdown_block">
                <span
                    className={`eas_dropdown_block_item ${visible? "eas_dropdown_block_linked": ''}`}
                    onClick={onClick? onClick : link}
                >
                    <span className="eas_dropdown_block_icon" data-title-bottom={tooltip}>
                        { Icon }
                    </span>
                </span>
            </div>
            {
                children &&
                <div style={{width}} className={`eas_dropdown_menu ${visible?"":"eas_dropdown_hidden"}`} >
                    {children}
                </div>
            }
        </div>
    )
});

export default PortalMenu;
