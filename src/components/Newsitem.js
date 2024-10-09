import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
     let {title,description,imageUrl,newsUrl,author,date,source} = this.props; 
    return (
      <div className="my-3">
      <div className="card" >
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zindex:'1'}}>{source}</span>
      <img src={!imageUrl?"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iPux_tTA3dHY/v0/1200x800.jpg":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="cardtext my-3"><small className="text-muted">By {!author? "unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read Here</a>
        
      </div>
    </div>
    </div>
    )
  }
}

export default Newsitem
