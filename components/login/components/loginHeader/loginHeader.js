import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {scopedClassMaker} from "../../../utils";
import {Button, Dropdown, Menu, Select} from "antd";
import './loginHeader.scss';

const sc = scopedClassMaker('portal-login');

const LoginHeader  = (props) => {
    const {
        staticContext,
        logoImg,
        className,
        logoName,
        pickerData,
        country = [],  // 语言包的选项数据
        ... rest
    } = props;

    const { t, i18n } = useTranslation();
    const [lan, setLan] = useState(i18n.language)

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(country[key].value)
        setLan(country[key].value)
    };

    const menu = (
        <Menu onClick={onClickLan}>
            {
                country.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );
    // 切换系统的方法
    const handelSystem = value => {
        const index = pickerData.findIndex(i => i.value === value)
        const url = pickerData[index].url
        window.open(url)
    }
    // end
    return (
        <div className={sc('header', {extra: [className].join(' ')})}>
            <div className={'portal-login-logo'}>
                {logoImg && <div className={sc('image', {extra: [logoName].join(' ')})}><img src={logoImg} alt={'logo'} /></div> }
            </div>
            <div>
                {
                    pickerData.length > 0 && <Select
                        placeholder="请选择进入的系统"
                        style={{ width: '150px' }}
                        options={pickerData}
                        onSelect={ value => handelSystem(value)}
                    />
                }
                <Dropdown overlay={menu} className={'portal-login-dropdown'}>
                    <Button>{lan}</Button>
                </Dropdown>

                {t('help')}
            </div>
        </div>
    )
}

export default LoginHeader
