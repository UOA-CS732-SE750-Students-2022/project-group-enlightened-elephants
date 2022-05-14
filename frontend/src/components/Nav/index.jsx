import React, { useContext, useState } from 'react'
import { Menu, Modal, Button } from 'antd'
import { HomeOutlined, UserOutlined, LoginOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SubMenu from 'antd/lib/menu/SubMenu'
import { LoginModal } from '../LoginOutModal'
import { AuthContext } from '../../comtext/authContext'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function Nav() {

    var [current, setCurrent] = useState('home')
    var [loginModalVisible, setLoginModalVisible] = useState(false)
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const { isLogin, setIsLogin, userName, setUserName, userId, setUserId } = useContext(AuthContext)

    const [token, setToken] = useLocalStorage('token')

    const autoLogin =async () => {
        try {
            const {data} = await axios({
                method: 'get',
                url: '/user/tokenLogin',
                headers: {
                    token: token
                }
            })
            setUserName(data.setUserName(data.user.username))
            setIsLogin(true)
        } catch (error) {
            console.log(error);
        }
    }

    if (!isLogin && token) {
        autoLogin()
    }

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

    // const logOut = () => {
    //     setIsLogin(false)
    //     setUserName(null)
    //     setUserId(null)
    //     setToken(null)
    //     setLogoutModalVisible(false)
    // }

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
            {/* <Modal
                title="Logout"
                visible={logoutModalVisible}
                onCancel={() => setLogoutModalVisible(false)}
                footer={[
                    <Button key="ok" onClick={logOut}>
                        Ok
                    </Button>,
                    <Button key="cancel" onClick={() => setLogoutModalVisible(false)}>
                        Cancel
                    </Button>
                    ]
                }>
                Confirm Quit!
            </Modal> */}
        </div >
    )
}
