import React, { Component } from "react";


export default class NewsItems extends Component {
  

    render() {
     let   {title,description,urlImage,newsUrl,date,author } = this.props;
        return (
            <>
                <div className="card my-3" style={{height:"500px"}}>
                    <img src={urlImage} className="card-img-top" alt="..." style={{height:"240px"}}/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="auther-date" style={{fontSize:"12px"}}>publish bt {!author?"Unknown":author} on {new Date(date).toGMTString()}</p>
                            <p className="card-text">{description? description.slice(0,120):""}...</p>
                            <a href={newsUrl} target="_black" className="btn btn-sm btn-dark">read more..</a>
                        </div>
                </div>
            </>
        )    
    }
}