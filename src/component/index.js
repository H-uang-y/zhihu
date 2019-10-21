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
        arr: {
            stories: [],
            top_stories: [],
            data: [],
        },
        open: false,
        /*走马灯*/
        date: new Date().toLocaleDateString().split('/').join(''),
        imgHeight: 176,
    };

    onOpenChange = (...args) => {
        this.setState({open: !this.state.open});

        if(args==false){
            var index_box = document.getElementById('index_box')
            index_box.style.zIndex = 999
        }

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
                <div className="index_box1 index_box">
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
                        <span onClick={this.onOpenChange.bind(this)}> <img src={Ling} alt="" className="Nav_img"/> <span
                            className="Nav_span">首页</span></span>
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

                            {this.state.arr.top_stories.map((val, ind) => (
                                <div className="car_posi" key={ind}>
                                    <div className="car_posi_a">
                                        <a
                                            key={val}
                                            style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                height: this.state.imgHeight
                                            }}
                                            className="car_a"
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
                    {
                        this.state.arr.data.map((val, ind) => {
                            return <div key={ind}>
                                <h3 className="todayH">{
                                    val.date === (new Date().toLocaleDateString().split('/').join('')) ? '今日新闻' : val.date
                                }</h3>
                                <ul className="today_Ul">
                                    {
                                        val.stories.map((value, index) => {
                                            return <li className="todayDiv" onClick={this.skip.bind(this, value.id)}
                                                       key={index}>
                                                <h2 className="todayH2">{value.title}</h2>
                                                <img src={value.images} alt="" className="todayImg"/>
                                            </li>
                                        })
                                    }
                                </ul>



                              {/*  <ul className="today_Ul">
                                    {
                                        val.stories.map((value, index) => {
                                            return <li className="todayDiv" onClick={this.skip.bind(this, value.id)}
                                                       key={index}>
                                                <h2 className="todayH2">{value.title}</h2>
                                                <img src={value.images} alt="" className="todayImg"/>
                                            </li>
                                        })
                                    }
                                </ul>

                                <ul className="today_Ul">
                                    {
                                        val.stories.map((value, index) => {
                                            return <li className="todayDiv" onClick={this.skip.bind(this, value.id)}
                                                       key={index}>
                                                <h2 className="todayH2">{value.title}</h2>
                                                <img src={value.images} alt="" className="todayImg"/>
                                            </li>
                                        })
                                    }
                                </ul>*/}
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        axios.get('/api/4/news/latest').then((res) => {
            this.setState({
                arr: {
                    stories: res.data.stories,
                    top_stories: res.data.top_stories,
                    data: [res.data]
                }
            });
            this.state.crr = res.data;
        });
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        console.log(1);
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
        let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度
        if (scrollTop + clientHeight >= scrollHeight) {
            console.log(1);
            axios.get('/api/4/news/before/' + this.state.date).then((res) => {
                var list = this.state.arr.data;
                list.push(res.data);
                /*加时间和星期*/
                if(res.data.date !== new Date().toLocaleDateString().split('/').join('')) {
                    var n = res.data.date.substr(0, 4);
                    var y = res.data.date.substr(4, 2);
                    var r = res.data.date.substr(6, 2);
                    var oDate = new Date(res.data.date.substr(0, 4),res.data.date.substr(4, 2)-1,res.data.date.substr(6, 2));
                    var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                    var w = oDate.getDay();
                    res.data.date = n + '年' + y + '月' + r + '日'    +week[w];
                }
                this.setState({
                    state: {
                        data: list,
                        date: --this.state.date,
                    }
                })
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