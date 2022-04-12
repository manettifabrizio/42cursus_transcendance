import { Button, Stack, Grid, InputBase, Typography } from "@mui/material";
import { Fragment, Component } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/buttons.css";
import "../../style/input.css";
import { InputUnstyled } from "@mui/base";

enum TwofaState {
    disabled,
    pending,
    enabled
}

type TwofaSettingsProps = {
    updateDisplay: any
    updateParentState: any
    activating: boolean
};

interface TwofaSettingsState {
    twofaState: TwofaState;
    displayQR: boolean;
    input: string;
    redirect: boolean;
    twofa: boolean;
    activating: boolean
    
}

export class TwofaSettings extends Component<TwofaSettingsProps, TwofaSettingsState> {

	constructor(props: TwofaSettingsProps) {
		super(props);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);
		this.state = {
            twofaState: TwofaState.disabled,
            displayQR: false,
            input: '',
            redirect: false,
            twofa: false,
            activating: this.props.activating
        }
        this.fetch();
	}

    componentDidMount() {
        if (this.props.activating == true)
            this.enable()
    }

    async fetch() {
        try {
            const twofa = await UserAPI.isTwofaEnabled();
            let state = (twofa) ? 2 : 0;
            this.setState({
                twofa,
                twofaState: state,
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async enable() {
        let state = this.state.twofaState;
        if (state == 0)
            state = 1;
        this.setState({
            twofaState: state,
            displayQR: true,
        });
    }

    async generate() {
        await UserAPI.getTwofaQR()
        this.setState({
            displayQR: false,
        })
        this.setState({
            displayQR: true,
        })
    }

    onChange(str: string) {
        this.setState({
            input: str
        })
    }

    async disable() {
        await UserAPI.turnTwofaOff();
        this.setState({
            twofaState: TwofaState.disabled,
        });
        toast.success("2FA disabled", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    async onValidation() {
        console.log(this.state.input)
        const isValid = await UserAPI.turnTwofaOn(this.state.input);
        if (isValid) {
            toast.success("2FA activated", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            this.setState({twofaState: 2})
            this.props.updateDisplay(0)
        }
        else
            toast.error("Invalid code", {
                position: toast.POSITION.BOTTOM_CENTER
            })
         
    }

    on() {
        if (this.state.twofaState == TwofaState.disabled)
            this.props.updateDisplay(2);
        else
            toast.error("2FA is aready active", {
                position: toast.POSITION.BOTTOM_CENTER })
    }

    off() {
        if (this.state.twofaState == TwofaState.enabled)
            this.disable();
        else
            toast.error("2FA is not active", {
            position: toast.POSITION.BOTTOM_CENTER })
    }

    render() {

        const GridItemStyle = {
			color: 'white',
			alignItems: 'center',
			display: "flex",
			justifyContent: 'center',
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)',
            width: "100%"
		};

        return (
            
            <Fragment>

            {!this.state.activating &&
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height: '33%'}}
                >
                    <Grid item xs={4} sx={GridItemStyle}> 2FA </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        <div    className={this.state.twofaState == TwofaState.enabled ?
                                        "settings_button green" : "settings_button white"}
                                onClick={this.on.bind(this)}
                        >
                            ON
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        <div className={this.state.twofaState == TwofaState.disabled ?
                                        "settings_button red" : "settings_button white"}
                            onClick={this.off.bind(this)}
                        >
                            OFF
                        </div>
                    </Grid>
                </Grid>
            }

            {this.state.activating &&
                <Grid container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height: '100%',
					width: '100%'}}
                >
                    <Grid item xs={2} sx={GridItemStyle}> 2FA </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        {this.state.displayQR && 
                            <img    src={process.env.REACT_APP_2FA_GENERATE}
                                    style={{border: '5px solid #03C7D8',
                                            boxShadow: '5px 5px 0px -1px rgba(3,199,218,0.5)'
                                        }}
                            />
                        }
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                    <input
                        id="unstyled"
                        className="settings_2fa_input"
                        placeholder="enter code"
                        onChange={ async (e) => {this.onChange(e.target.value)}}
                    />
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                        <div className="settings_edit_button green"
                            onClick={this.onValidation.bind(this)}>
                            VALIDATE
                        </div>
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                        <Stack
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						style={{width: "100%"}}>
							<div className="settings_edit_button blue"
								style={{lineHeight: '1.5'}}
                                onClick={this.generate.bind(this)}
                            >
								REGENERATE QR CODE
							</div>
							<div className="settings_edit_button red"
								onClick={() => {this.props.updateDisplay(0)}}>
								CANCEL
							</div>
						</Stack>
                    </Grid>
                </Grid>
            }
 
            </Fragment>
        )
    }
}
