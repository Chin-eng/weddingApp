import React, { Component, ChangeEvent} from "react";
import { isRecord } from "./record";
import {Guest} from './guest';


type FileGuestDetailsProps = {
    name: string;
    guestOf: string;


    guestNames: Map<string, string>;
    guestName: string;
    onFileBackGuestDeatilsClick: () => void;
    onAdditonalGuestSave:() => void;
    onIsFamily: boolean;
    GuestList: Array<Guest>
    onaddMapFromTheServer: Map<string, Guest>;
    Guest: Guest;
}

type FileGuestDetailsState = {
    name: string;
    dietRestriction: string; 
    additonalGuestNumber: number,
    additionalGuestName: string, 
    additionalGuestDiteryRestriction: string;
    error: string;
}


export class FileGuestDetails extends Component<FileGuestDetailsProps, FileGuestDetailsState> {

    constructor(props: FileGuestDetailsProps) {
        super(props);
        this.state = { name: '' , additonalGuestNumber: 2, error: '', dietRestriction: '', additionalGuestName: '', additionalGuestDiteryRestriction: ''};
    }

    render = (): JSX.Element => {
        return (
            <div>
                <h2>Guest Details</h2>
                <p>{this.props.Guest.name}, guest of {this.props.Guest.guestOf}, {this.props.Guest.isFamily === true ? 'Family' :''}</p>
                <p>Dietary Restrictions: (specifiy "none" if none)</p>
                <label style={{ display: 'block', marginBottom: '10px', marginTop: '2px'}} >
                    <input type="text" className="new-item" onChange = {this.doDietRestrictionChange}/>
                </label>
                <p style={{ display: 'inline', marginRight: '10px'}}>Additional Guest?</p>
                <select
                    value={this.state.additonalGuestNumber}
                    onChange={this.doHandeDropDownChange}
                    style={{ display: 'inline-block', marginBottom: '20px'}}>
                    <option value="2">Unknown</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
                {this.renderAdditionalGuest()}
                <label>
                    <div>
                        <button type='button' onClick={this.doFileSaveGuestDeatilsClick}>Save</button>
                        <button type='button' onClick={this.doFileBackGuestDeatilsClick}>Back</button>
                    </div>
                </label>
                {this.renderError()}
            </div>
        );      
    }

    renderError = (): JSX.Element => {
        if (this.state.error.length === 0) {
            return <div></div>
        } else {
            const style = {width: '300px', backgroundColor: 'rgb(246,194,192)',
            border: '1px solid rgb(137,66,61)', borderRadius: '5px', padding: '5px' };
            return (<div style={{marginTop: '15px'}}>
            <span style={style}><b>Error</b>: {this.state.error}</span>
                </div>);
        }
    }

    doDietRestrictionChange = (evt: ChangeEvent<HTMLInputElement>) : void => {
        this.setState({dietRestriction: evt.target.value});
    }

    renderAdditionalGuest = (): JSX.Element => {
        if (this.state.additonalGuestNumber === 0 || this.state.additonalGuestNumber === 2) {
            return (
            <div>
            </div>);
        } else {
            return (
                <div>
                <label> Guest Name:
                    <input type="text" placeholder="Enter guest's name" onChange = {this.doGuestNameOnChange}/>
                </label>
            <div>
            <p>Guest Dietary Restrictions: (specifiy "none" if none)</p>
            </div>
                <label style={{ display: 'block', marginBottom: '10px', marginTop: '2px'}}>
                    <input type="text" placeholder="diet restriction" onChange = {this.doDietRestrictinonChange} />
                </label>
            </div>
            );
        }
    }

    doFileBackGuestDeatilsClick = (): void => {
        this.props.onFileBackGuestDeatilsClick(); 
        console.log(this.props.onaddMapFromTheServer);
    }
    doGuestNameOnChange =(evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({additionalGuestName: evt.target.value});
    }
    doDietRestrictinonChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({dietRestriction: evt.target.value});
    }

    doFileSaveGuestDeatilsClick = (): void => {
        if (this.state.dietRestriction.trim().length===0) {
            this.setState({error: "host is required"});
            return; 
        }

        if (this.state.additonalGuestNumber === 1) {
            if (this.state.additionalGuestName.trim().length === 0 || this.state.dietRestriction.trim().length === 0) {
                this.setState({error: "host is required"});
                return;
            }   
        }

        const args = {
            name: this.props.Guest.name, 
            guestOf: this.props.Guest.guestOf, 
            dietRestriction: this.state.dietRestriction,
            additonalGuestNumber: this.state.additonalGuestNumber,
            additionalGuestName: this.state.additionalGuestName, 
            additionalGuestDiteryRestriction: this.state.additionalGuestDiteryRestriction, 
            isFamily: this.props.Guest.isFamily
        }
        

        fetch("/api/save", {
            method: "POST", body: JSON.stringify(args),
            headers: {"Content-Type": "application/json"} })
          .then(this.doAddResp)
          .catch(() => this.doAddError("failed to connect to server"));
    }

    doAddResp = (resp: Response): void => {
        if (resp.status === 200) {
          resp.json().then(this.doAddJson)
              .catch(() => this.doAddError("200 response is not JSON"));
        } else if (resp.status === 400) {
          resp.text().then(this.doAddError)
              .catch(() => this.doAddError("400 response is not text"));
        } else {
          this.doAddError(`bad status code from /api/save: ${resp.status}`);
        }
      };

      doAddJson = (data: unknown): void => {
        if (!isRecord(data)) {
          console.error("bad data from /api/add: not a record", data);
          return;
        }

        this.props.onAdditonalGuestSave();

      };

      doAddError = (msg: string): void => {
        this.setState({error: msg})
      };

    doHandeDropDownChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        this.setState({additonalGuestNumber: parseInt(evt.target.value, 10)});
    }
}