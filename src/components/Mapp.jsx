import React ,{Component} from 'react'
import Mheader from './Mheader'
import NewsFooter from './news_footer'


export default class Mapp extends Component{

    render (){
        return (
            <div>
                <Mheader/>
                {this.props.children}
                <NewsFooter/>
            </div>
        )


    }
}