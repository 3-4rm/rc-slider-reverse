import React from 'react';
import Rcslider from 'rc-slider'


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createStateFromProps(props);
    this.createSlider = this.createSlider.bind(this);
    this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.getValueForSlider = this.getValueForSlider.bind(this);
    this.getValueForRange = this.getValueForRange.bind(this);
    this.getMin = this.getMin.bind(this);
    this.getMax = this.getMax.bind(this);
    this.getToolTip = this.getToolTip.bind(this);
    this.getTipFormatter = this.getTipFormatter.bind(this);
    this.getDefaultValueForRange = this.getDefaultValueForRange.bind(this);
    this.getDefaultValueForSlider = this.getDefaultValueForSlider.bind(this);
    this.tipFormatter = this.getTipFormatter();
  };

  createStateFromProps(props){

    var nextState = {
      value: props.value,
      max: props.max,
      min: props.min,
      reversed: props.reversed
    };
    return nextState;
  };

  componentWillReceiveProps(nextProps){
    this.tipFormatter = this.getTipFormatter();

    var nextState = this.createStateFromProps(nextProps);
    this.setState(nextState);
  };

  handleOnAfterChange(){
    var value = this.state.value;
    this.props.onAfterChange(value);
  }

  handleRangeChange(nextValue){
    if(this.state.reversed){
      nextValue = nextValue.map((item)=>{return -(item)});
      nextValue.reverse();
    }
    this.setState({value: nextValue});
    this.props.onChange(nextValue);
  };


  handleSliderChange(nextValue){
    var reversed = this.state.reversed;
    nextValue = reversed ? -(nextValue) : nextValue;
    this.setState({value: nextValue});
    this.props.onChange(nextValue);
  }

  getValueForSlider(){
    if(this.state.value === undefined){
      return;
    }
    if(this.state.reversed){
      return -(this.state.value);
    }else {
      return this.state.value;
    };
  };

  getValueForRange(){
    var value = this.state.value;
    if(this.state.reversed){
      value = value.map((item)=>{return -(item)});
      value.reverse();
    };
    return value;
  }

  getDefaultValueForSlider(){
    if(this.props.defaultValue === undefined){
      return;
    }
    if(this.props.reversed){
      return -(this.props.defaultValue);
    }else {
      return this.props.defaultValue;
    };
  }

  getDefaultValueForRange(){
    var value = this.props.defaultValue;
    if(! Array.isArray(value)){
      return;
    }
    if(this.props.reversed){
      value = value.map((item)=>{return -(item)});
      value.reverse();
    };
    return value;
  }

  getMin(){
    var min;
    if(this.state.reversed){
      min = -(this.state.max || (100));
    }else{
      min = this.state.min ||(0);
    };
    return min;
  };

  getMax(){
    var max;
    if(this.state.reversed){
      max = -(this.state.min || (0));
    }else{
      max = this.state.max || (100);
    };
    return max;
  };

  getToolTip(t){
    if(this.state.reversed){
      if(this.props.tipFormatter){
        return this.props.tipFormatter(-t)
      }else{
        return -(t)
      }
    }else{
     if(this.props.tipFormatter){
        return this.props.tipFormatter(t)
     }else{
       return t
     }
   }
 };

 getTipFormatter(){
   if(this.props.tipFormatter === null){
     return null;
   }
   if(this.props.tipFormatter === undefined){
     return this.getToolTip;
   }
   if(typeof this.props.tipFormatter === 'function'){
     if(this.state.reversed){
       return (t)=>{
         t = -t;
         return this.props.tipFormatter(t)
       }
     }else{
       return this.props.tipFormatter
     }
   };
 };

  createSlider(){
    var getValue;
    var handleKeyDown;
    var isRange;
    var handleChange;
    var allowCross;
    var tipFormatter = this.tipFormatter;
    var defaultValue;
    if(Array.isArray(this.props.value)){
      getValue = this.getValueForRange;
      handleChange = this.handleRangeChange;
      isRange = true;
      defaultValue = this.getDefaultValueForRange();
    }else{
      getValue = this.getValueForSlider;
      handleChange = this.handleSliderChange;
      defaultValue = this.getDefaultValueForSlider();
      isRange = false;
    };
    var slider = (<Rcslider
                      tipFormatter={tipFormatter}
                      marks={this.props.marks}
                      step={this.props.step}
                      vertical={this.props.vertical}
                      handle={this.props.handle}
                      included={this.props.included}
                      disabled={this.props.disabled}
                      dots={this.props.dots}
                      minimumTrackTintColor={this.props.minimumTrackTintColor}
                      maximumTrackTintColor={this.props.maximumTrackTintColor}
                      range={isRange}
                      value={getValue()}
                      min={this.getMin()}
                      max={this.getMax()}
                      onChange={handleChange}
                      allowCross={this.props.allowCross}
                      defaultValue={defaultValue}
                      onBeforeChange={this.props.onBeforeChange}
                      pushable={this.props.pushable}
                      onAfterChange={this.handleOnAfterChange}/>);
    return (
      <div>
        {slider}
      </div>);
  };


  render() {
    return this.createSlider()
  };
};

Slider.propTypes = {
  value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.arrayOf(React.PropTypes.number)]),
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  tipFormatter: React.PropTypes.func,
  reversed: React.PropTypes.bool
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  reversed: false
};

export default Slider;
