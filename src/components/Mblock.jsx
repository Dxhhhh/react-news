import React,{Component,PropTypes} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {Card} from 'antd'

export default class Mblock extends Component{

    static propTypes = {
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }

    state = {
        newsList :[]
    }

    componentDidMount (){
        const {type,count}=this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response=>{
                const resule = response.data
                const newsList = resule.map(({title,date,type,thumbnail_pic_s,uniquekey})=>(
                    {title,date,type,thumbnail_pic_s,uniquekey}
                ))
                this.setState({newsList})
            })
    }

    render () {

        const {newsList} = this.state

        const showNewsList = !newsList?<p>暂无数据</p>:newsList.map((news,index)=>(
            <Card  key={index} className="m_article list-item special_section clearfix">
                <Link to={`/news_detail/${news.uniquekey}`}>
                    <div className="m_article_img">
                        <img src={news.thumbnail_pic_s}/>
                    </div>
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{news.title}</span>
                        </div>
                    </div>

                    <div className="m_article_desc clearfix">
                        <div className="m_article_desc_l">
                            <span className="m_article_channel">{news.type}</span>
                            <span className="m_article_time">{news.date}</span>
                        </div>
                    </div>
                </Link>
            </Card>
        ))
        return (
            <div>
                {showNewsList}
            </div>
        )
    }
}