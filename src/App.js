import React, { Component } from 'react';
import ListElement from './Components/ListElement/ListElement';
import NewListElement from './Components/NewListElement/NewListElement';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Kostya', score: 23 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Max', score: 1 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Kevin', score: 24 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'John', score: 11 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Paul', score: 110 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Clair', score: 99 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Engine', score: 9 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Pol', score: 91 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Merry', score: 17 },
        { id: '_' + Math.random().toString(36).substr(2, 9), name: 'Ment', score: 71 }
      ],
      sortUsers: true,
      addElement: false
    };
  }

  sortUsersList = () => {
    let result;

    result = this.state.users.sort((a, b) => {
      return b.score - a.score;
    });

    return result;
  }

  generateList = () => {
    let result;

    if(this.state.sortUsers === true) {
      result = this.sortUsersList();
      this.state.sortUsers = false;
    }

    result = this.state.users.map((item) => {
      return (
        <ListElement
          key={item.id}
          data={item}
          handleUpdateName={this.handleUpdateName}
          handleUpdateScore={this.handleUpdateScore}
          handleConfirmUpdateScore={this.handleConfirmUpdateScore}
          handleDeleteElement={this.handleDeleteElement}
        />
      );
    });

    return result;
  }

  manageVisabilityOfNewListElement = () => {
    if (this.state.addElement) {
      return (
        <NewListElement
          handleConfirmAddElement={this.handleConfirmAddElement}
          handleCancelAddingNewElement={this.handleCancelAddingNewElement}
        />
      );
    }
  }

  manageVisabilityOfAddListElementBtn = () => {
    if (!this.state.addElement) { return (<button className="app-btn-add" onClick={ this.handleAddElement }>Add player</button>) }
  }

  handleAddElement = () => {
    this.setState({addElement: true});
  }

  handleConfirmAddElement = (item) => {
    const usersState = [...this.state.users];

    usersState.push(item);
    this.setState({
      users: [...usersState],
      addElement: false,
      sortUsers: true
    });
  }

  handleCancelAddingNewElement = () => {
    this.setState({addElement: false});
  }

  handleUpdateName = (e, elementId) => {
    const usersState = [...this.state.users];
    const user = usersState.find(item => item.id === elementId);

    user.name = e.target.value;
    this.setState({
      usersState,
      user
    });
  }

  handleUpdateScore = (e, elementId) => {
    const usersState = [...this.state.users];
    const user = usersState.find(item => item.id === elementId);

    user.score = e.target.value;
    user.showConfirm = true;
    this.setState({
      usersState,
      user
    });
  }

  handleConfirmUpdateScore = (elementId) => {
    const usersState = [...this.state.users];
    const user = usersState.find(item => item.id === elementId);

    user.showConfirm = false;
    this.setState({
      usersState,
      user,
      sortUsers: true
    });
  }

  handleDeleteElement = (elementId) => {
    const usersState = [...this.state.users];
    const updatedUsersState = usersState.filter(item => {
      if(item.id !== elementId) { return item; }
    });

    this.setState({users: updatedUsersState});
  }

  render() {
    return (
      <div className="container">
        <div className="app-new-container">
          { this.manageVisabilityOfNewListElement() }
          { this.manageVisabilityOfAddListElementBtn() }
        </div>

        <ul className="app-list">{ this.generateList() }</ul>
      </div>
    );
  }
}

export default App;
