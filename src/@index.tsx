import * as React from 'react';
import {TmpSubApplication} from 'TMPUILibrary/tmp-sub-application';
import {AppTemplateHome} from './app/home';
import {AppTemplate} from './app/template';
import './index.less';

const SubApplication = new TmpSubApplication();

// register target subapp/view
SubApplication.registerSimpleView('template/example', <AppTemplate/>);

// register view which will be automatically placed to home page
SubApplication.registerSimpleView('template/home', <AppTemplateHome/>);
