import styled, { css } from "styled-components";

/**
 * Form wrapper
 * - Uses CSS variables for background/text depending on theme
 * - Switches style between "regular" and "modal" layout
 */
const Form = styled.form`
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 60rem;
      max-height: 80vh;
      padding: 2rem;
      border-radius: 12px;
      overflow-y: auto;
      box-shadow: var(--shadow-md);

      /* 👇 Custom scrollbar (works in both light & dark) */
      scrollbar-width: thin; 
      scrollbar-color: var(--color-brand-500) var(--color-grey-200); 

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background: var(--color-grey-200);
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--color-brand-500);
        border-radius: 4px;
        border: 2px solid var(--color-grey-200);
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-brand-600);
      }
    `}

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
