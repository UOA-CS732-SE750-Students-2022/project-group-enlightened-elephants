import React, { useContext, useState } from 'react'
import { Modal, Tabs, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined} from '@ant-design/icons'
import { AuthContext } from '../../comtext/authContext'
import useGet from '../../hooks/useGet'
import usePost from '../../hooks/usePost'
import useLocalStorage from '../../hooks/useLocalStorage'

// TODO: Add context

export function LoginModal(props) {

    const {loginModalVisible, setLoginModalVisible} = props
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
    const login = (value) => {

/*   // 获取私钥：
        const pem = useGet('/key',{})

        const password = value.password     //密码先加密

        // post请求体：(响应不要把密码一起发来！)
        const body = {
            username: value.username,
            password: {}
        }
        // 发送post请求：
        const {status,data} = usePost('/', body, {})
        // 处理错误：
        if (status === 442) {
            setErrMsg(data.message)
            setErrModalVisible(true)
        }else{
            setUserName(data.user.username)
            setUserId(data.user._id)
            setToken(data.token)
            setSuccessModalVisible(true)
            setIsLogin(true)
        }
*/
    }

    // 在这里写注册请求，逻辑同上
    const register = (value) => {
        setUserName(value.username)
        setSuccessModalVisible(true)
        setIsLogin(true)
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
        </ >
    )
}
