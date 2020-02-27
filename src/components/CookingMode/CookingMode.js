import React from "react";
import Speech from 'react-speech';
import './CookingMode.css';

class CookingMode extends React.Component {

  render() {
    // Tts.speak('Hello, world!');
    const textstyle = {
      play: {
        hover: {
          backgroundColor: 'black',
          color:'white'
        },
        button: {
          padding:'4',
          fontFamily: 'Helvetica',
          fontSize: '1.0em',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'blue',
          border: 'none'
        }
      }
    };

    console.log('Recipe ID: ', this.props.location.state.recipeId);
    console.log('Instructions: ', this.props.location.state.instructions);
    return(
      <div className="ck-container">
        <h2> Let's start Cooking! </h2>
        {
          this.props.location.state.instructions.map( (instruction) => (

              <Speech
                styles={this.style}
                stop={false}
                pause={false}
                resume={false}
                displayText="Hello"
                pitch="1"
                rate="1"
                text={`${instruction.step}`}
              />
          ))
        }
          {
            this.props.location.state.instructions.map( (instruction) => (

              <h3 className="instr-header"> Step {instruction.number} : <br/>
                {instruction.step} </h3> 
            ))

          }

      </div>
    );
  }
}

const style = {
  play: {
    button: {
      width: '28',
      height: '28',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'yellow',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6
    },
  }
};

export default CookingMode;
