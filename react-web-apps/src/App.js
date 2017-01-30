import React from 'react';
import Wrapper from './lifecycle/AppTwo';
import AppFour from './map/AppFour';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is the state txt'
    };
  }

  update(e) {
    this.setState({txt: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>{this.state.txt}</h1>
        <Input update={this.update.bind(this)}/>
        <Button>Button Children Text</Button>
        <hr/>
        <Wrapper />
        <hr/>
        <AppFour />
      </div>
    );
  }
}

const Input = (props) => (
  <input type="text" onChange={props.update} />
);

const Button = (props) => (
  <button>{props.children}</button>
);

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
};

App.defaultProps = {
  txt: 'this is the default txt'
};

export default App;
