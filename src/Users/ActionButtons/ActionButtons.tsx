import React from 'react';
import RolesList from '../../Roles/RolesList/RolesList';
import { Button } from 'reactstrap';
import './ActionButtons.css';
import {apiRequest} from '../../lib/api/api';

interface IProps {
    
  }

const ActionButtons = (props: any) => {
    // const onhandleUnassign = () => {
    //     const {userData} = this.props;
    //     Keyboard.dismiss();
    //     let {oldPassword, password, confirmPassword} = this.state;

    //     console.log(postChangePassword)
    //     this.setState({
    //         spinner: true,
    //         modalLoader: true
    //     }, () => {
    //         apiRequest(postChangePassword, 'post', {
    //             confirmPassword,
    //             isfirstTime: true,
    //             oldPassword,
    //             password,
    //             securityQuestionsDTOs: [
    //                 {
    //                     hasSecurityQuestion: false,
    //                     id: 0,
    //                     memberProfileId: userData.id,
    //                     securityAnswer: "",
    //                     securityQuestion: ""
    //                 }
    //             ],
    //             token: ""
    //         }).then(res => {
    //             // this.props.clearUserData();
    //             // this.props.resetCache();
    //             // this.props.clearLoanDetails();
    //             // token = res.data.data.token;
    //             console.log(res)
    //             this.setState({
    //                 spinner: false,
    //             })
    //             // this.storeToken(token);
    //             let userData = {...res.data};
    //             userData.password = password;

    //             this.props.changePasswordSuccess(userData);
    //             //update password in user object so that it's saved for other api calls
    //             this.props.loginSuccess({
    //                 password: password
    //             });
    //             this.props.showToast('Password Changed Successfully', 'success');
    //             this.props.navigation.navigate('Dashboard')

    //         })
    //             .catch(error => {
    //                 console.log(error.response)

    //                 if (error.response) {
    //                     this.props.showToast(error.response.data.message, 'error')
    //                     console.log(error.response)
    //                 } else {
    //                     this.props.showToast(error.message, 'error')
    //                 }
    //                 this.setState({
    //                     spinner: false,
    //                 })
    //             });
    //     })
    // };
    return (
        <div className='action-group'>
            {/* <RolesList label={'Assign Roles'} color='primary'/>
            <RolesList label={'Unassign Roles'} color='secondary'/> */}
            <Button color="secondary" onClick={props.handleEdit}>Edit</Button>{' '}
        </div>
    )
}

export default ActionButtons;