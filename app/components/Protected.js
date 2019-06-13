// EXAMPLE PROTECTED PAGE

import React from 'react';
import withAuth from './withAuth';

class ProtectedComp extends React.Component {
    render() {
        return (
            <div>Hello World: Welcome to Protected Page</div>
        )
    }
}

export default withAuth(ProtectedComp);