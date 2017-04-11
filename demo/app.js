import React from 'react';
import { render } from "react-dom";
import Highlight from "react-highlight";
import RcSliderReverse from "./rc-slider-reverse"
import 'bootstrap/scss/bootstrap.scss';
import './styles/app.scss';
import './styles/plates.scss';
import './styles/inputs.scss';
import "./styles/default.scss";
import "./styles/rcslider.scss";


class Root extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: [20, 40],
      min: 0,
      max: 100,
      valueText: "[20, 40]",
      reversed: false
    };

    this.setInputPropValue = this.setInputPropValue.bind(this);
    this.getRadioClassName = this.getRadioClassName.bind(this);
    this.onValueTextChange = this.onValueTextChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onMinChange = this.onMinChange.bind(this);
    this.onMaxChange = this.onMaxChange.bind(this);
  };

  getRadioClassName(name, val){
    if(this.state[name] === val){
      return "checked"
    };
    return ""
  };

  setInputPropValue(name, val){
    let nextState = {};
    nextState[name] = val;
    this.setState(nextState);
  };

  onValueTextChange(e){
    this.setState({valueText: e.target.value})
    let nextValue;
    try{
      nextValue = JSON.parse(e.target.value)
    }catch(err){
      return;
    }
    if(Array.isArray(nextValue) || !Number.isNaN(Number(nextValue))){
      this.setState({value: nextValue});
    }
  }

  onSliderChange(nextValue){
    const valueText = nextValue;
    this.setState({value: nextValue, valueText: JSON.stringify(nextValue)})
  }

  onMinChange(e){
    this.setState({min: Number(e.target.value)})
  }

  onMaxChange(e){
    this.setState({max: Number(e.target.value)})
  }


  render(){
    let isRangeSlider;
    if(Array.isArray(this.state.value)){
      isRangeSlider = true;
    };

    return(
      <div>
        <div className="plate-0">
        <h3>A Demo Page for rc-slider-reverse</h3>
        <div>
          This demo is interactive, please use inputs below.
        </div>
        </div>
        <div className="plate-1">

          <RcSliderReverse
            defaultValue={39}
            reversed={this.state.reversed}
            value={this.state.value}
            onChange={this.onSliderChange}
            onAfterChange={()=>{}}
            min={this.state.min}
            max={this.state.max}
          />
        </div>

        <div className="plate-2">
          <h4>Modify props:</h4>
          <table className="props-table-interactive">
          <tbody>
            <tr>
              <td>value (type number or array of numbers): </td>
              <td><input onChange={this.onValueTextChange} type="text" value={this.state.valueText} /></td>
            </tr>
            <tr>
              <td>min: </td>
              <td><input onChange={this.onMinChange} type="number" value={this.state.min} /></td>
            </tr>
            <tr>
              <td>max: </td>
              <td><input onChange={this.onMaxChange} type="number" value={this.state.max} /></td>
            </tr>
            <tr>
              <td>reversed: </td>
              <td>
              <span className={"radio-1 " + this.getRadioClassName("reversed", true)} onClick={this.setInputPropValue.bind(null, "reversed", true)}>
                <span className="input-icon"></span>
                <span>true</span>
              </span>
              <span className={"radio-1 " + this.getRadioClassName("reversed", false)} onClick={this.setInputPropValue.bind(null, "reversed", false)}>
                <span className="input-icon"></span>
                <span>false (default)</span>
              </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>



        <div className="plate-3">
          <div className="plate-4">
            <h4>Usage:</h4>
            <div>
              ...npm is on the way...
            </div>
            <div>
              From dist folder, copy rc-slider-reverse.js  to your project.<br/>
              Create stylesheet as in rcslider.css or use as sample.<br/>
              To run demo locally, see <a href="https://github.com/3-4rm/rc-slider-reverse">readme</a><br/>
              Component usage, more examples <a href="https://github.com/react-component/slider">here</a>
            </div>
          </div>
<Highlight>{`
import RcSliderReverse from './rc-slider-reverse'

//  ...

// Somewhere in render method:
//...
  <RcSliderReverse
    defaultValue={0}
    min={0}
    max={100}
    value={20}
    reversed={true}
  />
//...
`}</Highlight>
        </div>
        <div className="plate-6">
        </div>
      </div>
    )
  }
}

render(<Root/>, document.getElementById("appcontainer"));
