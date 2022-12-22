import PropTypes from 'prop-types';

const If = ({ condition, render, children, elseRender = null }) => {
  if (condition) {
    return render ? render() : children;
  }
  return elseRender && elseRender();
};

If.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node,
  render: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default If;
