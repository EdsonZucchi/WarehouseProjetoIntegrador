import { FormControl, TextField } from "@mui/material";

export const DateField = ({
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
                autoComplete="off"
                label={label}
                disabled={disabled}
                error={!!error}
                helperText={error}
                type="text"
                {...register(
                    name,
                    !!required
                      ? {
                          required,
                        }
                      : {}
                  )}
            />
        </FormControl>
    );
};
