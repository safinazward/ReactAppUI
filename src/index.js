import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_sv from 'react-intl/locale-data/sv';
import locale_fr from 'react-intl/locale-data/fr';
import locale_pt from 'react-intl/locale-data/pt';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


addLocaleData([...locale_en, ...locale_sv, ...locale_pt, ...locale_fr]);
ReactDOM.render(
	<Provider store={configureStore()}>
		<App id="app1" />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
