import { FormControl, TextField, MenuItem } from "@mui/material";

export const SelectField = ({
    label,
    name,
    size,
    required,
    disabled,
    form,
    options,
    sx,
}) => {
    const { register, formState } = form;

    const error = formState?.errors?.[name]?.message;

    return (
        <FormControl variant="outlined" sx={sx} fullWidth>
            <TextField
                select
                size={size}
                label={label}
                disabled={disabled}
                error={!!error}
                helperText={error}
                {...register(
                    name,
                    !!required ? { required: "Campo obrigatório" } : {}
                )}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
};
