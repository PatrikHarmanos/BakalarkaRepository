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

// AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
