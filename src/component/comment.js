/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import Back from '../assest/back.png'
import Confirm from '../assest/confirm.jpg'
import axios from 'axios'
import Zans from '../assest/zans.png'
import Sofa from '../assest/sofa.jpg'
/*手风琴效果*/
import { Accordion, List } from 'antd-mobile';
import '../style/comment.css'
class Comment extends React.Component{


    state = {
        arr:[],
        brr:[],
        crr:''
    };
    /*手风琴*/
    onChange = (key) => {
        console.log(key);
    };

    /*返回首页*/
  /*  details(){
        this.props.history.push('/details')
    }*/
    render(){
        function doubleNum(n) {
            const str = "" + n;
            return str.padStart(2, "0");
        };
        function date(timestamp, sep = "-") {
            var _date = new Date(timestamp);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1;
            var day = _date.getDate();
            return [year, month, day].map(doubleNum).join(sep);
        };
        function time(timestamp, sep = ":") {
            var _date = new Date(timestamp);
            var hours = _date.getHours();
            var minutes = _date.getMinutes();
            var seconds = _date.getSeconds();
            return [hours, minutes, seconds].map(doubleNum).join(sep);
        };
        function dateTime(timestamp, dateSep = "-", timeSep = ":") {
            return date(timestamp, dateSep) + " " + time(timestamp, timeSep);
        };

        return(<div>
            {/*导航条部分*/}
            <div className="box">
                <img src={Back} alt="" className="box_img"/>
                <span className="con_span">{(this.state.arr.length)+(this.state.brr.length)+'条点评'}</span>
                <img src={Confirm} alt="" className="con_img"/>
            </div>


            {/*手风琴*/}
            {/*长评*/}
            <div>
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header={this.state.arr.length+'条长评'}>
                        <List className="my-list">
                            
                            {/*如果长评的条数为零的时候显示这个这个图片*/}
                            <div className="Sofa_div" id="Sofa_div">
                                <img src={Sofa} alt="" className="Sofa_img"/>
                            </div>
                            
                            {
                                this.state.arr.map((val,ind)=>{
                                    return  <List.Item key={ind}>
                                        <div className="shou_div" key={ind}>
                                            <img src={val.avatar} alt="" id="shou_img1"/>
                                            <div className="shou_box">
                                                <h3 className="shou_box_h3">{val.author}</h3>
                                                <p className="shou_box_p">{val.content}</p>
                                                <p className="shou_box_p1">{
                                                    dateTime(val.time)
                                                }</p>
                                            </div>
                                            <div><img src={Zans} alt="" className="Zans"/><span className="Zans_span">{val.likes}</span></div>
                                        </div>
                                    </List.Item>
                                })
                            }
                        </List>
                    </Accordion.Panel>
                </Accordion>
            </div>

            {/*短评*/}
            <div>
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header={this.state.brr.length+'条短评'}>
                        {/*如果长评的条数为零的时候显示这个这个图片*/}
                        <div className="Sofa_div" id="Sofa_div">
                            <img src={Sofa} alt="" className="Sofa_img"/>
                        </div>
                        
                        {
                            this.state.brr.map((value,ind)=>{
                                return  <List className="my-list" key={ind}>
                                    <List.Item>
                                        <div className="shou_div">
                                            <img src={value.avatar} alt="" id="shou_img1"/>
                                            <div className="shou_box">
                                                <h3 className="shou_box_h3">{value.author}</h3>
                                                <p className="shou_box_p">{value.content}</p>
                                                <p className="shou_box_p1">
                                                    {dateTime(value.time)}
                                                </p>
                                            </div>
                                            <div><img src={Zans} alt="" className="Zans"/><span className="Zans_span">{value.likes}</span></div>
                                        </div>
                                    </List.Item>
                                </List>
                            })
                        }

                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>)
    }

    componentDidMount(){

        var aa = this.props.location.state.id;
        /*长评*/
        axios.get('/api/4/story/'+aa+'/long-comments').then((res)=>{
            this.setState({
               arr:res.data.comments,
            })
            /*判断当请求数据的时候有没有数据，没有的话显示的是沙发的图片*/
            var Sofa_div = document.getElementById('Sofa_div')
            if(this.state.arr==''){
                Sofa_div.style.display = 'block'
            }
        })
        /*短评*/
        axios.get('/api/4/story/'+aa+'/short-comments').then((res)=>{
            this.setState({
                brr:res.data.comments
            })
            /*判断当请求数据的时候有没有数据，没有的话显示的是沙发的图片*/
            var Sofa_div = document.getElementById('Sofa_div')
            if(this.state.brr==''){
                Sofa_div.style.display = 'block'
            }
        })
    }
}

export default Comment