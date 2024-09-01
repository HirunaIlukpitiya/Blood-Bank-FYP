import React from 'react';
import { useOverlay } from '../overlayContext';
import SpinnerImg from '../../assets/spinner.svg';
function Spinner(){
    const {isSpinnerVisible} = useOverlay();
    if(!isSpinnerVisible) return null;

    return (
        <>
        <div className = "z-50 fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
        <img src={SpinnerImg} alt="" />
        </div>
    </>
    )
}

export default Spinner;