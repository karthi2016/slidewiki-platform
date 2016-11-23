import React from 'react';
import {connectToStores} from 'fluxible-addons-react';
import SlideViewStore from '../../stores/SlideViewStore';
// import Breadcrumb from './Breadcrumb';

class SlideTitlePanel extends React.Component {
    render() {
        let slideTitle = this.props.SlideViewStore.title;
        return (
            <div className="ui menu sw-deck-navigation-panel" ref="titlePanel">
               <div className="item">
                    <div className="sw-breadcrumb" ref="titlePanelBreadcrumb">
                        <div className="ui large breadcrumb">
                            <div className="section">
                                {slideTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SlideTitlePanel = connectToStores(SlideTitlePanel, [SlideViewStore], (context, props) => {
    return {
        SlideViewStore: context.getStore(SlideViewStore).getState()
    };
});
export default SlideTitlePanel;
