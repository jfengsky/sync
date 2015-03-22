var MainV = React.createClass({
  getDefaultProps: function(){
    return {

    }
  },
  getInitialstate: function(){
    return {

    }
  },
  render: function(){
    return React.DOM.div({
      className: 'root'
    },'Simple div');
  }
});

React.renderComponent(new MainV, document.body);