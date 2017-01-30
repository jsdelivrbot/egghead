import React from 'react';

class AppFour extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
  }

  componentWillMount() {
    fetch('https://swapi.co/api/people/?format=json')
      .then( res => res.json())
      .then( ({results}) => this.setState({items: results}));
  }

  update(e) {
    this.setState({filter: e.target.value});
  }

  render() {
    let items = this.state.items;
    let filter = this.state.filter;
    if (filter) {
      items = items.filter( item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return (
      <div>
        <input type="text" onChange={this.update.bind(this)}></input>
        {items.map( item => (
          <h4 key={item.name}>{item.name}</h4>)
        )}
      </div>
    );
  }
}

export default AppFour;
