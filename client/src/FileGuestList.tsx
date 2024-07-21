import React, { Component, MouseEvent} from "react";
import {Guest} from './guest';
import { explode_array } from "./list";
import {min_guest, max_guest, countFamily} from "./functions";


type FileGuestListProps = {
    onAddGuestClick: () => void;
    guestNames: Map<string, string>;
    onGuestPlusGuestMap: Map<string, Guest>
    onFilesClick: (name: string, index: number) => void
    onAdditionalGuest: number;
    additionalPropsGuest: number;
    onAdditionalGuestLocalProps: boolean;
    GuestList: Array<Guest>;
    onIsFamily: boolean;
}

type FileGuestListState = {
    name: string;
    MollyGuest: Array<Guest>;
    JamesGuest: Array<Guest>;
}



export class FileGuestList extends Component<FileGuestListProps, FileGuestListState> {
        constructor(props: FileGuestListProps) {
            super(props);

            this.state = {name: " ", MollyGuest : [], JamesGuest: []}
        }

        render = (): JSX.Element => {
            return (<div>
                <div>
                  <h3>Guest List</h3>
                  <ul>{this.renderList()}</ul>
                  <h3>Summary:</h3>
                  <ul>{this.renderSummary()}</ul>
                  <button type = 'button' onClick = {this.doAddGuestClick}>Add Guest</button>
                  <p>since I'm not invited to the wedding, congratulate James on his wedding Imaoo</p>
                </div>
              </div>); 
        }

        componentDidMount = (): void =>{
            this.doUpdateGuestListsClick();
          }
        
          componentDidUpdate = (prevProps: FileGuestListProps): void => {
            if (prevProps.GuestList !== this.props.GuestList) {
              this.doUpdateGuestListsClick();
            }
          }

        doUpdateGuestListsClick = ():void => {
            const guestOfJames: Guest[] = [];
            const guestOfMolly: Guest[] = [];

            this.props.GuestList.forEach((guest) => {
                if (guest.guestOf === 'James') {
                  guestOfJames.push(guest);
                } else {
                  guestOfMolly.push(guest);
                }
              });
          
              this.setState({ JamesGuest: guestOfJames, MollyGuest: guestOfMolly });
        }


        renderList = (): JSX.Element => {
            if (this.props.GuestList === undefined) {
                return <p>Loading Guest List ....</p>;
            } else {
                const files: JSX.Element[] = [];

                this.props.GuestList.forEach((guest, index) => {
                    files.push(
                        <li key={guest?.name}>
                        <a href="#" onClick={(evt) => this.doFilesCheckClick(evt, guest?.name, index)}>{guest?.name}</a> Guest of {guest?.guestOf}, {guest?.isFamily === true ? 'Family' : ''}
                        {guest?.additionalGuestNumber === 2 ? " +1?" : guest?.additionalGuestNumber === 1 ? ' +1' : ' 0'}
                      </li>
                    );
                });

                return <ul>{files}</ul>
            }           
        }

        doFilesCheckClick = (evt: MouseEvent<HTMLAnchorElement>, name: string, index: number): void => {
            evt.preventDefault();
            this.props.onFilesClick(name, index);
        }
        

        renderSummary = (): JSX.Element => {
            const min_Molly  = Number(min_guest(explode_array(this.state.MollyGuest)));
            const max_Molly = Number(max_guest(explode_array(this.state.MollyGuest))); 
            const min_James  = Number(min_guest(explode_array(this.state.JamesGuest)));
            const max_James  = Number(max_guest(explode_array(this.state.JamesGuest)));
            const countMollyFamily = Number(countFamily(explode_array(this.state.MollyGuest)));
            const countJamesFamily = Number(countFamily(explode_array(this.state.JamesGuest)));    
            return (
                <>
                <div> {min_Molly === max_Molly ? min_Molly : min_Molly + ' - ' + max_Molly} guest(s) of Molly ({countMollyFamily} family)</div>
                <div>  {min_James === max_James ? min_James : min_James + ' - ' + max_James} guest(s) of James ({countJamesFamily} family)</div>
                </>
            );
        }

        doAddGuestClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
            this.props.onAddGuestClick();
        }
}