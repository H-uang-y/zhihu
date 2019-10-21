/*引入核心文件*/
import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

/*一般建议用函数的方法创建路由*/
const aa=(props)=>{
    return(
        <div>
            <Switch>
                {
                    props.routes.map((val,ind)=>{
                        if(val.path=='*'){
                            return <Redirect key={ind} to={val.redirect}/>
                        }else {
                            return <Route key={ind} path={val.path} component={val.component}/>
                        }
                    })
                }
            </Switch>
        </div>
    )
}

export default aa