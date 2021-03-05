import * as React from 'react';
import {TcSmartLayout, TcViewTitle} from 'TMPUILibrary/layout';
import {TcNavAnchor} from 'TMPUILibrary/navigation';
import {LipsumPara} from 'TMPUILibrary/ui-elements';

export const AppManual: React.FC = () => {
	return <>
		<TcViewTitle>
			Sub-app template: manual
		</TcViewTitle>

		<TcSmartLayout navigationMode={'scroll'} layoutClassName={'template-manual'}>
			<TcNavAnchor>Overview</TcNavAnchor>

			<LipsumPara paragraphs={12}/>

		</TcSmartLayout>
	</>;
};
