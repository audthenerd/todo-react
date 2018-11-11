
class List extends React.Component {
  constructor(){
    super()

    this.state = {
    list : [],
    word : "",
    currentClass: "normal",
    errors: "",
    button: "disabled",
    // keyUp: function enterSubmit(event) {
    //             event.preventDefault();
    //             if (event.keyCode === 13) {
    //             document.getElementsByClassName("add-item")[0].click();
    //             }
    //         },
    keyPress: function empty() {
                console.log("typing...")
              },

    done: []
  }

    this.changeHandler = this.changeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.doneHandler = this.doneHandler.bind(this);
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

  addItem(event) {
    event.preventDefault();
    console.log("adding", this.dn.value);
    this.state.list.push([this.dn.value, this.state.word, this.ef.value]);
    this.setState({word: ""});
  }

  deleteHandler() {
    let newList = [...this.state.list];
    newList.splice(event.target.id, 1);
    this.setState({list: newList});
}

 doneHandler() {

    let boxchecked = event.target.checked;
        console.log("checkbox", event.target.checked);
        if (boxchecked === true) {

            let newList = [...this.state.list];
            let doneList = this.state.done;
            doneList.push(newList.splice(event.target.id, 1)[0]);
            this.setState({list: newList});
        }
 }

  render() {
      // render the list with a map() here
      console.log("rendering");
      console.log("list array", this.state.list);


      let itemsList = this.state.list.map( (item, index) => {
            return (<ItemsList key={index} index={index} item={item} delete={this.deleteHandler} done={this.doneHandler} />);
        });


        let itemsDoneList = this.state.done.map((item, index) => {
            return (<ItemsDone key={index} index={index} item={item} />)
        });

      return (
        <div className="list">
        <form onSubmit={this.addItem} >
          <input className="date-field" type="hidden" defaultValue={moment(new Date()).format('dddd, MMMM Do YYYY, h:mm a')} ref={dn => this.dn = dn} />
          <label>Your to-do</label>
          <input className={this.state.currentClass} onChange={this.changeHandler} onKeyPress={this.state.keyPress} value={this.state.word} /><br />
          <label>Goal completion date</label>
          <input className="expiry-field" type="date" ref={ef => this.ef = ef} onChange={this.dateHandler} />
          <button className="add-item" type="submit" disabled={this.state.button} >Add Item</button>
        </form>
          <p className="error-msg">{this.state.errors}</p>

          <div className='rem-sect'>
             <h3>Remember to....</h3>
            <table>
            <tbody>
            <tr>
                <th className="done-box">Done</th><th className="del-box">Delete</th><th className="list-date">Date Listed</th><th className="list-text">To-Do</th><th className="list-expiry">Countdown</th>
            </tr>
             {itemsList}
              </tbody>
            </table>
          </div>
            <div className='done-sect'>
              <h3>You're Done!</h3>
              <ul>{itemsDoneList}</ul>
          </div>
        </div>
      );
  }
}

class ItemsList extends React.Component {
    constructor() {
        super()
    }


    render() {
        console.log(this.props.item[2]);
    let expiry;
    if(this.props.item[2] == "") {
        expiry = (<td>No date entered</td>);
    } else {
        expiry = (<td>expires {new moment().to(this.props.item[2])}</td>);
    }

    return (
        <tr className="to-do-list">

                <td><input className="checkbox" type="checkbox" id={this.props.index} onChange={(event) => this.props.done(event)} /> </td>
                <td><button className="delete" onClick={(event) => this.props.delete(event)} id={this.props.index}>X</button></td>

                <td>{this.props.item[0]}</td><td>{this.props.item[1]}</td>{expiry}
        </tr>

        );
    }

}

class ItemsDone extends React.Component {

    constructor() {
            super()
    }

    render() {
        return (
            <div className="you-done-list">
                <input className="checkbox" type="checkbox" id={this.props.index} />
                <button className="delete" id={this.props.index}>X</button>
                <li className="list-done">{this.props.item[1]}</li>
            </div>
            )
    }
}

ReactDOM.render(
    <div className="done-list">
        <h1>Listie: List your stuff</h1>
        <List />
    </div>,
    document.getElementById('root')
);
