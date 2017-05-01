import React, { Component } from 'react';


class RandomQuote extends Component {
  render() {
    return (
      <div>
        <h1>Title: {this.props.title}</h1>
        <h1>Content: {this.props.content}</h1>
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quote: []
    }
  }

  _fetchQuote = () => {
    fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
    .then((response) => response.json())
    .then((responseData) => {

      var rquote = responseData[Math.round(Math.random() * responseData.length)];

      this.state.quote.push({title: rquote.title, content: rquote.content})
      this.setState({
        quote: this.state.quote
      });
    })
  }

  _generateRandomQuote = () => {
    [1,2,3].map(() => {
      this._fetchQuote();
    });
  }

  componentDidMount () {
    this._generateRandomQuote();
  }

  componentWillUpdate () {
    this.handleClick;
  }
  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      quote: []
    });
    this._generateRandomQuote();
  }

  render() {
    var quote = this.state.quote.map((rquote) => {
      return <RandomQuote key={rquote.ID} title={rquote.title} content={rquote.content} />

    });

    return (
      <div>
        <button onClick={this.handleClick}>Refresh</button>
        <p />
        {quote}
      </div>
    );
  }
}

export default App;
