/**
 * @name: saasPortal
 * @author: mahai
 * @date: 2021-07-05 08:55
 * @description：saas 门户中心
 * @update: 2021-07-05 08:55
 */
import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Redirect} from "react-router";
import {removeUser, getUser, getVersionInfo} from "doublekit-core-ui";
import {useTranslation} from "react-i18next";
import {Col, Row, message, Dropdown, Button, Menu} from "antd";

import {LOGIN_STATUS} from "../login";

import Layout, {Header, Content, Footer, Aside} from '../Layout';
import {scopedClassMaker} from "../utils";
import frameApi from "../login/api";

import './components/header.scss';


const sc = scopedClassMaker('portal-header');

// sass 门户就是本地模式
const SaasPortal = props => {
    const {
        logo = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1735300731,83723593&fm=26&gp=0.jpg',
        routers,
        enterSearch,
        logoName,
        redirect,
        AsideComponent,
        FooterComponent,
        headerStyle={},
        portalLoginStore,
        searchComponent,
        MessageIconComponent,
        languageSelectData = [], // 切换语言包的数据
        accUrl,
        ...rest
    } = props;
    const { i18n } = useTranslation();

    const {logout, isLogin} = portalLoginStore;
    const [lan, setLan] = useState(i18n.language);
    const [currentLink, setCurrentLink] = useState(props.location.pathname);


    const styles = {
        height :'100%',
        ...rest.headerStyle
    }



    // 点击切换语言
    const onClickLan = async ({ key }) => {
        await i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };
    const menu = (
        <Menu onClick={onClickLan}>
            {
                languageSelectData.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );

    // 点击跳转 Nav 路由
    const changeNavLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'portal-header-link'}>
                    {
                        routers.map(item => {
                            return <div key={item.key} onClick={ () => changeNavLink(item)} className={currentLink === item.to ? 'portal-header-link-active' : null}> {item.title}</div>
                        })
                    }
                </div>
            )
        }
    }

    const saasLogout = () => {
        const user = getUser()
        if (user && user.ticket) {
            frameApi.logout(getUser().ticket).then(res => {
                if (!res.code){
                    removeUser()
                    location.href = `${accUrl}/login?redirect=${redirect}`
                }else {
                    return message.error(res.msg)
                }
            })

        } else {
            logout()
        }
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
        <Layout>
            <Header>
                {
                    !isLogin ? <Redirect to={redirect}/> :
                        <Row style={styles}>
                            <Col span={12}>
                                <div className={'portal-header'}>
                                    {logo && <div className={sc('logo', {extra: [logoName].join(' ')})}><img src={logo} alt={'logo'} /></div> }
                                    {renderRouter()}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={'portal-header-right'}>
                                    <div className='portal-header-right-search-wrap'>
                                        {searchComponent}
                                    </div>
                                    <div className={'portal-header-right-text'}>

                                        {
                                            MessageIconComponent
                                        }

                                        <Dropdown overlay={menu} className={'portal-header-dropdown'}>
                                            <Button>{lan}</Button>
                                        </Dropdown>
                                        <div className={'layout_header_right'}>
                                            <Button type={'link'} disabled = {showVersion().disable}>{showVersion().title}</Button>
                                            <span onClick={saasLogout}>退出</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                }
            </Header>
            <Layout>
                {AsideComponent && <Aside>{AsideComponent}</Aside>}
                <Content>{props.children}</Content>
            </Layout>
            {FooterComponent && <Footer>{FooterComponent}</Footer>}
        </Layout>
    )
}

export default inject(LOGIN_STATUS)(observer(SaasPortal))
