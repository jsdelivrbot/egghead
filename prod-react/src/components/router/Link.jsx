import React, { Component } from 'react';

export class Link extends Component {
  static contextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  }

  handleClick = (e) => {
    e.preventDefault();
    this.context.linkHandler(this.props.to);
  }

  render() {
    const activeClass = this.context.route === this.props.to ? 'active' : '';
    return <a href="#" onClick={this.handleClick} className={activeClass}>{this.props.children}</a>
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired
}
