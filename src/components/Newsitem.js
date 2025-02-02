import React from 'react'

const Newsitem = (props) =>{
 
     let {title,description,imageUrl,newsUrl,author,date,source} = props; 
    return (
      <div className="my-3">
       
      <div className="card" >
      <div style={{display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'0'
        }}>
        <span class="badge rounded-pill bg-danger" >{source}</span>
        </div>
        
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

export default Newsitem
