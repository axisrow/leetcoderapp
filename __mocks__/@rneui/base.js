const React = require('react');

module.exports = {
  Text: React.forwardRef((props, ref) => {
    return React.createElement('span', { ref, ...props }, props.children);
  }),
  Button: React.forwardRef((props, ref) => {
    return React.createElement('button', { ref, ...props }, props.children || props.title);
  }),
};
