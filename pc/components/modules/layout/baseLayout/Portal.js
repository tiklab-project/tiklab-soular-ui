/**
 * @Author: mahai
 * @Description: Enter feature description here
 * create: $2022/1/25
 */
import React, {useState} from 'react';
import {getVersionInfo} from 'doublekit-core-ui';
import {verifyUserHOC, useWorkAppConfig} from 'doublekit-eam-ui'
import {Button} from "antd";
import logo from '../../assets/images/logo.jpeg'
import styles from './layout.module.scss'



const Portal = props => {

    const {history} = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);

    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);

    const homeRouter = [
        {
            to:'/work',
            title:'工作台',
            key: '/work'
        },{
            to:'/setting',
            title:'设置',
            key: '/setting'
        },
        {
            to:'/orga',
            title:'组织中心',
            key: 'org'
        },
        {
            to:'/system',
            title:'系统管理',
            key: 'system'
        },
    ]

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }


    const Logout = () => {
        history.push('/logout')
    }

    const showVersion = () => {
        const info = getVersionInfo();
        switch (info.release) {
            case 1:
                return {
                    title:"社区版",
                    disable: false
                }
            case 2:
                return {
                    title:"企业版",
                    disable: !info.expired
                }

            case 3:
                return {
                    title:"SASS版",
                    disable: !info.expired
                }
            default:
                return {
                    title:"社区版",
                    disable: false
                }
        }
    }
    return(
        <main className={styles.layout}>
            <header className={styles.layout_header}>
                <div className={styles.layout_header_left}>
                    {component}
                    <div className={styles.layout_header_left_logo}>
                        <img alt={'...'} src={logo}/>
                    </div>
                    <div className={styles.layout_header_left_link}>
                        {
                            homeRouter.map(item => {
                                return <span key={item.key} onClick={ () => changeCurrentLink(item)} className={currentLink === item.to ? styles.layout_header_left_link_active : null} style={{padding:'0 8px'}}> {item.title}</span>
                            })
                        }
                    </div>
                </div>

                <div className={styles.layout_header_right}>
                    <Button type={'link'} disabled = {showVersion().disable}>{showVersion().title}</Button>
                    <span onClick={Logout}>退出</span>
                </div>
            </header>
            <section className={styles.layout_content}>
                <div style={{width:'100%'}}>
                    {props.children}
                </div>
            </section>
            <footer className={styles.layoutFooter}>
                <div>
                    DARTHCLOUD
                </div>
            </footer>
            {ModalComponent}
            {editOrAddModal}
        </main>
    )
};
const verifyPortal = verifyUserHOC(Portal)
export default verifyPortal
