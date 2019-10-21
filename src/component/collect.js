
import React from 'react'

import '../style/collect.css'

import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import Dog from '../assest/dog.jpg'
import Star from '../assest/star.png'
import Download from '../assest/download.jpg'
import House from '../assest/house.jpg'
import Ling from '../assest/ling3.png'
import Banner from '../assest/banner.png'
class Details extends React.Component{
    state={
        arr:[],
        open: false,
    };

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    render(){
        // fix in codepen
        const sidebar = (<List>
            <div className="index_box">
                <div>
                    <img src={Dog} alt="" className="index_img"/> <span className="index_span">好刘婷</span>
                </div>

                <div>
                       <span>
                            <img src={Star} alt="" className="collect"/> <span className="collect_span">我的收藏</span>
                       </span>
                    <img src={Download} alt="" className="download"/> <span className="collect_span">离线下载</span>
                </div>
            </div>
            <div className="index_shou" onClick={this.shou.bind(this)}>
                <img src={House} alt="" className="house_img"/>
                <h3 className="house_h3">首页</h3>
            </div>
        </List>);

        return (<div>

            <Drawer
                className="my-drawer"
                style={{}}
                enableDragHandle
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
                <div className="box">
                    <img src={Ling} alt="" className="box_img" onClick={this.onOpenChange.bind(this)}/>
                    <span className="box_spana">{this.state.arr.length}条收藏</span>
                </div>
                <div className="today">
                    <ul className="todayUl">
                        {
                            this.state.arr.map((val,ind)=>{
                                console.log(val)
                                return <li className="todayDiv" onClick={this.details.bind(this,val.id)}>
                                    <h2 className="todayH2" >{val.title}</h2>
                                    <img src={val.img} alt="" className="todayImg"/>
                                </li>
                            })
                        }
                    </ul>
                </div>

            </Drawer>
        </div>);
    }
    componentDidMount(){
        var arr = [];
        /*取localStorage里面的数据*/
        for(var i=0;i<localStorage.length;i++){
          arr[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))
        }
        this.setState({
            arr:arr
        })
    }
    /*跳转到详情*/
    details(id){
        this.props.history.push({
            pathname:'/details',
            state:{
                id,
            }
        })
    }
    shou(){
        this.props.history.push('/index')
    }
}
export default Details