import { Component } from "react";
import clapping1 from '../assets/clapping1.wav';
import clapping2 from '../assets/clapping2.wav';
import clapping3 from '../assets/clapping3.wav';
import clapping4 from '../assets/clapping4.wav';
import Mata from "./Matador/oldIndex";

interface MatadorInterface {
    applause?: number;
    matadorPosition?: number;
    setMatarodPosition?: (position: number) => void;
}

interface MatadorState {
    prevApplause: number
}

class OldMatador extends Component<MatadorInterface, MatadorState> {

    constructor(props: object) {
        super(props);
        this.state = {
            prevApplause: 0
        }
    }

    private reactToBull = (event: Event) => {

        let { matadorPosition, setMatarodPosition } = this.props;

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

    private soundOfApplause = (soundFile: string) => {
        const clapclap = new Audio(soundFile);
        clapclap.play();
    }

    private startOfApplause = (applause: number) => {
        switch (applause) {
            case 0:
                this.soundOfApplause(clapping1);
                break;
            case 1:
                this.soundOfApplause(clapping2);
                break;
            case 2:
                this.soundOfApplause(clapping3);
                break;
            case 3:
                this.soundOfApplause(clapping4);
                break;
            default:
                console.log(`ERROR: Invalid audio file specified`);
        }
    }

    componentDidMount() {
        document.addEventListener('bullRun', this.reactToBull);
    }

    componentWillUnmount() {
        document.removeEventListener('bullRun', this.reactToBull);
    }

    componentDidUpdate(prevProps: Readonly<MatadorInterface>): void {
        if (this.props.applause !== prevProps.applause) {
            let thisApplause = (this.props.applause === undefined) ? 0 : this.props.applause;
            this.startOfApplause(thisApplause);
            this.setState({ prevApplause: thisApplause });
        }
    }

    shouldComponentUpdate(nextProps: Readonly<MatadorInterface>, nextState: Readonly<MatadorState>): boolean {
        if (nextProps.applause === 3 && nextState.prevApplause !== 3) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return <div>
            <Mata />
        </div>
    }
}

export { OldMatador }