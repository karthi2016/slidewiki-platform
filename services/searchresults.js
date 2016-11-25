import {Microservices} from '../configs/microservices';
import rp from 'request-promise';

export default {
    name: 'searchresults',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {
        let args = params.params? params.params : params;

        if(resource === 'searchresults.list'){

            // fetch results from search-microservice
            rp.get({uri: Microservices.search.uri + '/get/' + args.queryparams}).then((results) => {
                let searchResults = JSON.parse(results);
                let deckRevisionsPromises = [], deckTitlePromises = [];
                let userPromises = [], usernames = {}, userIdHash = {};
                let returnData = [];

                searchResults.docs.forEach( (res) => {
                    // console.log(res);
                    let firstRevision = res.revisions.docs[0];

                    // tag user found
                    if(firstRevision.user !== null){
                        userIdHash[parseInt(firstRevision.user)] = true;
                    }

                    //
                    if(res.kind === 'deck'){
                        // console.log(firstRevision);
                        returnData.push({
                            id: res._id + '-' + firstRevision.id,
                            kind: 'deck',
                            title: firstRevision.title,
                            description: res.description,
                            lastModified: firstRevision.timestamp,
                            user: firstRevision.user
                        });
                    }
                    else if(res.kind === 'slide'){

                    }
                    // console.log(revisionToShow);
                    // resultsToShow.push(revisionToShow);



                });

                // get usernames from user ids found
                for(let userId in userIdHash){
                    console.log(userId);
                    userPromises.push(rp.get({uri: Microservices.user.uri + '/user/' + userId}).then((userRes) => {
                        let user = JSON.parse(userRes);
                        console.log(user._id + '->' + user.username);
                        usernames[userId] = user.username;
                    }).catch( (err) => {
                        usernames[userId] = 'Unknown user';
                    }));
                }

                Promise.all(userPromises).then().catch( (err) => {
                    // console.log(err);
                }).then( () => {

                    returnData.forEach( (returnItem) => {
                        returnItem.user = usernames[returnItem.user];
                    });
                    console.log(returnData);
                    // console.log(usernames);
                });


                callback(null, {
                    numFound: searchResults.numFound,
                    docs: searchResults.docs
                });

            }).catch((error) => {
                // console.log(error);
                callback(error);
            });

            // request({
            //     uri: searchServiceQuery,
            //     method: 'GET'
            // }, (err, response, body) => {
            //
            //     let numFound = 0;
            //     let docs = {};
            //     let solrResponse = {};
            //     let error = false;
            //
            //     if(err || response.statusCode !== 200){
            //         error = true;
            //     }
            //     else{
            //         solrResponse = JSON.parse(body);
            //         // console.log(solrResponse);
            //         numFound = solrResponse.numFound;
            //         docs = solrResponse.docs;
            //     }
            //
            //     callback(null, {
            //         numFound: numFound,
            //         docs: docs,
            //         error: error
            //     });
            // });
        }
    }
};
