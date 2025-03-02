import {Button} from "./Button.tsx";

export const FilterButtons = () => {
    return (
        <div>
            <Button title={'All'}></Button>
            <Button title={'Active'}></Button>
            <Button title={'Completed'}></Button>
        </div>
    );
};
