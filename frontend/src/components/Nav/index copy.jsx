import React, { useState } from 'react'
import { Menu, Modal, Tabs, Form, Input, Button, Checkbox } from 'antd'
import { HomeOutlined, UserOutlined, LockOutlined, LoginOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'

// TODO: Add context

export default function Nav() {

    var [current, setCurrent] = useState('home')
    var [loginModalVisible, setLoginModalVisible] = useState(false)
    var [successModalVisible, setSuccessVisible] = useState(false)
    var [isLogin, setIsLogin] = useState(false)
    // var [logState, setLogState] = useState('Login|Register')
    var [uName, setUName] = useState(null)

    const [form] = Form.useForm()

    const { TabPane } = Tabs;

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

    /* 
        The event of closing the Model
    */
    const handleCancel = () => {
        setLoginModalVisible(false)
        setSuccessVisible(false)
    }

    /* 
        The event of changing Tabs of Login Modal.
    */
    const changeTabs = () => { }

    /* The event of finishing the form. */
    const finishLoginForm = (value) => {
        setIsLogin(true)
        setUName(value.username)
        // setLogState(value.username)
        // console.log(value);
        setSuccessVisible(true)
    }
    const finishRegisterForm = (value) => {
        setSuccessVisible(true)
        setUName(value.username)
    }

    const logOut = () => {

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
                        title={
                            <span className="submenu-title-wrapper">
                                {uName}
                            </span>
                        }
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

            {/* Modal component: The pop-up box of Antd. */}
            <Modal
                title="Login"
                visible={loginModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>]}>
                {/* Tabs component of Antd. */}
                <Tabs defaultActiveKey="login" onChange={changeTabs}>
                    <TabPane tab="Login" key="login">
                        {/* 
                            THe Form component of Antd.
                        */}
                        <Form
                            name="login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={finishLoginForm}
                            form={form}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Register" key="registr">
                        <Form
                            name="registr"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={finishRegisterForm}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="passwordConfirm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password again!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
            <Modal
                title="Login"
                visible={successModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Ok
                    </Button>]
                }>
                Hi {uName}!
            </Modal>
        </div >
    )
}