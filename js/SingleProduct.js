import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";

import {
    ViroARScene,
    ViroText,
    ViroBox,
    ViroMaterials,
    ViroNode,
    ViroConstants,
    Viro3DObject,
    ViroAmbientLight,
    ViroSpotLight,
    ViroAnimations,
    ViroARPlaneSelector
  } from "react-viro";

export default  class SingleProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
          }
          this._onRotate = this._onRotate.bind(this);
          this._onPinch = this._onPinch.bind(this);
          this._onClick = this._onClick.bind(this)
    }

    _onRotate(rotateState, rotationFactor, source) {
        console.log(
          "rotateState",
          rotateState,
          "rotatationFactor",
          rotationFactor,
          "source",
          source
        );
        if (rotateState == 3) {
          this.setState({
            rotation: [
              this.state.rotation[0],
              this.state.rotation[1] + rotationFactor,
              this.state.rotation[2]
            ]
          });
        }
      }
    
      _onPinch(pinchState, scaleFactor, source) {
        if (pinchState === 3) {
          this.setState({
            scale: [
              this.state.scale[0] * scaleFactor,
              this.state.scale[1] * scaleFactor,
              this.state.scale[2] * scaleFactor
            ]
          });
        }
      }
      
      _onClick (event) {
        console.log('im inside Single Product', event)
      }

    render(){
        return(
            <ViroNode onDrag={()=>{}}>
                <ViroARPlaneSelector>
                    <Viro3DObject
                    source={{
                        uri:
                        this.props.item.objurl
                    }}
                    resources={[
                        {
                        uri: this.props.item
                        }
                    ]}
                    position={[0, 0, 0]}
                    scale={this.state.scale}
                    rotation={this.state.rotation}
                    onPinch={this._onPinch}
                    onRotate={this._onRotate}
                    type="OBJ"
                    onClick={() => this._onClick(this.props.item)}
                    />
                    </ViroARPlaneSelector>
                </ViroNode>
        )
    }

}