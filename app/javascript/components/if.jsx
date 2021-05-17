import * as PropTypes from "prop-types";

const If = (props) => (props.condition ? props.then : props.else || null)

If.propTypes = {
    condition: PropTypes.bool.isRequired,
    else: PropTypes.node,
    then: PropTypes.node.isRequired
};

export default If