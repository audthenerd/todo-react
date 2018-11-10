class App extends React.Component {
    constructor() {
            super()
        };

    render() {


    return (
        <div>
            <List />
        </div>
        )
    }
}


class ItemsList extends React.Component {
    constructor() {
        super()

        this.state = {
            indexd: null
        }

        this.deleteHandler = this.deleteHandler.bind(this);
    };


    deleteHandler(event) {
        this.setState({indexd: event.target.id})
    }

    render() {
    return (
        <div className="to-do-list">
            <input className="checkbox" type="checkbox" id={this.props.index} />
            <button className="delete" onClick={this.deleteHandler} id={this.props.index}>X</button>
            <span><li>{this.props.item}</li></span>
        </div>

        );
    }

}


class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  state = {
    list : [],
    word : "",
    currentClass: "normal",
    errors: "",
    button: "disabled",
    keyUp: function enterSubmit(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                document.getElementsByClassName("add-item")[0].click();
                }
            },
    keyPress: function empty() {
                console.log("typing...")
              }
  }


  changeHandler(event){

    this.setState({word:event.target.value});
    console.log("change", event.target.value);

    if(this.state.word.length > 30) {

        function limitInput(event) {
            if(event.keyCode !== 8 && event.keyCode !== 46) {
                event.preventDefault();
            }
        };

        this.setState({currentClass: "warning"});
        this.setState({errors: "Maximum limit of 30 letters reached!"});
        this.setState({keyPress: limitInput});
    } else {
        this.setState({currentClass: "normal"});
        this.setState({errors: ""});
        this.setState({keyPress: ""});
    };

    if(this.state.word.length > 1) {
        this.setState({button: ""});
        this.setState({errors: ""});
    } else {
        this.setState({button: "disabled"});
        this.setState({errors: "Cannot be left blank, dude!"});
    }

  }

  addItem() {
    this.state.list.push(this.state.word);
    this.setState({word: ""});
  }

  deleteItem() {
    this.setState({})
  }

  render() {
      // render the list with a map() here
      console.log("rendering");
      console.log("list array", this.state.list);

      let itemsList = this.state.list.map( (item, index) => {
            return <ItemsList key={index} index={index} item={item} delete={} />;
        });

      return (
        <div className="list">
          <input className={this.state.currentClass} onChange={this.changeHandler} onKeyPress={this.state.keyPress} onKeyUp={this.state.keyUp} value={this.state.word} />
          <button className="add-item" onClick={this.addItem} disabled={this.state.button} >Add Item</button>
          <ul>{itemsList}</ul>
          <p className="error-msg">{this.state.errors}</p>
        </div>
      );
  }
}

ReactDOM.render(
    <div>
        <h1>List your stuff</h1>
        <App />
    </div>,
    document.getElementById('root')
);

