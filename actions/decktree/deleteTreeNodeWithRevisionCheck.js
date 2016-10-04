import {navigateAction} from 'fluxible-router';
import UserProfileStore from '../../stores/UserProfileStore';
import checkNewRevisionNeeded from './checkNewRevisionNeeded';
import deleteTreeNode from './deleteTreeNode';

export default function deleteTreeNodeWithRevisionCheck(context, payload, done) {
    let userid = context.getStore(UserProfileStore).userid;
    if (userid != null && userid !== '') {
        //enrich with user id
        payload.userid = userid;
        context.executeAction(checkNewRevisionNeeded, {
            selector: payload.selector,
            userid: userid
        }, (err, res) => {
            if (err) {

            } else {
                if (res.status.needs_revision) {
                    swal({
                        title: 'New Revision Alert',
                        text: 'This action will create new revisions for slide deck(s). Do you agree with creating the new revisions?',
                        type: 'question',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Yes, make new revisions',
                        confirmButtonClass: 'ui olive button',
                        cancelButtonText: 'No',
                        cancelButtonClass: 'ui red button',
                        buttonsStyling: false
                    }).then((accepted) => {
                        context.executeAction(deleteTreeNode, payload, done);
                    }, (reason) => {
                    });
                } else {
                    context.executeAction(deleteTreeNode, payload, done);
                }
            }
        });
    }
}