import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {BrowserRouter} from "react-router-dom";

if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
    alert("Internet Explorer입니다. Edge로 전환합니다.");
    window.location = "microsoft-edge:" + window.location.href;
}

const theme = createMuiTheme({
    typography : {
        // fontFamily: '"Noto Sans KR", serif',
        fontFamily: '"Noto Sans KR", "고딕"'

    }
})

ReactDOM.render(

  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <App2/>
        </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
