import './App.css';
import './assets/css/general.css';
import { useState, useEffect } from 'react';
import PageRoutes from './components/page_routes';
import DeviceError from './components/device_error';


function App() {
  

  const [deviceIsMobile, setDeviceIsMobile] = useState(false)

  const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  useEffect(()=>{
    if(isMobile.any()){
      setDeviceIsMobile(true)
    }
  },[deviceIsMobile])

  return (
    <div className="App">
      {(deviceIsMobile ? <PageRoutes />: <DeviceError />)}
    </div>
  );
}

export default App;
