import React,{Component,PropTypes} from 'react'
import {Form,Card,Input,Button,Tooltip,notification,BackTop  } from 'antd'
import axios from 'axios'

const FormItem = Form.Item;

class NewsComment extends Component{

    static propTypes = {
        uniquekey:PropTypes.string.isRequired
    }

    state = {
        comments:[]
    }

    componentDidMount(){
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const comments = response.data
                this.setState({comments})
            })
    }

    componentWillReceiveProps(){
        this.componentDidMount()
    }

    handleSubmit =(event) =>{
        event.preventDefault()
        const userid = localStorage.getItem("userId")
        if(!userid){
            {/*<Tooltip placement="Top">请先登录</Tooltip>*/}
            alert("请先登录")
            return
        }
        const {uniquekey} = this.props

        const { getFieldValue,resetFields} = this.props.form;
        const comment = getFieldValue('comment');
        const url =` http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet=${comment}`
        //提交评论
        axios.get(url)
            .then(response=>{
                this.componentDidMount()
                notification.success({
                    message: '提交评论成功'
                })
                resetFields()
            })
    }


    //收藏文章
    clickSubmit = ()=>{
        const userid = localStorage.getItem("userId")
        if(!userid){
            alert("请先登录")
            return
        }
        const {uniquekey} = this.props.params

        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniquekey}`


        axios.get(url)
            .then(response=>{
                notification.success({
                    message: '收藏文章成功'
                })
            })
    }

    render(){
        const {comments} = this.state
        const { getFieldDecorator} = this.props.form;

        const commentList =  comments.map((comment,index)=>(
            <Card key={index} extra={`发布于${comment.datetime}`} title={comment.UserName}>
                {comment.Comments}
            </Card>
        ))
        return (
           <div>
               {commentList}
               <Form onSubmit={this.handleSubmit}>

                   <FormItem label="您的评论">
                       {getFieldDecorator('comment')(
                           <Input  type='textarea' placeholder="请输入评论内容"  />
                       )}
                   </FormItem>
                   <FormItem>
                       <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
                       <Button type="primary" onClick={this.clickSubmit}>收藏该文章</Button>
                   </FormItem>
               </Form>
               <BackTop />
           </div>
        )

    }
}

export default Form.create()(NewsComment)