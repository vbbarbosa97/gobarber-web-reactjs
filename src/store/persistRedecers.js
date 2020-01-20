import storage from 'redux-persist/lib/storage'; 
//o storage utliza o storage local seja web ou native
import { persistReducer } from 'redux-persist';

export default reducers => {
    
    const persistedReducer = persistReducer(
        {
            key: 'gobarber',
            storage,
            whitelist: ['auth','user'],
        },
        reducers
    );

    return persistedReducer;
}