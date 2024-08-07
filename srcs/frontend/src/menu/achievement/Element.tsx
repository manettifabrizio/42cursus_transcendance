import { Stack } from '@mui/material';
import { Component } from 'react';
import GreenCheckmark from '../../asset/images/green_checkmark.png';
import '../../style/display.css';

interface ElementProps {
  name: string;
  actual: number;
  max: number;
  color: string;
}

interface ElementState {}

export class Element extends Component<ElementProps, ElementState> {
  getPercentage(): string {
    const percentage: number = (100 / this.props.max) * this.props.actual;

    if (percentage > 100) return '100%';

    return percentage.toFixed() + '%';
  }

  render() {
    return (
      <>
        <Stack
          className={'achievement borsh_' + this.props.color}
          justifyContent="space-evenly"
          alignItems="center"
          style={{ width: '100%', height: '94%' }}
        >
          <div className="manaspace" style={{ fontSize: '1vw', margin: '5px' }}>
            {this.props.name}
          </div>

          <div className="progressbar">
            <div className="bar" style={{ width: this.getPercentage() }} />
          </div>

          <div className="bit9x9" style={{ fontSize: '1.5vw' }}>
            {this.getPercentage()}
          </div>

          {this.props.actual >= this.props.max && (
            <div className="case">
              <img
                src={GreenCheckmark}
                style={{ width: '200%', justifyContent: 'center' }}
                alt="check"
              />
            </div>
          )}
          {!(this.props.actual >= this.props.max) && <div className="case" />}
        </Stack>
      </>
    );
  }
}
