import React from 'react';

class SearchResultsSubList extends React.Component {

    render() {
        let subListItems = this.props.data.map((item, index) => {
            if(index !== 0){
                let resultLink = '';
                let itemIcon = '';

                switch (item.kind) {
                    case 'slide_revision':
                        if(item.parent_deck && item.parent_deck !== 'undefined'){
                            resultLink = '/deck/' + item.parent_deck + '/slide/' + item.parent_id + '-' + item.id;
                        }
                        else{
                            resultLink = '/slide/' + item.parent_id + '-' + item.id;
                            itemIcon = <div className="ui yellow mini label">inactive</div>;
                        }
                        break;
                    case 'deck_revision':
                        resultLink = '/deck/' + item.parent_id + '-' + item.id;
                        break;
                }

                return (
                    <div className="row" key={index}><a href={resultLink}>Revision {item.id}</a> {itemIcon}</div>
                );
            }
        });
        return (

            <div className="ui centered grid">
                <div className="fourteen wide left aligned column">
                    {subListItems}
                </div>
            </div>
        );
    }
}

export default SearchResultsSubList;
