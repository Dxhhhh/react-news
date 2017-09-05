import React ,{Component} from 'react'
import axios from 'axios'

import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message
} from 'antd'

import  {Link} from 'react-router'

import logo from '../images/logo.png'

 class NewsHeader extends Component{

    state = {
        selectedKeys:"top",
        username:"",
        ModalShow:false

    }

    componentDidMount () {
       // 读取本地保存的数据, 如果有更新状态

        const username = localStorage.getItem('username')
        if(username) {
            this.setState({username})
        }

    }
     setModalVisible(ModalShow){
         this.setState({ModalShow})
     }

    clickMenu = ({key})=>{
        this.setState({selectedKeys:key})
        if (key === 'register') {
            this.setState({
                ModalShow: true
            })
        }
    }



    submit(islogin,event){
        event.preventDefault()
        this.setState({ModalShow:false})
        const {getFieldsValue} =  this.props.form;
        console.log(getFieldsValue());
        const {username,passwordL,userName,password,r_password} = getFieldsValue()
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=`;
        if(islogin){
             url += `login&username=${username}&password=${passwordL}`
        }else{
             url += `register&r_userName=${userName}&r_password=${password}&r_confirmPassword=${r_password}`
        }
        console.log(url);
        axios.get(url)
            .then((response)=>{
                let result = response.data;

                if(islogin){
                    //登陆
                    if(result){
                        message.success('登陆成功');
                        let username = result.NickUserName;
                        let userId = result.UserId
                        this.setState({username});
                        localStorage.setItem('userId', userId)
                        localStorage.setItem('username', username)
                    }else{
                        message.error('登陆失败');
                    }

                }else{
                    //注册
                    if(result===true){
                        message.success('注册成功');
                    }else{
                        message.error('注册失败');
                    }
                }

             })

    }
    handleLogout = () =>{
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        this.setState({username:null})
        this.props.form.resetFields()
    }

    render (){
        const Item = Menu.Item;
        const {selectedKeys,username,ModalShow} = this.state;
        const TabPane = Tabs.TabPane;
        const FormItem = Form.Item;
        const {getFieldDecorator,getFieldsValue} =  this.props.form;

        const usershow = username?
            (
                <Item key="logout" className="register">
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Link to="/user_center">
                        <Button type="dashed">个人中心</Button>
                    </Link>&nbsp;&nbsp;
                    <Button onClick={this.handleLogout}>退出</Button>
                </Item>
            )
            :
            (
                <Item key="register" className="register" >
                    <Icon type="appstore"/> 登陆/注册
                </Item>
            )
        
        return  (
            <header>
                <Row >
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal"  onClick={this.clickMenu} selectedKeys={[selectedKeys]}>
                            <Item key="top">
                                <Icon type="appstore"/>头条
                            </Item>
                            <Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Item>
                            <Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Item>
                            <Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Item>
                            <Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Item>
                            <Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Item>
                            <Item key="keji">
                                <Icon type="appstore"/>科技
                            </Item>
                            <Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Item>
                            {usershow}
                        </Menu>
                        <Modal
                            visible={ModalShow}
                            title ="用户中心"
                            okText="关闭"
                            onOk={this.setModalVisible.bind(this, false)}
                            onCancel={this.setModalVisible.bind(this, false)}
                        >
                            <Tabs  type="card">
                                <TabPane tab="登陆" key="1">
                                    <Form onSubmit={this.submit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('username')(
                                                <Input type="text"  placeholder="请输入用户名" />
                                            )}

                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('passwordL')(
                                                <Input type="password"  placeholder="请输入密码" />
                                            )}

                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit">登陆</Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.submit.bind(this,false)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('userName')(
                                                <Input type="text"  placeholder="请输入用户名"   />
                                            )}

                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(
                                                <Input type="password"  placeholder="请输入密码" />
                                            )}

                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_password')(
                                                <Input type="r_password"  placeholder="请确认密码" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1} ></Col>
                </Row>
            </header>

            )
    }
}

export default Form.create()(NewsHeader);