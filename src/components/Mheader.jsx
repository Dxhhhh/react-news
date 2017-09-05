import React,{Component} from 'react'
import {Form,Icon,Modal,Input,Button,Tabs,message} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'


import logo from '../images/logo.png'

class Mheader extends Component{

    state = {
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

    showModal = () =>(

        this.setState({ModalShow:true})

    )





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



    render () {
        const {selectedKeys,username,ModalShow} = this.state;
        const TabPane = Tabs.TabPane;
        const FormItem = Form.Item;
        const {getFieldDecorator,getFieldsValue} =  this.props.form;
        const icon = username? <Link to="/user_center"><Icon type="inbox" /></Link>:<Icon type="setting" onClick={this.showModal}/>
        return (
            <Form>
                <div id="mobileheader">
                    <header>
                        <Link to="/">
                            <img src={logo}/>
                            <span>ReactNews2</span>
                        </Link>
                        {icon}

                    </header>
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
                </div>
            </Form>
            )
    }
}
export default Form.create()(Mheader)