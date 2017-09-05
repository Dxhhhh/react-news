import React,{Component} from 'react'
import axios from 'axios'
import {Form,Button,Input,BackTop,Card,message} from 'antd'

 class MnewsDetail extends Component{

    state = {
        news :'',
        comments:[]
    }

    componentDidMount (){
        const FormItem = Form.Item
        const {uniquekey} = this.props.params
        const urlComment = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const news = response.data.pagecontent
                this.setState({news})
                document.title=response.data.title
            }
            )
        axios.get(urlComment)
            .then(response =>{
                const resule = response.data
                const comments = resule.map(({Comments,UserName,datetime})=>(
                    {Comments,UserName,datetime}
                ))
                this.setState({comments})
            })


    }

    componentWillReceiveProps(){
        this.componentDidMount()
    }

     handleClick =()=>{

        const userid = localStorage.getItem("userId")
         if(!userid){
            alert("请先登录")
             return
         }
        const {uniquekey} = this.props.params
         console.log(uniquekey)
        const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniquekey}`
         axios.get(url)
             .then(response=>{
                 message.success("收藏文章成功")

             })
     }

     handleSubmit =(event)=> {
         event.preventDefault()
         const userid = localStorage.getItem("userId")
         if(!userid){
             alert("请先登录")
             return
         }
         const {uniquekey} = this.props.params
         const comment = this.props.form.getFieldValue("comment")
         const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet=${comment}`
         axios.get(url)
             .then(response=>{
                 message.success("提交评论成功")
                 this.props.form.resetFields()
             })
     }

    render(){
        const {news,comments}= this.state
        const FormItem = Form.Item
        const {getFieldDecorator} =this.props.form
        const commentList = !comments?<p>暂无评论</p>:comments.map((comment,index)=>(
            <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        return (
            <div style={{"padding":"10px"}}>
                <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{"__html":news}}></div>
                <hr/>
                {commentList}
                <Form  onSubmit={this.handleSubmit}>
                    <FormItem label="您的评论">
                        {getFieldDecorator('comment')(
                            <Input type="textarea" placeholder="随便说点什么吧" />
                        )}
                        <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
                        <Button type="primary" onClick={this.handleClick}>收藏该文章</Button>

                    </FormItem>
                </Form>
                <BackTop/>
            </div>
        )
    }
}

export default Form.create()(MnewsDetail)