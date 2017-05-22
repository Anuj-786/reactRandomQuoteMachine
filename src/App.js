import React, { Component } from 'react';

// this class is for whare the quote is visibile
class RandomQuote extends Component {
  render() {
    return (
      <div>
        <div className="quote" dangerouslySetInnerHTML={{ __html: this.props.content }} />
        <div className="authorName" dangerouslySetInnerHTML={{ __html: " - " +this.props.title}} />
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: [],
    }
  }
  // method for fetch api to fecth quote from the other server
  _fetchQuote = () => {
    // fetch api reqeust
    fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=20")
    // fetch api returning a promise  object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
    .then((response) => response.json())
    // fetch api response data in json
    .then((responseData) => {
      // creating a quute random by using Math.random() method
      var rquote = responseData[Math.round(Math.random() * responseData.length)];
      // if quote is not null set the state
      if (rquote) {
        // creating the property of quote object i.e title and content
        this.state.quote.push({title: rquote.title, content: rquote.content})
        // updating the state of quote with quote property comes from the api
        this.setState({
          quote: this.state.quote
        })
      }
    })
    // handle error for fetch
    .catch (( error ) => {
      console.log(error);
    });
  }
 // instantiate the network request
  componentDidMount () {
    // calling _fetchQuote method
    this._fetchQuote();
  }
  // click method for change the quote randomely
  _handleClick = (e) => {
    // prevent page default on submit
    e.preventDefault();
    // cleaning the state of quote for a new quote
    this.setState({
      quote: []
    });
    // calling the _fetchQuote method for new quote
    this._fetchQuote();
  }
  // class main render method
  render() {
    // maping the quote object and setting the property to RandomQuote Component
    var quote = this.state.quote.map((rquote, index) => {
      return <RandomQuote key={index} title={rquote.title} content={rquote.content} />
     });
     //  return method of a render
    return (
      <div className="quoteMain">
        <h1 className="pageTitle">Random Quote Machine</h1>
        <div className="quoteDiv">
          {quote}
          <div className="newButton">
            <button onClick={this._handleClick}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
