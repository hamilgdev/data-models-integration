import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Row, Col } from 'react-bootstrap';
import axiosInstance from '../utils/AxiosInstance';

const LoginForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handlePostSignIn = async () => {
    return axiosInstance.post('auth/sign-in', formData);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handlePostSignIn();
      if (response.status === 200) {
        const { data } = response;

        if (data.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
          history.push('/auth/reset-password', {
            session: data.Session,
            email: formData.email,
          });
        } else {
          handleSuccessfulAuthentication(data);
          history.push('/');
        }
      }
    } catch (error) {
      setShow(true);
      setError(error.response.data.error);
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            onChange={onChange}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={onChange}
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
};

export default LoginForm;
