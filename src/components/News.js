import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: '${this.props.country}'
  }
  static propsTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      currentPage: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} | The DailyBuzz`
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ef2484a25ff9498e91684b511f0376fe&page=1&pageSize=20`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  handlePrevClick = async () => {
    const prevPage = this.state.page - 1;

    if (prevPage < 1) {
      // Handle case when trying to go to a page less than 1
      console.log("Already on the first page");
    } else {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ef2484a25ff9498e91684b511f0376fe&page=${prevPage}&pageSize=20`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: prevPage,
        articles: parsedData.articles,
        loading: false

      });
    }
  };

  handleNextClick = async () => {
    const nextPage = this.state.page + 1;
    const totalPages = Math.ceil(this.state.totalResults / 20);

    if (!(nextPage > totalPages)) {
      console.log("No more pages to load");
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ef2484a25ff9498e91684b511f0376fe&page=${nextPage}&pageSize=20`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: nextPage,
        articles: parsedData.articles,
        loading: false
      });
    }
  };

  fetchMoreData = async () => {
    const { country, category } = this.props;
    const { currentPage, totalResults, loading } = this.state;
  
    // If already loading or no more results to fetch, return
    if (loading || this.state.articles.length >= totalResults) {
      return;
    }
  
    // Increment the page number for the next fetch
    const nextPage = currentPage + 1;
  
    // Construct the URL for fetching data from the next page
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=ef2484a25ff9498e91684b511f0376fe&page=${nextPage}&pageSize=20`;
  
    // Set loading state to true
    this.setState({ loading: true });
  
    try {
      // Fetch data from the next page
      const response = await fetch(url);
      const data = await response.json();
  
      // Update state with new articles and total results
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...data.articles],
        totalResults: data.totalResults,
        currentPage: nextPage,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set loading state to false to allow for retrying
      this.setState({ loading: false });
    }
  };
  



  render() {
    const { articles } = this.state;
    return (
      <div className="container my-3" >
        <h1 className="text-center" style={{ fontWeight: "800" }}>The DailyBuzz - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-3" key={element.url}>
                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
