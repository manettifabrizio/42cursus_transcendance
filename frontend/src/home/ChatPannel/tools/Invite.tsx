import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD:frontend/src/home/ChatPannel/tools/Invite.tsx
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import JoinChannel from './JoinChannel'
import { ChatSocketAPI } from '../../../api/ChatSocket.api';
import { ChannelDto } from '../../../api/dto/channel.dto';
import { UserDto } from '../../../api/dto/user.dto';
=======

>>>>>>> 52efbb5ca0f319dad0730297f16832b8093565f1:frontend/src/home/ChatPannel/tools/InviteUser.tsx
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 


enum color {
    'white',
    'red',
    'yellow',
    'green',
    'blue'
}

enum description {
    'unknow',
    'offline',
    'invite idle',
    'invite',
    'watch match'
}

enum Difficulty {
	Easy,
	Medium,
	Hard
}

interface InviteProps {
	chatSocket: ChatSocketAPI,
	chan: ChannelDto | undefined,
	user: UserDto | undefined
}

function Invite(props: InviteProps) {
	// le temps est en min pour l'instant
	const [openInvite, setOpenInvite] = React.useState(false);
    const [dif, setDif] = React.useState<Difficulty>(0)

	console.log(`Startdif: ${dif}`)

	const handleCancelInvite= () =>
	{
		setOpenInvite(false);
	}


	const handleInvite = () =>
	{
		console.log('handleInvite')
		console.log(`dif: ${dif}`)
		if (props.chan && props.user) {
			console.log(`chanId: ${props.chan.id}`)
			console.log(`userLogin: ${props.user.login}`)
			props.chatSocket.sendInvitation(props.chan.id, props.user.id, dif)
		}
		setOpenInvite(false);
	}

	return (
		<>
			<div className="send_msg_button but_green" onClick={ () => {setOpenInvite(true)}}>
				<img src={require('../../../asset/images/logo512.png')} style={{width: '100%'}} alt='cross'/>
			</div>

			<Dialog open={openInvite} onClose={handleCancelInvite}>
				<DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<div className='bit5x5' style={{color: "white"}}> {"Play against"} </div>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<ButtonBase centerRipple className={"home_button but_" + ((dif === 0)? "blue": "cyan")} style={{backgroundColor: (dif === 0)? "blue": "cyan"}} onClick={() => {setDif(0)}}>
								{ (dif === 0) ? <div className='bit5x5'style={{color: "white"}}> Easy </div>:
								<div className='bit5x5'> Easy </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((dif === 1)? "blue": "cyan")} style={{backgroundColor: (dif === 1)? "blue": "cyan"}} onClick={() => {setDif(1)}}>
								{ (dif === 1) ? <div className='bit5x5'style={{color: "white"}}> Medium </div>:
								<div className='bit5x5'> Medium </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((dif === 2)? "blue": "cyan")} style={{backgroundColor: (dif === 2)? "blue": "cyan"}} onClick={() => {setDif(2)}}>
								{ (dif === 2) ? <div className='bit5x5'style={{color: "white"}}> Hard </div>:
								<div className='bit5x5'> Hard </div>}
							</ButtonBase>
						</Stack>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div className="home_button but_red" onClick={handleCancelInvite}>
								<div className='bit5x5' > Cancel </div>
							</div>
							<div onClick={handleInvite} className="home_button but_red">
								<div className='bit5x5'> Invite </div>
							</div>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default Invite;