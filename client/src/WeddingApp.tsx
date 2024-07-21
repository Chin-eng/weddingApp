import React, { Component, ChangeEvent} from "react";
import { FileAddGuest } from "./fileAddGuest";
import { FileGuestDetails } from "./FileGuestDetails";
import { FileGuestList } from "./FileGuestList";
import {Guest, parseGuest} from './guest';
import { isRecord} from "./record";

// TODO: When you're ready to get started, you can remove all the example 
//   code below and start with this blank application:

type Page = {Page: 'guestList'} | {Page: 'addGuest'} | {Page: 'guestDetails', guestName: string, isFamily: boolean, Guest: Guest}




type WeddingAppState = {
  show: Page;
  name: string;  // mirror state of name text box
  msg: string;   // message sent from server
  nameGuestMap: Map<string, string>;
  onePlusGuestMap: Map<string, Guest>;
  mapFromtheServer: Map<string, Guest>;
  guestOf: string;
  isFamily: boolean;
  additionalGuest: number; 
  additionalGuestProps: boolean;
  GuestsArray: Array<Guest>; 
  Guest: Guest;
}


/** Displays the UI of the Wedding rsvp application. */
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {show: {Page: 'guestList'}, 
    name: "", 
    msg: "", 
    nameGuestMap: new Map<string, string>(), 
    guestOf: '', 
    isFamily: false, 
    additionalGuest: 0, 
    onePlusGuestMap: new Map<string, Guest>(), 
    additionalGuestProps: false, 
    GuestsArray: [], 
    mapFromtheServer: new Map<string, Guest>(),
    Guest: {
      name: '',
      guestOf: '', 
      dietRestriction: '',
      additionalGuestNumber: 2,
      additonalGuestName: '',
      additionalGuestDiteryRestriction: '',
      isFamily: false
    }
  };
  }

  componentDidMount = (): void => {
      
    fetch("/api/load").then(this.doListResp)
    .catch(() => this.doListError("failed to connect to server"));
  }
  
  render = (): JSX.Element => {
    
    if (this.state.show.Page === 'guestList') {
          return <FileGuestList
          onAddGuestClick={this.doAddGuestAppClick}
          onFilesClick={this.doFilesClick}
          onGuestPlusGuestMap ={this.state.onePlusGuestMap}
          guestNames = {this.state.nameGuestMap}
          onAdditionalGuest = {this.state.additionalGuest}
          additionalPropsGuest = {this.state.additionalGuest}
          onAdditionalGuestLocalProps = {this.state.additionalGuestProps}
          GuestList = {this.state.GuestsArray}
          onIsFamily = {this.state.isFamily}
          />
    } else if (this.state.show.Page === 'addGuest') {
      return <FileAddGuest
          onSave={this.doSaveClick}
          onFileAddGuestClick={this.doFileAddGuestAppClick}
          onFileBackGuestClick={this.doFileBackGuestAppClick}
          onIsFamily = {this.doIsFamilyClick}
      />
    } else {
      return <FileGuestDetails
          name = {this.state.name}
          guestOf = {this.state.guestOf}
          guestNames = {this.state.nameGuestMap}
          guestName = {this.state.show.guestName}
          GuestList = {this.state.GuestsArray}
          Guest={this.state.show.Page === 'guestDetails' ? this.state.show.Guest : this.state.Guest}
          onFileBackGuestDeatilsClick = {this.doFileBackGuestDetailsClick}
          onIsFamily = {this.state.isFamily}
          onAdditonalGuestSave = {this.doSaveadditionalGuestClick}
          onaddMapFromTheServer = {this.state.mapFromtheServer}
      />
    }
  };

  doSaveadditionalGuestClick = (): void => {
    this.setState({show: {Page: 'guestList'}})
    fetch("/api/load").then(this.doListResp)
    .catch(() => this.doListError("failed to connect to server"));
  }




  doIsFamilyClick = (isFamilyVal: boolean): void => {
    this.setState({isFamily: isFamilyVal});
  }
  
  doFileBackGuestDetailsClick = (): void => {
    this.setState({show: {Page: 'guestList'}});
  }

  doFilesClick = (name: string, index: number): void => {
    this.setState({show: {Page: 'guestDetails', guestName: name, isFamily: this.state.isFamily, Guest: this.state.GuestsArray[index]}, name: name});
  }

  doSaveClick = (name: string, guestOf: string): void => {
    // this.state.nameGuestMap.set(name, guestOf);
    this.setState({guestOf: guestOf});
    this.setState({name: name})
    
    
    
    const exisitingGuest = this.state.onePlusGuestMap.get(name);

    const guest = exisitingGuest ? exisitingGuest : {
      name: name,
      guestOf: this.state.guestOf, 
      dietRestriction: '',
      additionalGuestNumber: 2,
      additonalGuestName: '',
      additionalGuestDiteryRestriction: '', 
      isFamily: this.state.isFamily
    }
    this.state.onePlusGuestMap.set(name, guest);

    fetch("/api/load").then(this.doListResp)
    .catch(() => this.doListError("failed to connect to server"));
  }

  doListResp = (resp: Response): void => {
    console.log(
      "Loaading from server"
    )
    if (resp.status === 200) {
      resp.json().then(this.doListJson)
          .catch(() => this.doListError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doListError)
          .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code from /api/list: ${resp.status}`);
    }
  };

  doListJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/list: not a record", data);
      return;
    }

    if (!Array.isArray(data.Guests)) {
      console.error("bad data from /api/list: Guest is not an array", data);
      return;
    }
    const guest_list: Array<Guest> = [];
    for (const object of data.Guests) {
      const guest = parseGuest(object);
      if (guest === undefined)
        return;
      guest_list.push(guest);
    }
    this.setState({GuestsArray: guest_list});
  };


  doListError = (msg: string): void => {
    console.error(`Error fetching /api/list: ${msg}`);
  };

  doAddGuestAppClick =(): void => {
    this.setState({show : {Page: 'addGuest'}});
  }

  doFileAddGuestAppClick =(): void => {
    // update list, then go back

    fetch("/api/load").then(this.doListResp)
    .catch(() => this.doListError("failed to connect to server"));
    this.setState({show: {Page: 'guestList'}});
  }

  doFileBackGuestAppClick =(): void => {
    // don't update list, just go back
    this.setState({show: {Page: 'guestList'}});
  }

  renderMessage = (): JSX.Element => {
    if (this.state.msg === "") {
      return <div></div>;
    } else {
      return <p>Server says: {this.state.msg}</p>;
    }
  };

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value, msg: ""});
  };
}