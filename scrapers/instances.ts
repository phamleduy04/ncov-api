import getWOM from './wom.world';
import getStates from './wom.usstate';

const execute = async (): Promise<void> => {
    await Promise.all([
        getWOM(),
        getStates(),
    ]);
};
export default execute;