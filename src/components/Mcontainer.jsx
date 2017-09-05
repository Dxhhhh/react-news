import React,{Component} from 'react'
import {Tabs,Carousel} from 'antd'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import Mblock from './Mblock'

export default class Mcontainer extends Component{


    render () {
        const TabPane = Tabs.TabPane
        return (
            <Tabs>
                <TabPane tab="头条" key="1">
                    <div style={{"width":"100%"}}>
                        <Carousel autoplay>
                            <div><img src={carousel_1}/></div>
                            <div><img src={carousel_2}/></div>
                            <div><img src={carousel_3}/></div>
                            <div><img src={carousel_4}/></div>
                        </Carousel>
                    </div>
                    <Mblock type="top" count={30}></Mblock>
                </TabPane>
                <TabPane tab="社会" key="2">
                    <Mblock type="shehui" count={30}></Mblock>
                </TabPane>
                <TabPane tab="国际" key="3">
                    <Mblock type="guoji" count={30}></Mblock>
                </TabPane>
                <TabPane tab="国内" key="4">
                    <Mblock type="guonei" count={30}></Mblock>
                </TabPane>
                <TabPane tab="娱乐" key="5">
                    <Mblock type="yule" count={30}></Mblock>
                </TabPane>
            </Tabs>
        )
    }
}