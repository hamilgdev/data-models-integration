import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useHistory } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import Alert from 'react-bootstrap/Alert';
import { Col, Row } from 'react-bootstrap';

function ResetPasswordForm() {
  const location = useLocation();
  const history = useHistory();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleSuccessfulAuthentication = (data) => {
    localStorage.setItem('accessToken', data.AuthenticationResult.AccessToken);
    localStorage.setItem('idToken', data.AuthenticationResult.IdToken);
    localStorage.setItem(
      'refreshToken',
      data.AuthenticationResult.RefreshToken
    );
  };

  const handlePostNewPassword = async () => {
    return axiosInstance.post('auth/new-password', {
      session: location.state.session,
      email: location.state.email,
      newPassword: formData.newPassword,
    });
  };

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handlePostNewPassword();
      if (response.status === 200) {
        handleSuccessfulAuthentication(response.data);
        history.push('/');
      }
    } catch (error) {
      setShow(true);
      setError(error.response.data.error);
      console.error('Failed to set new password', error);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='newPassword'
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={onchange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>

      <Row
        style={{
          marginTop: '20px',
        }}
      >
        <Col>
          <Alert
            show={show}
            variant='danger'
            dismissible
            onClose={() => setShow(false)}
          >
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Col>
      </Row>
    </>
  );
}

export default ResetPasswordForm;
