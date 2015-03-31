var names = ['Alice', 'Emily', 'Kate'];
React.render(
  <div>
    {
      names.map(function(_name){
        return <div>hello {_name}!</div>
      })
    }
  </div>,
  document.getElementById('example')
);

var arr = [
  <h1>hello1</h1>,
  <h2>hello2</h2>
];

React.render(
  <div>
    {arr}
  </div>,
  document.getElementById('exampleArr')
);