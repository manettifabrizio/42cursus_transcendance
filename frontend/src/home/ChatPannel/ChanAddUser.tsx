import { ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../style/input.css"

interface ChanAddUserState {
    chan?: any;
    searchResults: number[];
	searchField?: string;
}

interface ChanAddUserProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "100px"

export class ChanAddUser extends Component<ChanAddUserProps, ChanAddUserState> {
	constructor(props: ChanAddUserProps) {
		super(props);
        this.state = {
            chan: undefined,
            searchResults: [], searchField: undefined
        }
		this.renderSearchRows = this.renderSearchRows.bind(this);
	}

// TODO il faut faire la meme chose que dans le ADD FRIEND du menu mais au lieu d'ajouter en amis il faut l'ajouter dans le channel
    // a voir comment on fait car est ce que l'on ajoute que dans la liste d'amis de l'admin ou dans la liste de tout les users 

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chan: id,
        })
	}

	renderSearchRows(list) {
		return <></>; //new implementation of AddUser
	// 	const listItems = list.map((id: number) =>
	// 		<div key={id}>
	// 			<AddUserDisplay id={id} index={0} addFriend={[]}/>
	// 		</div>
	//   );
	//   return listItems;
	}
	async onSearch(search:string) {
		this.setState({searchField: search});
		if (!search || search === '')
			return;
		let ret = await UserAPI.searchFriend(search);
		// this.setState({searchResults: ret}); //new implementation of search
	}

	render () {

		return (
            <>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/edit"}}>
						<ArrowBackIcon/>
					</Link>
				</Stack>
				<Stack justifyContent="center" alignItems="center">
					<InputBase className="friends_search_bar" sx={{width: "480px", color: 'white'}} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder="Search Friend" onChange={ async (e) => {this.onSearch(e.target.value)}}/>
                    {/* className={styles.input} */}
					<List style={{height: "100% -100px",overflow: 'auto'}}>
						{this.renderSearchRows(this.state.searchResults)}
					</List>
				</Stack>
			</>
		)
	}
}