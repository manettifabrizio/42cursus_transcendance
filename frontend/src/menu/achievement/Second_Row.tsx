import { Box, Card, Grid, Typography } from "@mui/material";
import { Component } from "react";
import DoneIcon from '@mui/icons-material/Done';

const spacer = "10px";

interface SecondRowProps {
};

export class SecondRow extends Component<SecondRowProps> {
	render (){
		return(
            <div>
				<Grid container direction="row" justifyContent="space-around" alignItems="center">
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Grid container direction="column" justifyContent="space-between" alignItems="center">
							<Typography align="center">Win 3 in a raw</Typography>
							<Box sx={{border: '3px solid grey', backgroundColor: 'white',}}  width="115px" height="10px"></Box>
							<Typography align="center">0%</Typography>
							<Box sx={{border: '3px solid grey' }}  width="20px" height="20px">
							{/* <DoneIcon/> */}
							</Box>
						</Grid>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Grid container direction="column" justifyContent="space-between" alignItems="center">
							<Typography align="center">Win 10 in a raw</Typography>
							<Box sx={{border: '3px solid grey', backgroundColor: 'white',}}  width="115px" height="10px"></Box>
							<Typography align="center">0%</Typography>
							<Box sx={{border: '3px solid grey' }}  width="20px" height="20px">
							{/* <DoneIcon/> */}
							</Box>
						</Grid>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Grid container direction="column" justifyContent="space-between" alignItems="center">
							<Typography align="center">Win 15 in a raw</Typography>
							<Box sx={{border: '3px solid grey', backgroundColor: 'white',}}  width="115px" height="10px"></Box>
							<Typography align="center">0%</Typography>
							<Box sx={{border: '3px solid grey' }}  width="20px" height="20px">
							{/* <DoneIcon/> */}
							</Box>
						</Grid>
					</Card>
				</Grid>
            </div>
        );
    };
}