import React ,{Component} from 'react'
import {Row,Col} from 'antd'
import axios from 'axios'
import NewsComment from './news_comments'
import NewsImageBlock from './news_image_block'


export default class NewsDetail extends Component{

    state = {
        content:'',

    }

    componentDidMount(){
        const {uniquekey} = this.props.params
        console.log(uniquekey)
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const content = response.data
                this.setState({content})
                //console.log(content)
                document.title = content.title
            })
    }

    componentWillReceiveProps(){
        this.componentDidMount()
    }

    render (){
        const {content} = this.state
        //console.log(content.uniquekey)

        let {uniquekey} = this.props.params

        return (
            <Row>
                <Col span={1}></Col>
                <Col span={16} className='container'>
                    <div dangerouslySetInnerHTML={{__html:content.pagecontent}}></div>
                    <NewsComment uniquekey={uniquekey}></NewsComment>
                </Col>
                <Col span={6}>
                    <NewsImageBlock type="top" count={22} cardTitle="相关新闻" cardWidth= "100%"  imageWidth="150px"></NewsImageBlock>
                </Col>
                <Col span={1}></Col>
            </Row>
    )}
}

