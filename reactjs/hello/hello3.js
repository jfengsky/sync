var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentbox">
        Hello, World!
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.body
);