import ErrorStore from '../../stores/ErrorStore';
import { ErrorsList } from '../../components/Error/util/ErrorDescriptionUtil';
const fumble = require('fumble');

export default function searchStringEmptyError(context, payload, done) {
    const error = fumble.http.create(422, 'Unprocessable Entity');
    ErrorsList.SEARCH_QUERY_EMPTY_ERROR.statusCode = error.statusCode;
    ErrorsList.SEARCH_QUERY_EMPTY_ERROR.statusText = error.message;
    context.dispatch('SEARCH_QUERY_EMPTY_ERROR', ErrorsList.SEARCH_QUERY_EMPTY_ERROR);
    done(error);
}
