import { createStore, compose } from 'redux';
import todoApp from './actions/reducers';


const store = createStore(todoApp);
const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;
