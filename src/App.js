import React,{Component} from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";

import {Route,Routes} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'




export default class App extends Component{

state ={
  progress:0
}

 setProgress = (progress)=>{
this.setState({progress:progress})
  }
  render(){
    
    return(
    <>
  <Navbar/>
  <LoadingBar
        color="red"
        height={5}
        progress={this.state.progress}
        
      />




    <Routes>

 <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={3} contry="in" category="general"/>}/>
 <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={3} contry="in" category="business"/>}/>
 <Route exact path="/entertenment" element={<News setProgress={this.setProgress}  key="entertenment" pageSize={3} contry="in" category="entertainment"/>}/>
 <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={3} contry="in" category="health"/>}/>
 <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={3} contry="in" category="science"/>}/>
 <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={3} contry="in" category="sports"/>}/>
 <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={3} contry="in" category="technology"/>}/>

    </Routes>
    </>
    )
  }
}