import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'isomorphic-fetch';

class Root extends Component{
    constructor(props){
        super(props);
        this.state = {
            userlist : null
        }
    }
    componentDidMount(){
        fetch('/users/queryAll').then((res)=>{
            if(res.ok) {
                return res.json();
            }
        }).then(data=>{
            let userlist = (data || []).map((v,i)=>{
                v.key = i;
                return v;
            })
            this.setState({
                userlist
            })
        })
    }
    render(){
        const {userlist} = this.state;
        let isDone = Array.isArray(userlist);
        let mainComponent = <div>加载中...</div>;
        if(isDone){
            if(userlist.length> 0){
                mainComponent = <div>
                    {
                        userlist.map((v,i)=>{
                            return <p key={v.key}>{v.name} <span>{v.age}</span></p>
                        })
                    }
                </div>
            } else {
                mainComponent = <div>无数据</div>
            }
        }
        return <div className="bd">{mainComponent}</div>;
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));