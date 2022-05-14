import React, { useContext, useState } from 'react'
import { Menu, Modal, Button } from 'antd'
import { HomeOutlined, UserOutlined, LoginOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'

import { LoginModal } from '../LoginOutModal'
import { AuthContext } from '../../context/authContext'

export default function Nav() {

    var [current, setCurrent] = useState('home')
    var [loginModalVisible, setLoginModalVisible] = useState(false)
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const { isLogin, userName } = useContext(AuthContext)

    /* 
      The click event of menu: 
        1. Highlight the selected item.
        2. If click Login, pop-up the login model.
        2. If click Logout, pop-up the logout model.
    */
    const handleMenuClick = (e) => {
        setCurrent(e.key)
        if (e.key === 'login') {
            setLoginModalVisible(true)
        }
        if (e.key === 'logout') {
            setLogoutModalVisible(true)
        }
    }

    return (
        <div>
            {/* The Menu component of Antd. */}
            <Menu onClick={handleMenuClick} selectedKeys={[current]} mode='horizontal'>
                <Menu.Item key='home' icon={<HomeOutlined />}>
                    <Link to='/home'>Home</Link>
                </Menu.Item>
                <Menu.Item key='contact' icon={<MailOutlined />}>
                    <Link to='/contact'>Contact Us</Link>
                </Menu.Item>
                {isLogin ?
                    <SubMenu
                        title={userName}
                        style={{ position: 'absolute', right: '10px' }}
                        key='userCenter'
                        icon={<UserOutlined />}
                    >
                        <Menu.ItemGroup title="User Center">
                            <Menu.Item key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu> :
                    <Menu.Item style={{ position: 'absolute', right: '10px' }} key='login' icon={<LoginOutlined />}>
                        Login|Register
                    </Menu.Item>
                }
            </Menu>
            <LoginModal loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} logoutModalVisible={logoutModalVisible} setLogoutModalVisible={setLogoutModalVisible} />
        </div >
    )
}
