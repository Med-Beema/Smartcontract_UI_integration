import React from 'react';
import "./topbar.css";



export default function Topbar(props) {
  
  return <div className="topbar">
  <div className="topbarWrapper">
    <div className="topLeft">
      <span className="logo">DMI</span>
    </div>
    <div className="topRight">
      <div className='buttons'>
          { <button onClick={props.connected}>Connect Wallet</button> }
      </div>
    </div>
  </div>
</div>
}

//onClick={this.props.connected}
         