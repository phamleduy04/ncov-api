import getWOM from './wom';

const execute = async (): Promise<void> => {
    await Promise.all([
        getWOM()
    ]);
};
export default execute;