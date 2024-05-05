import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-4">
        <div className="card">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{zIndex:'1',marginLeft:'-50%'}}>
            {source}</span>
          <img src={!imageUrl ? "https://img.rasset.ie/0016cb40-1600.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>

    )
  }
}
