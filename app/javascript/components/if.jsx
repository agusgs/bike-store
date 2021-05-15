import * as PropTypes from "prop-types";

const If = (props) => (props.condition ? props.then : props.else)

If.propTypes = {
    condition: PropTypes.bool,
    else: PropTypes.element,
    then: PropTypes.element
};

export default If