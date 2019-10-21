import React from 'react'
/*引入核心文件*/
import {Route,Redirect} from 'react-router-dom'
/*引入组件*/
import Details from '../component/details' /*这个详情页面*/
import Index from '../component/index' /*这个是首页的*/

import Comment from '../component/comment' /*评论的路由*/
import Share from '../component/share' /*分享的路由*/
import Collect from '../component/collect' /*收藏的路由*/

/*一般建议用函数的方法创建路由*/
const Yi = [
    {
        path:'/index',
        component:Index
    },
    {
        path:'/details',
        component:Details
    },
    {
        path:'/comment',
        component:Comment
    },
    {
        path:'/share',
        component:Share
    },
    {
        path:'/collect',
        component:Collect
    },
    {
        path:'*',
        redirect:'/index'
    }
];
export default Yi
