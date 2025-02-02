import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)

  const capatilizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
 
   
    
  

 const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
     setLoading(true)
     let data = await fetch(url);
     props.setProgress(30);
     let parsedData = await data.json();
     props.setProgress(50)
     setArticles(parsedData.articles)
     setLoading(false)
     setTotalResults(parsedData.totalResults)
     
      props.setProgress(100);

      
  }
  useEffect(()=>{
    document.title = `${capatilizeFirstLetter(props.category)}-NewsMonkey` 
      updateNews();
      // eslint-disable-next-line 
  },[])

 

 /*  const handleNextClick = async ()=>{
   
   setPage(page+1)
   updateNews(); 
   

  }

 const handlePrevClick = async ()=>{
     
   
      setPage(page-1)
      updateNews();
      
 
  }
 */
  const fetchMoreData = async ()=>{
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
     let data = await fetch(url);
     let parsedData = await data.json();
     setArticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
    
    
  };
 
 
    
    return (
      
      <>
        <h1 className='text-center'style ={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey-Top {capatilizeFirstLetter(props.category)} Headlines   </h1>
         {loading===true&&<Spinner/>} 

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={totalResults!==articles.length}
          loader={loading&&<Spinner/>}
        >
          <div className="container">
        
        <div className="row">
          {/* !this.state.loading&& */articles.map((element)=>{
              return <div className="col-md-4" key={element.url} >
               <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
          })}          
        </div>
        </div>
        
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1}type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))}type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
      </>
      
      
    )
  
}
News.defaultProps = {
  country:'us',
  pageSize:5,
  catagory:'general'
}

News.propTypes = {
country:PropTypes.string,
pageSize:PropTypes.number,
category:PropTypes.string
}

export default News
