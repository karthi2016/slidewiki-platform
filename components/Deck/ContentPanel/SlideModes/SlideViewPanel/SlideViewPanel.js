import React from 'react';
import {NavLink} from 'fluxible-router';
import {connectToStores} from 'fluxible-addons-react';
import SlideViewStore from '../../../../../stores/SlideViewStore';
import ChartRender from '../../../util/ChartRender';
import ResizeAware from 'react-resize-aware';
import { findDOMNode } from 'react-dom';
const ReactDOM = require('react-dom');

class SlideViewPanel extends React.Component {
    render() {
        //styles should match slideContentEditor for consistency
        const compHeaderStyle = {
            minWidth: '100%',
            overflowY: 'auto',
            position: 'relative'
        };
        const compStyle = {
            //minWidth: '100%',
            // maxHeight: 450,
            minHeight: 450,
            //minHeight: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            //overflowY: 'visible',
            //overflow: 'hidden,'
            position: 'relative'
        };
        const compSpeakerStyle = {
            maxHeight: 50,
            minHeight: 50,
            overflowY: 'auto',
            position: 'relative'
        };

        const containerMinHeight = {

        }


        return (
          <div className="ui bottom attached segment">
              <ResizeAware ref='container' id='container'>
                  <div ref="slideViewPanel" className="ui" style={compStyle}>
                      <div className="reveal">
                          <div className="slides">
                              <div id="inlineContent" dangerouslySetInnerHTML={{__html:this.props.SlideViewStore.content}} />
                          </div>
                          <br />
                      </div>
                  </div>
                  <div ref="slideViewPanelSpeakerNotes" className="ui" style={compSpeakerStyle}>
                      {this.props.SlideViewStore.speakernotes ? <b>Speaker notes:</b> : ''}
                      <div dangerouslySetInnerHTML={{__html:this.props.SlideViewStore.speakernotes}} />
                  </div>
              </ResizeAware>
        </div>
        );
    }
    componentDidMount(){


        if(process.env.BROWSER){
            //Function toi fit contents in edit and view component
            //$(".pptx2html").addClass('schaal');
            //$(".pptx2html [style*='absolute']").addClass('schaal');
            /*
            if ($('.pptx2html').length)
            {
                $(".pptx2html").css({'transform': 'scale(0.5,0.5)', 'transform-origin': 'top left'});
                //$("#signinModal").css({'zIndex': '99999', 'position': 'absolute'});

            } else {
                //do nothing - relative content scales anyways.
                //$(".slides").css({'transform': 'scale(0.5,0.5)', 'transform-origin': 'top left'});
                //$("#signinModal").css({'zIndex': '99999', 'position': 'absolute'});
            }
            */
            //initial resize
            this.resize();
            ReactDOM.findDOMNode(this.refs.container).addEventListener('resize', (evt) =>
                {
                //console.log('resize');
                this.resize();
            });
        }
        // If there are some charts in the slide, render them.
        if ($("div[id^=chart]").length) this.forceUpdate();
    }
    componentDidUpdate() {
        // update mathjax rendering
        // add to the mathjax rendering queue the command to type-set the inlineContent
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"inlineContent"]);

        this.resize();
        ChartRender.createCharts();
    }
    resize()
    {
        let containerwidth = document.getElementById('container').offsetWidth;
        let containerheight = document.getElementById('container').offsetHeight;
        //console.log('Component has been resized! Width =' + containerwidth + 'height' + containerheight);

        //reset scaling of pptx2html element to get original size
        $(".pptx2html").css({'transform': '', 'transform-origin': ''});

        //Function to fit contents in edit and view component
        let pptxwidth = $('.pptx2html').width();
        let pptxheight = $('.pptx2html').height();

        //only calculate scaleration for width for now
        this.scaleratio = containerwidth / pptxwidth;

        if ($('.pptx2html').length)
        {
            $(".pptx2html").css({'transform': '', 'transform-origin': ''});
            $(".pptx2html").css({'transform': 'scale('+this.scaleratio+','+this.scaleratio+')', 'transform-origin': 'top left'});

            //set height of content panel to at least size of pptx2html + (100 pixels * scaleratio).
            //width = pptxwidth + 40
            //height + 40
            //this.refs.slideViewPanel.style.width = ((pptxwidth + 40) * this.scaleratio) + 'px';
            //this.refs.slideViewPanel.style.padding = '20px 20px 20px 20px';
            //$(".pptx2html").css({'padding': '20px 20px 20px 20px'});
            //style.padding left = 20 px, top 20 px
            this.refs.slideViewPanel.style.height = ((pptxheight + 0 + 20) * this.scaleratio) + 'px';

            $(".pptx2html").css({'borderStyle': 'none none double none ', 'borderColor': '#3366ff', 'box-shadow': '0px 100px 1000px #ff8787'});
            //all borders
            //$(".pptx2html").css({'borderStyle': 'double double double double ', 'borderColor': '#3366ff', 'box-shadow': '0px 100px 1000px #ff8787'});
        }
    }
}

SlideViewPanel = connectToStores(SlideViewPanel, [SlideViewStore], (context, props) => {
    return {
        SlideViewStore: context.getStore(SlideViewStore).getState()
    };
});
export default SlideViewPanel;
