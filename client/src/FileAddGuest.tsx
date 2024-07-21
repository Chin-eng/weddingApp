import React, { Component,  MouseEvent, ChangeEvent} from "react";
import { isRecord } from "./record";

type FileAddGuestProps = {
    onFileAddGuestClick: () => void;
    onFileBackGuestClick: () => void;
    onIsFamily: (isFamily: boolean) => void; 
    onSave: (name: string, guestOf: string) => void;
};

type FileAddGuestState = {
    name: string;
    guestOf: string;
    isFamily: boolean; 
    error: string;
};

export class FileAddGuest extends Component<FileAddGuestProps, FileAddGuestState> {
    constructor(props: FileAddGuestProps) {
        super(props);
        this.state = { name: '' , guestOf: '', error: '', isFamily: false};
    }

    render = (): JSX.Element => {
        return (
            <div>
                <h2>Add Guest</h2>
                <input type="text" className="new-item" onChange={this.doNameChange}/>
                <p>Guest of:</p>
                <label style={{ display: 'block', marginLeft: '10px'}}>
                    <input type="radio" name="guestOf" value="Molly" required onChange = {this.doRadioChange}/> Molly
                </label>
                <label style={{ display: 'block', marginLeft: '10px'}} >
                    <input type="radio" name="guestOf" value="James" required onChange = {this.doRadioChange}/> James
                </label>
                <label style={{ display: 'block', marginBottom: '20px' }}>
                    <input type="checkbox" name="isFamily" required onChange={this.doIsFamilyChnageClick}/> Family?
                </label>
                <button type='button' onClick={this.doFileAddGuestClick}>Add</button>
                <button type='button' onClick={this.doFileBackGuestClick}>Back</button>
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

    doIsFamilyChnageClick = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({isFamily: evt.target.checked});
    }

    doRadioChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ guestOf: evt.target.value });
    }

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({name: evt.target.value, error: ""});
    }

    doFileAddGuestClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.name.trim().length===0 || this.state.guestOf.trim().length===0) {
            this.setState({error: "host is required"});
            return;
        }
        // this.props.onFileAddGuestClick();

        const args = {
            name: this.state.name, 
            guestOf: this.state.guestOf,
            dietRestriction: '',
            additonalGuestNumber: 2,
            additionalGuestName: '', 
            additionalGuestDiteryRestriction: '', 
            isFamily: this.state.isFamily
        }

        fetch("/api/create", {
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

        this.props.onSave(this.state.name, this.state.guestOf);
        this.props.onFileAddGuestClick();
        this.props.onIsFamily(this.state.isFamily)
      };


      doAddError = (msg: string): void => {
        this.setState({error: msg})
      };
      
    doFileBackGuestClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.onFileBackGuestClick(); 
    }
}
