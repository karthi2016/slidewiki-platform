export default {
    name: 'questions',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {
        let args = params.params? params.params : params;
        if(resource === 'questions.list'){
            /*********connect to microservices*************/
            //todo
            /*********received data from microservices*************/
            let questions = [
                {'id': 12, 'title': 'title for question 1', 'Date': 'Yesterday'},
                {'id': 35, 'title': 'title for question 2', 'Date': '2 hours ago'}
            ];
            callback(null, {questions: questions});
        }
    }
    // other methods
    // create: (req, resource, params, body, config, callback) => {},
    // update: (req, resource, params, body, config, callback) => {}
    // delete: (req, resource, params, config, callback) => {}
};