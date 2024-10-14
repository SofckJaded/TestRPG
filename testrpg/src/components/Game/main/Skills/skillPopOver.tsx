import React from "react"
import SkillAttribute from "./skillsAttribute"
import Popover from "@mui/material/Popover"
import { Skill } from "../../../../reduxToolkit/slices/skills/types"

type SkillPopOverProps = {
    skill: Skill
}

const SkillPopOver: React.FC<SkillPopOverProps> = ({ skill }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

    const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)

    return (
        <div key={skill.id} style={{ position: "relative" }}>
            <div className="square" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                <img src={skill.icon} alt="" />
            </div>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                PaperProps={{
                    sx: {
                        backgroundColor: "transparent",
                        boxShadow: "unset"
                    }
                }}
            >
                <div className="popOver" id={skill.id.toString()}>
                    <p>
                        <strong>{skill.title}</strong>
                    </p>
                    <div className="popOver-body">
                        <p>
                            Lvl:{" "}
                            {skill.attrs1 ? "1" : skill.attrs2 ? "2" : skill.attrs3 ? "3" : skill.attrs4 ? "4" : ""}
                        </p>
                        <SkillAttribute
                            skill={skill}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start"
                            }}
                        />
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default SkillPopOver
