import React from "react"
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"
    }
}))

const LvlBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <p style={{ textAlign: "center", color: "white", marginBottom: "5px" }}>0%</p>
            <BorderLinearProgress variant="determinate" value={0} />
        </Box>
    )
}

export default LvlBar
