import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
       country:'us',
       pageSize:5,
       catagory:'general'
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capatilizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title = `${this.capatilizeFirstLetter(this.props.category)}-NewsMonkey`
    console.log('I am a Constructor');
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c568e7efdb0f45a492ea1c4641b5604f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({
      loading : true
     })
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false});

      
  }

  async componentDidMount(){
    /*  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c568e7efdb0f45a492ea1c4641b5604f&page=1&pageSize=${this.props.pageSize}`;
     this.setState({
      loading : true
     })
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false}); */
      this.updateNews();
      console.log('I am a method');
  }

   handleNextClick = async ()=>{
    /*  if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c568e7efdb0f45a492ea1c4641b5604f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    }) 
    let data = await fetch(url);
     let parsedData = await data.json();
     this.setState(
      {
        articles:parsedData.articles,
        page:this.state.page+1,
        loading:false
      });
    }  */
   this.setState({page:this.state.page+1});
   this.updateNews(); 
   console.log('I am a next method');

  }

  handlePrevClick = async ()=>{
     /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c568e7efdb0f45a492ea1c4641b5604f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
     let parsedData = await data.json();
     this.setState(
      {
        articles:parsedData.articles,
        page:this.state.page-1,
        loading:false
      });   */
      this.setState({page:this.state.page-1});
      this.updateNews();
      console.log('I am a prev method');
 
  }

  fetchMoreData = async ()=>{
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c568e7efdb0f45a492ea1c4641b5604f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults
      });
    
  }
 

  render() {
    console.log('I am a return statement');
    return (
      
      <>
        <h1 className='text-center my-3'>NewsMonkey-Top {this.capatilizeFirstLetter(this.props.category)} Headlines   </h1>
         {this.state.loading===true&&<Spinner/>} 

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.totalResults!==this.state.articles.length}
          loader={this.state.loading&&<Spinner/>}
        >
          <div className="container">
        
        <div className="row">
          {/* !this.state.loading&& */this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url} >
               <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
          })}          
        </div>
        </div>
        
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1}type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))}type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
      </>
      
      
    )
  }
}

export default News
