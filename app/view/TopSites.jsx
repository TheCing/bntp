var React = require('react');

var TopSites = require('../repository/TopSites.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {items: []};
  },
  componentDidMount: function () {
    if (localStorage.demo) {
      TopSites.loadDemo(function (items) {
        this.setState({items: items});
      }.bind(this));
    } else {
      TopSites.loadFromChrome(function (items) {
        this.setState({items: items});
      }.bind(this));
    }
  },
  render: function () {
    return (
      <section className="TopSites">
        <div className="TopSitesBody">
          {this.state.items.map(function (item) {
            return <TopSiteItem key={item.url} title={item.title} url={item.url}/>;
          })}
        </div>
        <div className="clearfix"/>
      </section>
    );
  }
});

var TopSiteItem = React.createClass({
  render: function () {
    var style = {
      backgroundImage: "url('chrome://favicon/" + this.props.url + "')"
    };
    return (
      <a href={this.props.url} className="TopSitesItem">
        <div className="TopSitesItemBody" style={style}></div>
        <div className="TopSitesItemTip">{this.props.title}</div>
      </a>
    );
  }
});