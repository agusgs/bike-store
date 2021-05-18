import * as PropTypes from "prop-types";

const IfThenElse = (props) => (props.condition ? props.then : props.else || null)

IfThenElse.propTypes = {
    condition: PropTypes.bool.isRequired,
    else: PropTypes.node,
    then: PropTypes.node.isRequired
};

export default IfThenElse