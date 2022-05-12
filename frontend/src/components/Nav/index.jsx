import React, { useState } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined, LoginOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'
import {LoginModal} from '../LoginOutModal'

export default function Nav() {

    var [current, setCurrent] = useState('home')
    var [loginModalVisible, setLoginModalVisible] = useState(false)
    // var [successModalVisible, setSuccessVisible] = useState(false)
    var [isLogin, setIsLogin] = useState(false) 
    // var [logState, setLogState] = useState('Login|Register')
    // var [uName, setUName] = useState(null)

    /* 
      The click event of menu: 
        1. Highlight the selected item.
        2. If click Login, pop-up a model.
    */
    const handleMenuClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'login') {
            setLoginModalVisible(true)
        }
    }

    return (
        <div>
            {/* 
                The Menu component of Antd.
                    selectedkeys: The key of highlighted item. 
            */}
            <Menu onClick={handleMenuClick} selectedKeys={[current]} mode='horizontal'>
                {/* Items */}
                <Menu.Item key='home' icon={<HomeOutlined />}>
                    <Link to='/home'>Home</Link>
                </Menu.Item>
                <Menu.Item key='contact' icon={<MailOutlined />}>
                    <Link to='/contact'>Contact Us</Link>
                </Menu.Item>
                {isLogin ?
                    <SubMenu
                        title={'User'} // TODO: USER NAME
                        style={{ position: 'absolute', right: '10px' }}
                        key='userCenter'
                        icon={<UserOutlined />}
                    >
                        <Menu.ItemGroup title="User Center">
                            <Menu.Item key="logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu> :
                    <Menu.Item style={{ position: 'absolute', right: '10px' }} key='login' icon={<LoginOutlined />}>
                        Login|Register
                    </Menu.Item>
                }
            </Menu>
            <LoginModal loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} setIsLogin={setIsLogin}/>
        </div >
    )
}
