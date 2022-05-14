import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import useGlobalState from './store/useGlobalState';
import Context from './store/context';

import App from './App';

const Index = () => {
    const store = useGlobalState();
    return (
        <Context.Provider value={store}>
            <App />    
        </Context.Provider>
    )
}

registerRootComponent(Index);
