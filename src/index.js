import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from  'react-router';
import App from './components/app';
import NewsContainer from './components/news_container';
import NewsDetail from './components/news_detail';
import UserCenter from './components/user_center';
import Mapp from './components/Mapp'
import Mcontainer from './components/Mcontainer'
import MnewsDetail from './components/MnewsDetail'



import './componentCss/pc.css'
import './componentCss/mobile.css'


const MediaQuery = require('react-responsive');
render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={NewsContainer}/>
                    <Route path='/news_detail/:uniquekey' component={NewsDetail}/>
                    <Route path='/user_center' component={UserCenter}/>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={Mapp}>
                    <IndexRoute component={Mcontainer}/>
                    <Route path='/news_detail/:uniquekey' component={MnewsDetail}/>
                    <Route path='/user_center' component={UserCenter}/>
                </Route>
            </Router>
        </MediaQuery>
    </div>
), document.getElementById('root'));


