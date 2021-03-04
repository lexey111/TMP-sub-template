import * as React from 'react';
import {ITmpCore} from 'TMPCore';
import {TmpSubApplication} from 'TMPUILibrary/tmp-sub-application';
import {AppTemplateHome} from './app/home';
import {AppManual} from './app/manual';
import {AppTemplate} from './app/template';
import './index.less';

declare global {
	interface Window {
		TmpCore: ITmpCore
	}
}


const SubApplication = new TmpSubApplication();

// register target subapp/view
SubApplication.registerSimpleView('template/example', <AppTemplate/>);

// register target subapp/view - documentation page
SubApplication.registerSimpleView('template/manual', <AppManual/>);

// register view which will be automatically placed to home page
SubApplication.registerSimpleView('template/home', <AppTemplateHome/>);
