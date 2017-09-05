import React ,{Component} from 'react'
import {Row ,Col} from 'antd'

export default class NewsFooter extends Component{

    render (){
       return(
           <Row>
               <Col span={1}></Col>
               <Col span={22} style={{padding: "20px",textAlign: "center"}}>2017 ReactNews. All Rights Reserved.</Col>
               <Col span={1}></Col>
           </Row>
       )
    }
}