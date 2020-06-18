import React, {Component} from 'react';

export default class UserLogout extends Component {

    componentDidMount(){
        localStorage.removeItem('UserSignedIn');
        localStorage.removeItem('userid');
        this.props.history.push('/');
        window.location.reload();
    }
    render() {

        return (
            <div>
            </div>
        );
    }

}