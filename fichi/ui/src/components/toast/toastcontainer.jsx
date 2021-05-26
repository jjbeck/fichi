import React from 'react';
import { ToastContainer } from 'react-toastify';

export default class ToastContainerCustom extends React.Component {


    render() { 
        return (
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            
        />
        );
    }
}