import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
 static defaultProps = {
    contry:"in",
    pageSize:3,
     category:"general"


 }
 static propsTypes = {
    contry:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
    


 }
    capitalizeFristLatter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props)
        console.log("hellow am in constructer")
        this.state = {
            articles:[],
            loading:false,
            page:1,
            totalresult:0
        };
        document.title =`${this.capitalizeFristLatter(this.props.category)}-newsapp`
    }
   
   async componentDidMount(){
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=02505fa943ba46e9bd89cc6d3d3aedc0&page=1&pageSize=${this.props.pageSize}`
        let data= await fetch(url);
        this.props.setProgress(30)
        let parsedData =await data.json();
        this.props.setProgress(70);
        console.log(parsedData)
        this.setState({articles:parsedData.articles,totalresult:parsedData.totalresult})
        this.props.setProgress(100)

    }
   
    previous_page= async ()=>{
       
 
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=02505fa943ba46e9bd89cc6d3d3aedc0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
       this.setState({loading:true});
       let data= await fetch(url);
       let parsedData =await data.json();
       console.log(parsedData)
       this.setState({
        page:this.state.page -1,
        articles:parsedData.articles,
        loading :false

    })
    }

next_page= async ()=>{
    if(!(this.state.page +1 >Math.ceil(this.state.totalresult/this.props.pageSize))){

     
      


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=02505fa943ba46e9bd89cc6d3d3aedc0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData =await data.json();
        console.log(parsedData)
        this.setState({
            page:this.state.page +1,
            articles:parsedData.articles,
            loading:false
        })

    } 

    
     
 
        

}



fetchMoreData = async() => {
 
this.setState({page:this.state.page + 1});

// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=02505fa943ba46e9bd89cc6d3d3aedc0&page=1&pageSize=${this.props.pageSize}`
// let data= await fetch(url);
// let parsedData =await data.json();
// console.log(parsedData)
// this.setState({articles:this.state.articles.concat(parsedData.articles),
//     totalresult:parsedData.totalresult})

// this.props.setProgress(0)
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=02505fa943ba46e9bd89cc6d3d3aedc0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
this.setState({loading:true});
let data= await fetch(url);
let parsedData =await data.json();
console.log(parsedData)
this.setState({
    page:this.state.page +1,
    articles:this.state.articles.concat(parsedData.articles),
    loading:false
})
// this.props.setProgress(100);


  };

    render() {
        return (
            <>
                
                  <div className="text-center">
                     <h1 style={{marginTop :"70px"}}>Top {this.capitalizeFristLatter(this.props.category)}-Headlines</h1> 
                     <p>Dally update are Here..</p>
                      </div>
                     {this.state.loading && <Spinner/> }
                    

                     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalresult}
          loader={<Spinner/>}
        ><div className="container">


       
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title} description={element.description}
                                    urlImage={element.urlToImage?element.urlToImage:"https://d32r1sh890xpii.cloudfront.net/article/718x300/2022-03-04_rucwghtenf.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />

                            </div> 
                            

                        })}


                    </div>

                    </div>


                    </InfiniteScroll>


                
                {/* <div className="container d-flex justify-content-between">
                <button  type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.previous_page}>&larr;privius</button>
                <button type="button" disabled={this.state.page +1 >Math.ceil(this.state.totalresult/this.props.pageSize)} className="btn btn-dark" onClick={this.next_page}>next &rarr;</button>

                    
                    
                    </div> */}

            </>
        )
    }
}