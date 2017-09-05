import React,{Component,PropTypes} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router'
import axios from 'axios';


export default class NewsImageBlock extends Component{

    state = {
        newsArr:null
    }
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cardTitle: PropTypes.string.isRequired,
        cardWidth: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
    }

    componentDidMount () {
        let {type,count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        console.log(url)
        axios.get(url)
            .then(response =>{
                var result = response.data
                //console.log(result)//数组
                let newsArr = result.map(({title,uniquekey,author_name,thumbnail_pic_s})=>(
                    {title,uniquekey,author_name,thumbnail_pic_s}
                ))
                // console.log(newsArr);

                this.setState({newsArr})

                // console.log(this.state)

            })
    }


    render (){
        const {newsArr} = this.state
        const {cardTitle, cardWidth, imageWidth} = this.props
        // console.log(newsArr)
        //

        const imgStyle={
            display: "block",
            height: "90px",
            width: imageWidth
        }
        const textStyle = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: imageWidth
        }



        const list = !newsArr?<p>未找到数据</p>:(
            newsArr.map((news,index)=>(
                <div key={index} className="imageblock">
                    <Link to={`/news_detail/${news.uniquekey}`} key={index}>
                        <div>
                            <img src={news.thumbnail_pic_s} style={imgStyle}/>
                        </div>
                        <div className="custom-card">
                            <h3 style={textStyle}>{ news.title}</h3>
                            <p>{news.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
        )



        return (
            <Card className="topNewsList" title={cardTitle} style={{width:cardWidth}}>

                {list}

            </Card>
        )
    }
}