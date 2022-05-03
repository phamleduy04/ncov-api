import getWOM from './wom.world';
import getStates from './wom.usstate';
import getCityVN from './cityvn';

const execute = async (): Promise<void> => {
    await Promise.all([
        getWOM(),
        getStates(),
        getCityVN(),
    ]);
};
export default execute;