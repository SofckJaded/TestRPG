import { Autocomplete, Box, Button, Paper, styled, TextField } from "@mui/material"
import { useState } from "react"
import { Item } from "../../../reduxToolkit/slices/items/types"
import { allItems } from "../main/Inventory/allItems"

const TextFieldEdited = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#1976d2"
        }
    }
}))

type AddRemoveItemProps = {
    setItemsToAdd: React.Dispatch<React.SetStateAction<Item[]>>
    setEditedItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const AddRemoveItem: React.FC<AddRemoveItemProps> = ({ setItemsToAdd, setEditedItems }) => {
    const [tempItems, setTempItems] = useState<Item[]>([])

    const handleClick = () => {
        setItemsToAdd(tempItems)
        tempItems.forEach((item) => setEditedItems((prev) => [item, ...prev]))
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
                value={tempItems}
                options={allItems}
                getOptionLabel={(option) => option.title}
                ChipProps={{ sx: { color: "white" } }}
                onChange={(_, value) => setTempItems(value)}
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
                        label="Select items to add"
                        placeholder="Select items to add"
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
                disabled={tempItems.length ? false : true}
            >
                Add item
            </Button>
        </div>
    )
}

export default AddRemoveItem
