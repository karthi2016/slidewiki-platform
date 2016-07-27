import React from 'react';
import { NavLink } from 'fluxible-router';
require('dotenv').config({slient: true});

class Footer extends React.Component {
    render() {
        let versionString = '';
        if (process.env.SWREPO_BRANCH && process.env.SWREPO_HEAD) {
            versionString = '- Build: ' + process.env.SWREPO_BRANCH + ' @' + process.env.SWREPO_HEAD;
        }
        return (
            <div className="ui footer sticky segment" ref="footer">
                <div className="ui center aligned container">
                    <p>
                      Copyright &copy; 2016 &middot; All Rights Reserved {versionString}
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;
