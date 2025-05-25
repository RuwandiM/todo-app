import { getCurrentWindow } from '@tauri-apps/api/window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faExpand, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import logo from "../assets/logo.png";

const appWindow = getCurrentWindow();

const TitleBar = () => {
    const closeWindows = async () => {
        await appWindow.close();    
    }

    const minimizeWindows = async () => {
        await appWindow.minimize();
    }

    const toggleWindows = async () => {
        await appWindow.toggleMaximize();
    }

    return (
        <div className="titlebar">
            <img src={logo} alt="Logo" className="logo" />
            <div className="window-buttons">
                <button onClick={() => minimizeWindows()}><FontAwesomeIcon icon={faMinus} className="titlebarIcon" /></button>
                <button onClick={() => toggleWindows()}><FontAwesomeIcon icon={faExpand} className="titlebarIcon" /></button>
                <button onClick={() => closeWindows()}><FontAwesomeIcon icon={faXmark} className="titlebarIcon" /></button>
            </div>
        </div>
    )
}

export default TitleBar;