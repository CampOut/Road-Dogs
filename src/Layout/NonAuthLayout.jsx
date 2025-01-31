import withRouter from '../components/common/withRouter';

const NonAuthLayout = (props) => {
  return <>{props.children}</>;
};

export default withRouter(NonAuthLayout);
