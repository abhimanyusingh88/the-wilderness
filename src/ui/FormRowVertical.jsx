import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 1.2 rem 0;

  /* Optional alignment for content (e.g., buttons) */
  /* align-items: ${({ align }) => align || "stretch"}; */
`;

const Label = styled.label`
  font-weight: 500;
  /* color: var(--color-grey-700); */
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, align }) {
  return (
    <StyledFormRow align={align}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.propTypes = {
  label: PropTypes.string,
  htmlForId: PropTypes.string,
  error: PropTypes.string,
  align: PropTypes.oneOf(["flex-start", "center", "flex-end", "stretch"]),
  children: PropTypes.node.isRequired,
};

export default FormRow;
