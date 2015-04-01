var HelloMessage = React.createClass({
  render: function(){
    return <h1>hello {this.props.name}</h1>
  }
});

React.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);




var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        this.props.children.map(function (child) {
          return <li>{child}</li>
        })
        }
      </ol>
    );
  }
});

React.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.getElementById('example2')
);


var MyComponent = React.createClass({
  handleClick: function(){
    React.findDOMNode(this.refs.myTextInput).focus()
  },
  render: function(){
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="click" onClick={this.handleClick} />
      </div>
    )
  }
});

React.render(
  <MyComponent />,
  document.getElementById('example3')
);



var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

React.render(
  <LikeButton />,
  document.getElementById('example4')
);