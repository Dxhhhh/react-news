import React ,{Component} from 'react'
import {Row,Col,Tabs,Card,Upload,Modal,Icon} from 'antd'
import axios from 'axios'

const TabPane = Tabs.TabPane;

export default class UserCenter extends Component{

    state = {
        countArr: null,
        commentsList:null,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })



    componentDidMount(){
        const userid = localStorage.getItem("userId")
        //console.log(userid)
        const url1 = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userid}`
        const url2 = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userid}`
        axios.get(url1)
            .then(response=>{
                const result = response.data
                const countArr = result.map(({uniquekey,Title})=>(
                    {uniquekey,Title}
                ))
                //console.log(countArr);
                this.setState({countArr})

            })
        axios.get(url2)
            .then(response=>{
                const result = response.data
                const commentsList = result.map(({uniquekey,datetime,Comments})=>(
                    {uniquekey,datetime,Comments}
                ))
                //console.log(countArr);
                this.setState({commentsList})

            })
    }

    render (){

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        const {countArr,commentsList} = this.state
        const list = !countArr?"暂无收藏":(
            countArr.map((count,index)=>(
                <Card key={index} title={count.uniquekey} extra={<a href={`#/news_detail/${count.uniquekey}`}>查看</a>}>
                    <p>{count.Title}</p>
                </Card>
            ))

        )

        const CommentsList = !commentsList?"暂无评论":(

            commentsList.map((count,index)=>(
                <Card key={index} title={`于${count.datetime}评论了文章${count.uniquekey}`} extra={<a href={`#/news_detail/${count.uniquekey}`}>查看</a>}>
                    <p>{count.Comments}</p>
                </Card>
            ))

        )


        const photo =(
        <div className="clearfix">
            <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>)


        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="我的收藏列表" key="1">
                            {list}
                        </TabPane>
                        <TabPane tab="我的评论列表" key="2">
                            {CommentsList}
                        </TabPane>
                        <TabPane tab="头像设置" key="3">
                            {photo}
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>
            </Row>
        )
    }
}