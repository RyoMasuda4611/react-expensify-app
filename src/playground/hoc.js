import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const withAuthenticate = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticate ? (
              <WrappedComponent {...props} />
            ):(
                <p>please log in</p>
            )}
            
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthenticateInfo = withAuthenticate(Info);

// ReactDOM.render(<AdminInfo isAdmin= {true} info='there are secrets'/>, document.getElementById('app'));
ReactDOM.render(<AuthenticateInfo isAuthenticate= {false} info='there are secrets'/>, document.getElementById('app'));
