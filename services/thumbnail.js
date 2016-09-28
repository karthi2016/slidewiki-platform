import { Microservices } from '../configs/microservices';
import rp from 'request-promise';

/* This service is for creating static markup from the slide's title and content and send it to
   remote file/media server for creating slide thumbnail. */
export default {
    name: 'thumbnail',
    // At least one of the CRUD methods is Required
    create: (req, resource, params, body, config, callback) => {
        if(resource === 'thumbnail.create') {
            const payload = {
                filename: params.filename, // filename without extension .png
                html: params.html // html that should be converted into image after rendering via phantomjs2. For slide's, concatenate title and content
            };
            const options = {
                method: 'POST',
                uri: Microservices.images.uri + '/thumbnail',
                json: true,
                body: payload
            };

            rp(options)
                .then((data) => {
                    console.log(data);
                    callback(false, deck);
                })
                .catch((err) => {
                    console.log(err);
                    callback(err);
                });
        }
    },
};
