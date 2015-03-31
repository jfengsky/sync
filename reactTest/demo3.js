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
    
  }
});