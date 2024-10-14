import { Autocomplete, Box, Button, Paper, styled, TextField } from "@mui/material"
import { useState } from "react"
import { Skill } from "../../../reduxToolkit/slices/skills/types"

const TextFieldEdited = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#1976d2"
        }
    }
}))

type AddSkillProps = {
    addableSkills: Skill[]
    editedSkills: Skill[]
    setEditedSkills: React.Dispatch<React.SetStateAction<Skill[]>>
    setAddableSkills: React.Dispatch<React.SetStateAction<Skill[]>>
}

const AddSkill: React.FC<AddSkillProps> = ({ addableSkills, editedSkills, setEditedSkills, setAddableSkills }) => {
    const [tempSkills, setTempSkills] = useState<Skill[]>([])

    const handleClick = () => {
        setEditedSkills([...tempSkills, ...editedSkills])
        setTempSkills([])
        setAddableSkills(addableSkills.filter((skill) => !tempSkills.includes(skill)))
    }

    return (
        <div
            style={{
                width: 500,
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                maxHeight: 60
            }}
        >
            <Autocomplete
                multiple
                id="tags-standard"
                limitTags={3}
                options={addableSkills}
                getOptionLabel={(option) => option.title}
                ChipProps={{ sx: { color: "white" } }}
                value={tempSkills}
                onChange={(_, value) => setTempSkills(value)}
                PaperComponent={({ children }) => (
                    <Paper
                        style={{
                            background: "rgba(10, 10, 10, 0.6)",
                            color: "white",
                            fontSize: "medium"
                        }}
                    >
                        {children}
                    </Paper>
                )}
                sx={{
                    flexBasis: "79%",
                    input: {
                        color: "white"
                    }
                }}
                renderTags={(options) =>
                    options.map((option) => (
                        <div
                            key={option.id}
                            style={{
                                color: "white",
                                marginRight: "5px"
                            }}
                        >
                            <img src={option.icon} style={{ marginRight: "5px" }} alt={option.title} width="20" />
                            {option.title}
                        </div>
                    ))
                }
                renderOption={(props, option) => (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                        <img src={option.icon} alt={option.title} width="20" />
                        {option.title} ({option.id})
                    </Box>
                )}
                renderInput={(params) => (
                    <TextFieldEdited
                        {...params}
                        variant="outlined"
                        label="Select skills to add"
                        placeholder="Select skills to add"
                        sx={{
                            label: {
                                color: "white"
                            },
                            fieldset: {
                                borderColor: "white"
                            }
                        }}
                    />
                )}
            />
            <Button
                variant="outlined"
                color="info"
                size="small"
                onClick={handleClick}
                disabled={tempSkills.length ? false : true}
            >
                Add skill
            </Button>
        </div>
    )
}

export default AddSkill
