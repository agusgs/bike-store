import * as PropTypes from "prop-types";

const If = (props) => (props.condition ? props.children : null)

If.propTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default If