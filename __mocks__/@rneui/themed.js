const React = require('react');

module.exports = {
  Button: React.forwardRef((props, ref) => {
    return React.createElement('button', { ref, ...props }, props.children || props.title);
  }),
  Overlay: React.forwardRef((props, ref) => {
    return React.createElement('div', { ref, ...props }, props.children);
  }),
};
