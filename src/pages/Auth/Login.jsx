import React, { useEffect } from 'react';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  Label,
  FormFeedback,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from '../../components/common/withRouter';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { loginUser } from '../../store/auth/authSlice';
import { createSelector } from 'reselect';

const Login = (props) => {
  document.title = 'Login | Road Dogs';

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const loginpage = createSelector(
    (state) => state.auth,
    (state) => ({
      error: state.message,
    })
  );

  const { error } = useSelector(loginpage);

  useEffect(() => {
    document.body.className = 'bg-pattern';

    return function cleanup() {
      document.body.className = '';
    };
  });
  return (
    <>
      <div className='bg-overlay'></div>
      <div className='account-pages my-5 pt-5'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={6} md={8} xl={12}>
              <Card>
                <CardBody className='p-4'>
                  <div>
                    <div className='text-center'>
                      <Link to='/'>Logo</Link>
                    </div>
                    <h4 className='font-size-18 text-muted mt-2 text-center'>
                      Welcome Back!
                    </h4>
                    <p className='mb-5 text-center'>
                      Sign in to continue your adventure with Road Dogs!
                    </p>
                    <Form
                      className='form-horizontal'
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? (
                        <Alert color='danger'>
                          <div>{error}</div>
                        </Alert>
                      ) : null}
                      <Row>
                        <Col md={12}>
                          <div className='mb-4'>
                            <Label className='form-label'>Email</Label>
                            <Input
                              name='email'
                              className='form-control'
                              placeholder='Enter email'
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
                            <Label className='form-label'>Password</Label>
                            <Input
                              name='password'
                              value={validation.values.password || ''}
                              type='password'
                              placeholder='Enter Password'
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
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
                                <div> {validation.errors.password} </div>
                              </FormFeedback>
                            ) : null}
                          </div>
                          <Row>
                            <Col>
                              <div className='form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input'
                                  id='customControlInline'
                                />
                                <label
                                  className='form-label form-check-label'
                                  htmlFor='customControlInline'
                                >
                                  Remember me
                                </label>
                              </div>
                            </Col>
                            <Col className='col-7'>
                              <div className='text-md-end mt-3 mt-md-0'>
                                <Link
                                  to='/auth-recoverpw'
                                  className='text-muted'
                                >
                                  <i className='mdi mdi-lock'></i> Forgot your
                                  password?
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <div className='d-grid mt-4'>
                            <button
                              className='btn btn-primary waves-effect waves-light'
                              type='submit'
                            >
                              Log In
                            </button>
                          </div>
                          <div className='mt-4 text-center'>
                            <h5 className='font-size-14 mb-3'>Sign in with</h5>
                            <ul className='list-inline'>
                              <li className='list-inline-item'>
                                <button>
                                  Facebook
                                  <i className='mdi mdi-facebook' />
                                </button>
                              </li>
                              <li className='list-inline-item'>
                                <button>
                                  Google<i className='mdi mdi-google'></i>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className='mt-5 text-center'>
                <p className='text-white-50'>
                  Don't have an account?{' '}
                  <Link to='/register' className='fw-medium text-primary'>
                    Register
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const LoginPage = withRouter(Login)

export default LoginPage;
