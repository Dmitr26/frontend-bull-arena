import { useEffect, memo, useState } from "react";
import clapping1 from '../assets/clapping1.wav';
import clapping2 from '../assets/clapping2.wav';
import clapping3 from '../assets/clapping3.wav';
import clapping4 from '../assets/clapping4.wav';
import Mata from "./Matador/index";

interface MatadorInterface {
    applause?: number;
    matadorPosition?: number;
    setMatarodPosition?: (position: number) => void;
}

const MatadorFC: React.FC<MatadorInterface> = ({ applause, matadorPosition, setMatarodPosition }) => {

    const [prevApplause, setPrevApplause] = useState(0);

    const reactToBull = (event: Event) => {
        if ((event as CustomEvent).detail.position === matadorPosition) {

            function moveAway(): number {
                var num = Math.floor(Math.random() * 8);
                return (num === matadorPosition) ? moveAway() : num;
            }

            let oldPosition = matadorPosition;
            let newPosition = moveAway();
            console.log(`Matador is moving from ${oldPosition} to ${newPosition}`);
            if (setMatarodPosition) setMatarodPosition(newPosition);
        }
    }

    useEffect(() => {
        document.addEventListener('bullRun', reactToBull);
        return () => {
            document.removeEventListener('bullRun', reactToBull);
        };
    }, [matadorPosition, setMatarodPosition]);

    useEffect(() => {

        const soundOfApplause = (soundFile: string | undefined) => {
            const clapclap = new Audio(soundFile);
            clapclap.play();
        }

        switch (applause) {
            case 0:
                soundOfApplause(clapping1);
                break;
            case 1:
                soundOfApplause(clapping2);
                break;
            case 2:
                soundOfApplause(clapping3);
                break;
            case 3:
                soundOfApplause(clapping4);
                break;
            default:
                console.log(`ERROR: Invalid audio file specified`);
        }

        let prevApplause = (applause === undefined) ? 0 : applause;
        setPrevApplause(prevApplause);
    }, [applause, prevApplause]);

    return <div>
        <Mata oldOrYoung={"young"} />
    </div>
}

const checkForApplause = (prevValues: MatadorInterface, nextValues: MatadorInterface) => {
    if (nextValues.applause === 3 && prevValues.applause !== 3) {
        return false;
    }
    return true;
}

export const Matador = memo(MatadorFC, checkForApplause);