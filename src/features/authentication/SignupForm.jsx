import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email validation pattern: /\S+@\S+\.\S+/
function SignupForm() {
  // Custom signup hook (handles API call + loading state)
  const { signup, isLoading } = useSignup();

  // useForm hook to handle form state and validation
  const {
    register,          // Registers inputs for tracking
    handleSubmit,      // Handles form submission
    getValues,         // Gets current field values
    reset,             // Resets form fields
    formState: { errors }, // Contains validation errors for each field
  } = useForm();

  /**
   * Submit handler for form
   * @param {Object} data - Form data (fullName, email, password, etc.)
   */
  function onSubmit({ fullName, email, password }) {
    // Call signup mutation
    signup(
      { fullName, email, password },
      {
        // Reset form once request completes (success or failure)
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name Field */}
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading} // Disable while submitting
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Email Field */}
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email",
            },
          })}
        />
      </FormRow>

      {/* Password Field */}
      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password length should be at least 8 characters",
            },
          })}
        />
      </FormRow>

      {/* Confirm Password Field */}
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords are not matching",
          })}
        />
      </FormRow>

      {/* Buttons */}
      <FormRow>
        {/* Reset button */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        {/* Submit button */}
        <Button type="submit" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
