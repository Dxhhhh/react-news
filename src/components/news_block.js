import React,{Component,PropTypes} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router'
import axios from 'axios';

export default class NewsBlock extends Component{

    state = {
        newsArr:null
    }

    static propTypes ={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired

    }

    componentDidMount () {
        let {type,count} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        console.log(url)


        axios.get(url)
            .then(response =>{
                var result = response.data
                console.log(result)//数组
                let newsArr = result.map(({title,uniquekey})=>(
                    {title,uniquekey}
                ))
                console.log(newsArr);

                this.setState({newsArr})

            //    console.log(this.state)

            })
    }


    render (){
        const {newsArr} = this.state
        // console.log(newsArr)

        const list = !newsArr?<p>未找到数据</p>:(
            <ul>
                {
                     newsArr.map((news,index)=>(
                        <li key={index}><Link to={`/news_detail/${news.uniquekey}`}>{ news.title}</Link></li>
                     ))
                }
            </ul>
        )



        return (
            <Card className="topNewsList">

                    {list}

            </Card>
            )
    }
}