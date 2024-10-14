import React from "react"
import { styled } from "@mui/material/styles"
import { Button, TextField } from "@mui/material"

const TextFieldEdited = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#0288d1"
        }
    }
}))

type GetUserProps = {
    handleForm: (e: React.FormEvent<HTMLFormElement>) => void
    loginField: string
    setLoginField: (arg: string) => void
    errorStatus: boolean
    errorMessage: string
}

const GetUserForm: React.FC<GetUserProps> = ({ handleForm, loginField, setLoginField, errorStatus, errorMessage }) => {
    return (
        <form onSubmit={handleForm}>
            <TextFieldEdited
                id="outlined-basic"
                color="info"
                label="Login"
                error={errorStatus}
                helperText={errorMessage}
                required
                inputProps={{ minLength: "3" }}
                variant="outlined"
                value={loginField}
                onChange={(event) => setLoginField(event.target.value)}
                InputLabelProps={{ sx: { color: "white" } }}
                sx={{
                    input: {
                        color: "white"
                    },
                    fieldset: {
                        borderColor: "white"
                    }
                }}
            />
            <Button
                type="submit"
                variant="outlined"
                color="info"
                sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                disabled={loginField ? false : true}
            >
                Submit
            </Button>
        </form>
    )
}

export default GetUserForm
