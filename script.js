class List extends React.Component {
  constructor(){
    super()

    this.state = {
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
              },
    indexd: ""
  }

    this.changeHandler = this.changeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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

  deleteHandler() {
    let newList = [...this.state.list];
    newList.splice(event.target.id, 1)
    this.setState({list: newList});
       // this.state.list.splice(event.target.id, 1)});
    }

  render() {
      // render the list with a map() here
      console.log("rendering");
      console.log("list array", this.state.list);


      let itemsList = this.state.list.map( (item, index) => {
            return <ItemsList key={index} index={index} item={item} delete={this.deleteHandler} />;
        });

      return (
        <div className="list">
          <input className={this.state.currentClass} onChange={this.changeHandler} onKeyPress={this.state.keyPress} onKeyUp={this.state.keyUp} value={this.state.word} />
          <button className="add-item" onClick={this.addItem} disabled={this.state.button} >Add Item</button>
          <p className="error-msg">{this.state.errors}</p>
          <ul>{itemsList}</ul>
        </div>
      );
  }
}

class ItemsList extends React.Component {
    constructor() {
        super()

    this.state = {
        liClass: "list-new"
    }

    this.whenDone = this.whenDone.bind(this);
    };

    whenDone(event) {
        let done = event.target.checked;
        console.log("checkbox", event.target.checked);
        if (done === true) {
            this.setState({liClass: "list-done"});
        } else {
            this.setState({liClass: "list-new"});
        }
    }

    render() {
    return (
        <div className="to-do-list">
            <li className={this.state.liClass}>
                <input className="checkbox" type="checkbox" id={this.props.index} onChange={this.whenDone} />
                <button className="delete" onClick={(event) => this.props.delete(event)} id={this.props.index}>X</button>
                <p className="list-text">{this.props.item}</p>
            </li>
        </div>

        );
    }

}

ReactDOM.render(
    <div>
        <h1>List your stuff</h1>
        <List />
    </div>,
    document.getElementById('root')
);

