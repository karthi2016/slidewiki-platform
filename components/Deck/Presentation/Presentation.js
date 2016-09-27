import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'fluxible-router';
import {connectToStores} from 'fluxible-addons-react';
//import PresentationSlideList from './PresentationSlideList';
import PresentationSlide from './PresentationSlide';
import DeckTreeStore from '../../../stores/DeckTreeStore';
import PresentationStore from '../../../stores/PresentationStore';
import loadPresentation from '../../../actions/loadPresentation';

let playerCss = {
    height: '100%',
    position: 'absolute',
    top: '0',
    font-size: '100%';
};

let clearStyle = {
    clear: 'both'
};


class Presentation extends React.Component{
    constructor(props){
        super(props);
        this.playerCss = playerCss;
        this.slides = [];
        this.startingSlide = this.props.PresentationStore.selector.sid;
        this.deck = this.props.PresentationStore.selector.id;
        this.revealDiv = null;
    }

    componentDidMount(){
        if(process.env.BROWSER){
             //loading reveal style
            //Hide the header and footer
            $('.ui.footer.sticky.segment').css({'display': 'none'});
            $('.ui.inverted.blue.menu, .ui.inverted.menu .blue.active.item').css({'display': 'none'});
            $('.ui.footer.sticky.segment').attr({'aria-hidden': 'hidden', 'hidden': 'hidden'});
            $('.ui.inverted.blue.menu, .ui.inverted.menu .blue.active.item').attr({'aria-hidden': 'hidden', 'hidden': 'hidden'});
            $('.ui.horizontal.segments.footer').css({'display': 'none'});
            $('.ui.horizontal.segments.footer').attr({'aria-hidden': 'hidden', 'hidden': 'hidden'});
            let styleName = this.props.PresentationStore.theme;


            this.revealDiv.style.display = 'inline';


            Reveal.initialize({
                history: true,
                dependencies: [
                    { src: '/custom_modules/reveal.js/plugin/notes/notes.js', async: true }
                ]
            });


        }
    }

    componentDidUpdate(){

    }
    render(){
        this.slides = this.getSlides();
        return(
            <div>
                <div className="reveal" style={this.playerCss}  ref={(refToDiv) => this.revealDiv = refToDiv} >
                    <div className="slides">
        			     	{this.slides}
        			      </div>
                </div>
                <br style={clearStyle} />
            </div>
        );
    }

    getSlides(){
        let slides = this.props.PresentationStore.content;

        let returnList = [];
        if(slides){
            for (let i = 0; i < slides.length; i++) {
                let slide = slides[i];
                let notes = ''
                if(slide.speakernotes){
                    notes =  '<aside class="notes">' + slide.speakernotes + '</aside>';
                }
                let content = slide.content + notes;
                returnList.push(<PresentationSlide content={content} key={slide.id} id={'slide-' + slide.id} />);
            }
            return returnList;

        }
        else{
            return (<section />);
        }
    }

}

Presentation.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

Presentation = connectToStores(Presentation, [PresentationStore], (context, props) => {
    return {
        PresentationStore: context.getStore(PresentationStore).getState()
    };
});


export default Presentation;
