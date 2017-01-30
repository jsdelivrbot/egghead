import React from 'react';
import ReactDOM from 'react-dom';

class AppTwo extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = { val: 0 };
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({multi: 2});
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.inc = setInterval(this.update, 500);
  }

  componentWillUnmount() {
    console.log('componentWillMount');
    clearInterval(this.inc);
  }

  update() {
    this.setState({val: this.state.val + this.state.multi});
  }

  render () {
    console.log('render');
    return(
      <div>
        <button onClick={this.update}>{this.state.val}</button>
      </div>
    );
  }
}

class Wrapper extends React.Component {
  constructor() {
    super();
    this.mount = this.mount.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  mount() {
    ReactDOM.render(<AppTwo />, document.getElementById('app-two'));
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('app-two'));
  }

  render() {
    return (
      <div>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>Unmount</button>
        <div id="app-two"></div>
      </div>
    );
  }
}

export default Wrapper;
