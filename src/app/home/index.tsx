import * as React from 'react';

export const AppTemplateHome: React.FC = () => {
	function handleManualClick(): void {
		const {bus} = window.TmpCore;
		bus.broadcast('system.navigate', '/manual-template');
	}

	return <div className={'app-template-home-card'}>
		<div className={'card-content'}>
			<p>
				This is template bundle home card.
			</p>
			<p>
				Application TMP-sub-template is an example of how to create sub-app module for UAC | TMP.
			</p>
			<p>&nbsp;</p>
		</div>

		<div className={'card-bottom-line'}>
			Click <a onClick={handleManualClick}>here</a> to read the manual
		</div>
	</div>;
};
