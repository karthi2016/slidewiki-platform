import React from 'react';
import {NavLink} from 'fluxible-router';
import {connectToStores} from 'fluxible-addons-react';
import SlideViewStore from '../../../../../stores/SlideViewStore';

class SlideViewPanel extends React.Component {
    render() {
        //styles should match slideContentEditor for consistency
        const compHeaderStyle = {
            minWidth: '100%',
            overflowY: 'auto',
            position: 'relative'
        };
        const compStyle = {
            maxHeight: 450,
            minHeight: 450,
            overflowY: 'auto',
            position: 'relative'
        };
        const compSpeakerStyle = {
            maxHeight: 50,
            minHeight: 50,
            overflowY: 'auto',
            position: 'relative'
        };


        return (
          <div className="ui bottom attached segment">
              <div ref="slideViewPanel" className="ui" style={compStyle}>
              <div dangerouslySetInnerHTML={{__html:this.props.SlideViewStore.title}} />
                  <div className="reveal">
                      <div className="slides">
                          <div id="inlineContent" dangerouslySetInnerHTML={{__html:this.props.SlideViewStore.content}} />
                      </div>
                  </div>
              </div>
              <div ref="slideViewPanelSpeakerNotes" className="ui" style={compSpeakerStyle}>
                  {this.props.SlideViewStore.speakernotes ? <b>Speaker Notes:</b> : ''}
                  <div dangerouslySetInnerHTML={{__html:this.props.SlideViewStore.speakernotes}} />
              </div>
        </div>
        );
    }
    componentDidMount(){
        if(process.env.BROWSER){

            //Function toi fit contents in edit and view component
            //$(".pptx2html").addClass('schaal');
            //$(".pptx2html [style*='absolute']").addClass('schaal');
            if ($('.pptx2html').length)
            {
                $(".pptx2html").css({'transform': 'scale(0.5,0.5)', 'transform-origin': 'top left'});
                //$("#signinModal").css({'zIndex': '99999', 'position': 'absolute'});

            } else {
                $(".slides").css({'transform': 'scale(0.5,0.5)', 'transform-origin': 'top left'});
                //$("#signinModal").css({'zIndex': '99999', 'position': 'absolute'});
            }
        }
    }
}

SlideViewPanel = connectToStores(SlideViewPanel, [SlideViewStore], (context, props) => {
    return {
        SlideViewStore: context.getStore(SlideViewStore).getState()
    };
});
export default SlideViewPanel;
