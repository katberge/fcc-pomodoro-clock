// some of the functions on this were created by Fabian Schultz or inspired by the ones he shared on stack overflow link: https://stackoverflow.com/questions/40885923/countdown-timer-in-react

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: "Session",
      breakMin: 5,
      breakSec: 300,
      sessionMin: 25,
      sessionSec: 1500 };

    this.intervalId;
    this.convertTime = this.convertTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.playBeep = this.playBeep.bind(this);
    this.pauseBeep = this.pauseBeep.bind(this);
  }
  convertTime() {
    let seconds;
    let minutes;
    if (this.state.curr == "Session") {
      seconds = this.state.sessionSec % 60;
      minutes = (this.state.sessionSec - seconds) / 60;
    } else {
      seconds = this.state.breakSec % 60;
      minutes = (this.state.breakSec - seconds) / 60;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
  startTimer() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.changeTime, 1000);
    } else {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  changeTime() {
    let tempSec;
    if (this.state.curr == "Session") {
      tempSec = this.state.sessionSec - 1;
      this.setState({
        sessionSec: tempSec });

    } else {
      tempSec = this.state.breakSec - 1;
      this.setState({
        breakSec: tempSec });

    }
    if (tempSec == 0) {
      this.playBeep();
    }
    if (tempSec < 0) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      if (this.state.curr == "Session") {
        this.setState(prevState => ({
          curr: "Break",
          sessionSec: prevState.sessionMin * 60 }));

      } else {
        this.setState(prevState => ({
          curr: "Session",
          breakSec: prevState.breakMin * 60 }));

      }
      this.startTimer();
    }
  }
  increment(identity) {
    if (identity == "break" && this.state.breakMin !== 60) {
      this.setState(prevState => ({
        breakMin: prevState.breakMin + 1,
        breakSec: prevState.breakSec + 60 }));

    }
    if (identity == "session" && this.state.sessionMin !== 60) {
      this.setState(prevState => ({
        sessionMin: prevState.sessionMin + 1,
        sessionSec: prevState.sessionSec + 60 }));

    }
  }
  decrement(identity) {
    if (identity == "break" && this.state.breakMin !== 1 && this.state.breakSec > 60) {
      this.setState(prevState => ({
        breakMin: prevState.breakMin - 1,
        breakSec: prevState.breakSec - 60 }));

    }
    if (identity == "session" && this.state.sessionMin !== 1 && this.state.sessionSec > 60) {
      this.setState(prevState => ({
        sessionMin: prevState.sessionMin - 1,
        sessionSec: prevState.sessionSec - 60 }));

    }
  }
  reset() {
    this.pauseBeep();
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setState({
      curr: "Session",
      breakMin: 5,
      breakSec: 300,
      sessionMin: 25,
      sessionSec: 1500 });

  }
  playBeep() {
    let audio = document.querySelector("#beep");
    audio.play();
    // setTimeout(this.pauseBeep, 1500);
  }
  pauseBeep() {
    let audio = document.querySelector("#beep");
    audio.pause();
    audio.currentTime = 0;
  }

  render() {
    return (
      React.createElement("div", { id: "container" },
      React.createElement("h1", null, "Pomodoro Clock"),
      React.createElement("div", { id: "timer" },
      React.createElement("p", { id: "timer-label" }, this.state.curr),
      React.createElement("p", { id: "time-left" }, this.convertTime()),
      React.createElement("button", { id: "start_stop", onClick: this.startTimer }, React.createElement("i", { class: "fa fa-play" }), React.createElement("i", { class: "fa fa-pause" })),
      React.createElement("button", { id: "reset", onClick: this.reset }, React.createElement("i", { class: "fa fa-repeat" }))),

      React.createElement("div", { id: "lengths" },
      React.createElement("div", { id: "break" },
      React.createElement("p", { id: "break-label" }, "Break Length:"),
      React.createElement("p", { id: "break-length" }, this.state.breakMin),
      React.createElement("button", { id: "break-decrement", onClick: () => this.decrement("break") }, React.createElement("i", { className: "fa fa-arrow-down" })),
      React.createElement("button", { id: "break-increment", onClick: () => this.increment("break") }, React.createElement("i", { className: "fa fa-arrow-up" }))),

      React.createElement("div", { id: "session" },
      React.createElement("p", { id: "session-label" }, "Session Length:"),
      React.createElement("p", { id: "session-length" }, this.state.sessionMin),
      React.createElement("button", { id: "session-decrement", onClick: () => this.decrement("session") }, React.createElement("i", { className: "fa fa-arrow-down" })),
      React.createElement("button", { id: "session-increment", onClick: () => this.increment("session") }, React.createElement("i", { className: "fa fa-arrow-up" })))),


      React.createElement("audio", { id: "beep", src: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" })));


  }}


ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));