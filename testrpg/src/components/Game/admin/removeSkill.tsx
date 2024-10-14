import {
    List,
    ListItem,
    IconButton,
    ListItemAvatar,
    ListItemText,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    SelectChangeEvent
} from "@mui/material"
import { Skill } from "../../../reduxToolkit/slices/skills/types"
import DeleteIcon from "@mui/icons-material/Delete"

type RemoveSkillProps = {
    editedSkills: Skill[]
    setEditedSkills: React.Dispatch<React.SetStateAction<Skill[]>>
}

const RemoveSkill: React.FC<RemoveSkillProps> = ({ editedSkills, setEditedSkills }) => {
    const changeHandle = (e: SelectChangeEvent<number>, skillId: number) => {
        setEditedSkills((prevState) =>
            prevState.map((skill) => {
                if (skill.id === skillId) {
                    skill.lvl = Number(e.target.value)
                }
                return { ...skill }
            })
        )
    }

    const clickHandle = (skill: Skill) => {
        setEditedSkills((prevState) => prevState.filter((prev) => prev.id !== skill.id))
    }

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 450,
                bgcolor: "",
                maxHeight: 400,
                overflow: "auto"
            }}
        >
            {editedSkills ? (
                editedSkills.map((skill) => (
                    <ListItem
                        key={skill.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={(e) => clickHandle(skill)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <img src={skill.icon} alt={skill.title} width="30" />
                        </ListItemAvatar>
                        <ListItemText primary={`${skill.title}`} />
                        <FormControl sx={{ m: 1, minWidth: 90, color: "white" }}>
                            <InputLabel id="demo-simple-select-helper-label" sx={{ color: "white" }}>
                                LVL
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                defaultValue={1}
                                id="demo-simple-select-helper"
                                value={skill.lvl}
                                label="LVL"
                                sx={{
                                    color: "white",
                                    fieldset: {
                                        borderColor: "white"
                                    }
                                }}
                                onChange={(event) => changeHandle(event, skill.id)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>No skills found</p>
            )}
        </List>
    )
}

export default RemoveSkill
