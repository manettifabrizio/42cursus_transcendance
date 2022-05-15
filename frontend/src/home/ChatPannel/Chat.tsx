import { Avatar, Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
import { ChatSocketAPI } from '../../api/ChatSocket.api'
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import { ChatAPI } from "../../api/Chat.api";
import { io } from "socket.io-client";
import { UserDto } from "../../api/dto/user.dto";
import { Message } from "@mui/icons-material";

interface ChatState {
	socket: any;
	messages: any[];
	input: string;
	chan: any;
	users: UserDto[];
	user: any,
}

interface ChatProps {
    isPrivateMessage: boolean,
	params: any
};

export class Chat extends Component<ChatProps, ChatState> {
	chatSocket: ChatSocketAPI;
	chanName: string = '';


	constructor(props: ChatProps) {
		super(props);
		this.chatSocket = new ChatSocketAPI({transmitMessage: this.onMessage.bind(this), transmitService: this.onService.bind(this)});
        this.state = {
			messages: [],
			socket: null,
			input: '',
			users: [],
			user: undefined,
			chan: undefined
		}
	}

	componentDidMount()  {
		this.getName();
	}
	
	async getName() {
        const name = this.props.params.name;
    }


	onInputChange(input){
		this.setState({
			input
		})
	}

	renderMsg(list)
    {
		let lastAuthorId: number = -1;
        const listItems = list.map((msg: any) => {
			const sender:UserDto|undefined = this.state.users.find((user) => {return user.id == msg.authorId});
			const color = (sender) ? sender.color : 'white';
			const login = (sender) ? sender.login : 'unknow';
			const avatar = (sender) ? sender.avatar : '';
			const isFirst: boolean = msg.authorId != lastAuthorId;
			lastAuthorId = (msg.service) ? - msg.authorId : msg.authorId;
			if (msg.service && msg.content == 'JOIN')
				return  <div style={{color: "green", width: '100%', fontSize: '1.5rem'}}> {`→ ${login} joined the channel`} </div>;
				if (msg.service && msg.content == 'LEAVE')
			return  <div style={{color: "red", width: '100%', fontSize: '1.5rem'}}> {`→ ${login} left the channel`} </div>
            return <>
                { isFirst &&
                    <Stack direction="row" spacing={1} style={{width: '100%', fontSize: '1.5rem'}}>
                        <Avatar variant='circular' src={avatar} sx={{margin: "10px"}}/>
                        <Stack direction="column" justifyContent="space-around" style={{width: '100%'}}>
                            <div style={{color, fontWeight: "bold"}}> {login} </div>
                            <div style={{color: "white"}}> {msg.content} </div>
                        </Stack>

                    </Stack>
                }

                {!isFirst &&
                    <div style={{color: "white", paddingLeft: "68px", fontSize: '1.5rem'}}> {msg.content} </div>
                }
            </>
		}
        );
        return listItems;
    }

	onMessage(message: any) {
		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	async onService(message: any) {
		message.service = true;
		if (message.content === 'JOIN') {
			const user = await UserAPI.getUserById(message.authorId);
			if (user == null) {
				throw(Error('unknow new user'));
				return;
			}
			this.state.users.push(user);
		}

		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	onKeyDown(e) {
		if (e.keyCode == 13)
			this.sendMessage(this.chanName);
	}

	onFocus(e) {
		if (e.relatedTarget){}
	}

    sendMessage(chanName: string) {
		if (chanName && this.state.input != '') {
			this.chatSocket.sendMessage(this.state.chan.id, this.state.input, this.state.user.id);
			ChatAPI.addMessage(this.state.input, this.state.user.id, this.state.chan.id); //deplacer dans le gateway
			this.setState({
				input: ''
			});
		}
    }

	async switchChannel(newChannelName: string) {
		console.log('SWITCH CHANNEL ')
		this.chanName = newChannelName;
		const user = await UserAPI.getUser();
		const channel = await ChatAPI.getChannelByName(this.chanName);
		let messages = await ChatAPI.getByChannelId(channel.id);
		console.log('_____channel');
		console.log(channel);
		this.chatSocket.joinRoom(channel.id);
		this.setState({
			users: channel.users,
			user,
			chan: channel,
			messages
		})
	}

	render () {
		if (this.chanName != this.props.params.name) {
			this.switchChannel(this.props.params.name)
		}
		return (
            <>
                <Box height="89%">
					<ol>
						{this.renderMsg(this.state.messages)}
					</ol>
				</Box>
				<Box height="50px" sx={{backgroundColor: "black"}}>
					<Stack direction="row" spacing={2} sx={{backgroundColor: "black"}}>
						<Link style={{backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + this.chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.chanName + "/info"}}
						onClickCapture={() => {}}>
							<InfoIcon fontSize="large" sx={{backgroundColor: "black",color: "white"}}/>
						</Link>

						<InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "50px" }} value={this.state.input} onKeyDown={(e) => {this.onKeyDown(e)}} onChange={(e) => {this.onInputChange(e.target.value)}}/>
						<IconButton sx={{ color: "white" }} onClick={ () => {this.sendMessage(this.chanName)}}	>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
            </>

		)
	}
}