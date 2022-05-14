import React, { useContext, useState } from 'react'
import { Modal, Tabs, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined} from '@ant-design/icons'
import axios from 'axios'
import { AuthContext } from '../../comtext/authContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import JSEncrypt from 'jsencrypt/bin/jsencrypt';

export function LoginModal(props) {

    const {loginModalVisible, setLoginModalVisible, logoutModalVisible, setLogoutModalVisible} = props
    const {setIsLogin, userName, setUserName, setUserId} = useContext(AuthContext)
    const [successModalVisible, setSuccessModalVisible] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [errModalVisible, setErrModalVisible] = useState(false)
    const [token, setToken] = useLocalStorage('token', null)

    const [form] = Form.useForm()

    const { TabPane } = Tabs;

    /* 
        The event of closing the Model
    */
    const handleCancel = () => {
        setLoginModalVisible(false)
        setSuccessModalVisible(false)
        setErrModalVisible(false)
    }

    /* The event of finishing the form. */
    // TODO: 在这里写登录请求
    const login = async (value) => {
        // Get public key with pem
        const res  = await axios.get('/user/key')
        const pem = res.data
        // Encrypt
        const encryptor = new JSEncrypt()
        encryptor.setPublicKey(pem)
        const ciphierText = encryptor.encrypt(value.password)
        // Defien username and password
        const userInfo = {
            username : value.username,
            password : ciphierText
        }
        // console.log(userInfo.username);
        // const body = JSON.stringify(userInfo)
        // Login
        const {status, data} = await axios.post("/user/login", userInfo).catch((error) => {
            setErrMsg(error.response.data.message)
            setErrModalVisible(true)
        })
        if (status === 422) {
            setErrMsg(data.message)
            setErrModalVisible(true)
        }else{
            setUserName(data.user.username)
            // setUserId(data.user._id)
            setToken(data.token)
            setIsLogin(true)
            setSuccessModalVisible(true)
        }
    }

    // 在这里写注册请求，逻辑同上
    const register = async (value) => {

        // Get public key with pem
        const pem  = (await axios.get('/user/key')).data
        // Encrypt
        const encryptor = new JSEncrypt()
        encryptor.setPublicKey(pem)
        const ciphierText = encryptor.encrypt(value.password)
        // Defien username and password
        const body = {
            username : value.username,
            password : ciphierText
        }
        // Register
        const {status, data} = await axios.post("/user/register", body).catch((error) => {
            console.log(error)
            setErrMsg(error.response.data.message)
            setErrModalVisible(true)
        })
        if (status === 442) {
            setErrMsg(data.message)
            setErrModalVisible(true)
        }
        if (status === 200){
            setUserName(data.user.username)
            // setUserId(data.user._id)
            setToken(data.token)
            setIsLogin(true)
            setSuccessModalVisible(false)
        }
    }

    const logOut = () => {
        setIsLogin(false)
        setUserName(null)
        setUserId(null)
        setToken(null)
        setLogoutModalVisible(false)
    }

    return (
        <>
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
                <Tabs defaultActiveKey="login">
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
                            onFinish={login}
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
                            onFinish={register}
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
                Hi {userName}!
            </Modal>
            <Modal
                title="Error"
                visible={errModalVisible}
                onCancel={()=>setErrModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={()=>setErrModalVisible(false)}>
                        Re-login
                    </Button>]
                }>
                Error occur: {errMsg}
            </Modal>
            <Modal
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
            </Modal>
        </ >
    )
}
