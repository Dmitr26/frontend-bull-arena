import { memo } from 'react';
import './Matador.css';

const Mata = () => {
    return (
        <div className="matador">
            <div className="m-hat"></div>
            <div className="m-head"></div>
            <div className="m-eyes">
                <div className="m-eye"></div>
                <div className="m-eye"></div>
            </div>
            <div className="m-beard"></div>
            <div className="m-mouth"></div>
            <div className="m-redflag"></div>
            <div className="m-hands">
                <div className="m-hand"></div>
                <div className="m-hand"></div>
            </div>
            <div className="m-legs">
                <div className="m-leg"></div>
                <div className="m-leg"></div>
            </div>
            <div className="m-boots">
                <div className="m-boot"></div>
                <div className="m-boot"></div>
            </div>
        </div>
    )
}

export default memo(Mata);