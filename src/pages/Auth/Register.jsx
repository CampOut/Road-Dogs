import  { useEffect } from 'react';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from 'reactstrap';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { registerUser, resetError } from '../../store/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  document.title = 'Register | Road Dogs';
const navigate = useNavigate()
  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please enter your email'),
      name: Yup.string().required('Please enter your name'),
      password: Yup.string().required('Please enter a password'),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const registerpage = createSelector(
    (state) => state.auth,
    (state) => ({
      user: state.user,
      registrationError: state.message,
    })
  );

  const { user, registrationError } = useSelector(registerpage);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/dash')
    }
  }, [user])

  return (
    <div className='bg-pattern' style={{ height: '100vh' }}>
      <div className='bg-overlay'></div>
      <div className='account-pages pt-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={6} md={8} xl={4}>
              <Card className='mt-5'>
                <CardBody className='p-4'>
                  <div className='text-center'>
                    <Link to='/' className=''>
                      Logo
                    </Link>
                  </div>
                  <h4 className='font-size-18 text-muted text-center mt-2'>
                    Sign Up
                  </h4>
                  <p className='text-muted text-center mb-4'>
                    Start your next big adventure
                  </p>
                  <Form
                    className='form-horizontal'
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {user && user ? (
                      <Alert color='success'>Registration Successful</Alert>
                    ) : null}
                    {registrationError && registrationError ? (
                      <Alert color='danger'>{registrationError}</Alert>
                    ) : null}
                    <Row>
                      <Col md={12}>
                        <div className='mb-4'>
                          <Label className='form-label'>Email</Label>
                          <Input
                            id='email'
                            name='email'
                            className='form-control'
                            type='email'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ''}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type='invalid'>
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className='mb-4'>
                          <Label className='form-label'>Name</Label>
                          <Input
                            name='name'
                            type='text'
                            placeholder='Enter your name'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ''}
                            invalid={
                              validation.touched.name && validation.errors.name
                                ? true
                                : false
                            }
                          />
                          {validation.touched.name && validation.errors.name ? (
                            <FormFeedback type='invalid'>
                              <div>{validation.errors.name}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className='mb-4'>
                          <Label className='form-label'>Password</Label>
                          <Input
                            type='password'
                            name='password'
                            placeholder='Enter password'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ''}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type='invalid'>
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className='form-check'>
                          <input
                            type='checkbox'
                            className='form-check-input'
                            id='term-conditionCheck'
                          />
                          <label
                            className='form-check-label fw-normal'
                            htmlFor='term-conditionCheck'
                          >
                            I accept{' '}
                            <Link to='#' className='text-primary'>
                              Terms and Conditions
                            </Link>
                          </label>
                        </div>
                        <div className='d-grid mt-4'>
                          <button
                            className='btn btn-primary waves-effect waves-light'
                            type='submit'
                          >
                            Register
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p className='text-white-50'>
                  Already have an account ?
                  <Link to='/login' className='fw-medium text-primary'>
                    {' '}
                    Login{' '}
                  </Link>{' '}
                </p>
                <p className='text-white-50'>
                  © {new Date().getFullYear()} Upzet. Crafted with{' '}
                  <i className='mdi mdi-heart text-danger'></i> by Themesdesign
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Register;
