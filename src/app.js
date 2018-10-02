import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getGeoData } from './store/actions/geo.actions';
import { Root } from './containers/root';
import { configureStore } from './store';

const store = configureStore();

class App extends React.Component {
  componentDidMount() {
    getGeoData()(store.dispatch);
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Root />
        </Provider>
      </BrowserRouter>
    );
  };
}

const renderApp = (Component) => {
  render(<Component />, document.querySelector('#root'));
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
