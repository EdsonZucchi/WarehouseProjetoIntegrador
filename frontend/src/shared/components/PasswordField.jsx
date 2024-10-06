import { FormControl, TextField } from "@mui/material";

export const PasswordField = ({
  label,
  name,
  size,
  required,
  disabled,
  form,
  sx,
}) => {
  const { register, formState } = form;

  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl variant="outlined" sx={sx}>
      <TextField
        size={size}
        autoComplete='off'
        label={label}
        disabled={disabled}
        type='password'
        error={!!error}
        helperText={error}
        {...register(
          name,
          !!required
            ? {
                required,
              }
            : {}
        )}
      ></TextField>
    </FormControl>
  );
};
