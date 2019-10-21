import React from 'react'
import {NavLink} from 'react-router-dom'
import {Drawer, List, NavBar, Icon} from 'antd-mobile';
import axios from 'axios'
import {Carousel, WingBlank} from 'antd-mobile';
import '../style/index.css'

/*banner图*/
import Dog from '../assest/dog.jpg'
import Star from '../assest/star.png'
import Download from '../assest/download.jpg'
import House from '../assest/house.jpg'
import Ling from '../assest/ling3.png'
import ling1 from '../assest/ling1.png'
import ling2 from '../assest/ling2.png'


class Index extends React.Component {
    state = {
        arr: [],
        brr:[],
        crr:[],
        open: true,
        /*走马灯*/
        data: ['1', '2', '3'],
        imgHeight: 176,
    };

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({open: !this.state.open});
        /*  if(args==true){
         var today = document.getElementsByClassName('today');
         today.style.zIndex = 999
         }*/
    };
    /*走马灯*/
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }

    render() {
        const sidebar = (
            /*抽屉*/
            <List>
                <div className="index_box">
                    <div>
                        <img src={Dog} alt="" className="index_img"/> <span className="index_span">好刘婷</span>
                    </div>

                    <div>
                       <span onClick={this.collect.bind(this)}>
                            <img src={Star} alt="" className="collect"/> <span className="collect_span">我的收藏</span>
                       </span>
                        <img src={Download} alt="" className="download"/> <span className="collect_span">离线下载</span>
                    </div>
                </div>

                <div className="index_shou">
                    <img src={House} alt="" className="house_img"/>
                    <h3 className="house_h3">首页</h3>
                </div>
            </List>);

        return (
            <div>
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight}}
                    enableDragHandle
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                </Drawer>

                <div>
                    <div className="box one">
                        <span onClick={this.onOpenChange.bind(this)}> <img src={Ling} alt="" className="Nav_img"/> <span className="Nav_span">首页</span></span>
                        <img src={ling1} alt="" className="nav_img1"/>
                        <img src={ling2} alt="" className="nav_img2"/>
                    </div>
                    {/*走马灯*/}
                    <WingBlank>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >

                            {this.state.brr.map((val, ind) => (
                                <div className="car_posi" key={ind}>
                                    <div className="car_posi_a">
                                        <a
                                            key={val}
                                            style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                height: this.state.imgHeight
                                            }}

                                        >
                                            <img
                                                src={val.image}
                                                alt=""
                                                style={{width: '100%', verticalAlign: 'top'}}
                                                className="Car_img"
                                                onLoad={() => {
                                                    // fire window resize event to change height
                                                    window.dispatchEvent(new Event('resize'));
                                                    this.setState({imgHeight: 'auto'});
                                                }}
                                            />
                                        </a>
                                    </div>
                                    <h3 className="car_posi_H">{val.title}</h3>
                                </div>
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>

                {/*今日新闻*/}
                <div className="today">
                    <h3 className="todayH">今日新闻</h3>
                    <ul className="today_Ul">
                        {
                            this.state.arr.map((val, ind) => {
                                return <li className="todayDiv" onClick={this.skip.bind(this, val.id)}
                                           key={ind}>
                                    <h2 className="todayH2">{val.title}</h2>
                                    <img src={val.images} alt="" className="todayImg"/>
                                </li>
                            })
                        }
                    </ul>
                </div>

                {/*滚动出的新闻*/}

                {/* <div className="today">
                 <h3 className="todayH">周一</h3>
                 <ul className="today_Ul">
                 {
                 this.state.arr.map((val, ind) => {
                 return <li className="todayDiv" onClick={this.skip.bind(this, val.id)}
                 key={ind}>
                 <h2 className="todayH2">{val.title}</h2>
                 <img src={val.images} alt="" className="todayImg"/>
                 </li>
                 })
                 }
                 </ul>
                 </div>*/}

            </div>
        );
    }

    componentDidMount() {
        axios.get('/api/4/news/latest').then((res) => {
            this.state.arr = res.data.stories;
            this.state.brr = res.data.top_stories;
            this.state.crr = res.data
            console.log(res.data.date);
        });
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll=()=> {
        console.log(1);
        //滚动条高度
        let _this = this;
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度
        if (scrollTop+clientHeight >= scrollHeight ) {
            console.log(1);
            axios.get('/api/4/news/before/'+this.state.crr.date).then((res)=>{
                console.log(res)
                _this.state.arr.push(res.data);
                _this.setState({
                    state:{
                        date:res.data.date,
                        arr:_this.state.arr
                    }
                })
                console.log(this.state.arr);
            })
        }
    }


    /*跳转到详情*/
    skip(e) {
        this.props.history.push({
            pathname: '/details',
            state: {
                id: e,
            }
        })
    }

    collect() {
        this.props.history.push('/collect')
    }
}


export default Index