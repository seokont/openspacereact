import React from "react"
import {compose} from "redux";
import { connect } from 'react-redux';
import Insurance from "./Insurance";
import {addConsuranceItem, addEventValue, addInsurancee} from "../../Reducer/insurance-reducer";
let mapStateToProps = (state) => ({
    Insurance: state.Insurance.Ins,
})
let InsuranceContainer = compose(connect(mapStateToProps, {addConsuranceItem,addEventValue,addInsurancee}))(Insurance);
export default InsuranceContainer;
