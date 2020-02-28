import React, { Component } from 'react';
import './App.css';
//you need a provider and a consumer for this to work
//provider will basically acts as the information store/database where all data passed will be held at
//consumer will allow us to consume/use the information/data stored inside of our provider
//this is all possible thanks to our context because inside of the Provider we will use the context we created to bind the Providers infomation to when rendering inside the Provider's Component and where we want to use that information we will use the Context we bound to the provider to now consume that info via context.Consumer
//we need the context because it acts as the satellite
const MyContext = React.createContext();

// we need a PROVIDER COMPONENT because this basically serves as the place to store all the information/data we need to send out to the other components
class MyProvider extends Component {
	state = {
		name: 'Phil',
		age: 33
	};
	render() {
		//returns are unique in the PROVIDER COMPONENT because rather than returning something wrapped in a div we actually will return something wrapped in a context provider and as we have created one above called MyContext we will use that
		//since the provider will live at the top of the tree it will pass the child properties inside of the context.provider
		//we then need to add a value attribute to allow us to pass data thru such as functions or state properties
		//Now to pass useful information to pass through to value we will set value to an object seen below, and to send state data we will now refer state information as a state value seen below same with a function we will just state the function like state as a name value pair and we will be able to call/get the values through the name
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					growAYearOlder: () => this.setState({ age: this.state.age + 1 })
				}}
			>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

const Family = (props) => {
	//in here we are now showing how the information is passed from the provider through our context variable we created via the use of MyContext.Provider and MyContext.Consumer
	//when using the consumer we need to render a certain way to pass the info by passing an argument which we happened to call "context", we are able to call this parameter/argument anything we wish, but its just a method to get the data from the provider
	//so inorder to get the data from the proider the child must be wrapped inside of the consumer tag as shown below
	//one key thing to remember because the return function is only able to return one element we must now use React.Fragment to wrap the elements together to display them to the browser
	//React.Fragment is an API that basically renders out a blank tag which allows us to renders multiple elements
	return (
		<div className="family">
			<Person />
		</div>
	);
};
class Person extends Component {
	render() {
		return (
			<div className="person">
				<MyContext.Consumer>
					{(context) => (
						<React.Fragment>
							<p>I'm {context.state.name}</p>
							<p>I am {context.state.age} years old</p>
							<button onClick={context.growAYearOlder}>Birthday!!!</button>
						</React.Fragment>
					)}
				</MyContext.Consumer>
			</div>
		);
	}
}

//now because we now have a provider we just need to wrap whatever part of our application with the provider component
//any child inside of the provider component is now able to access the data that Provider has stored in its component
class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<MyProvider>
						<Family />
					</MyProvider>
				</header>
			</div>
		);
	}
}

export default App;
