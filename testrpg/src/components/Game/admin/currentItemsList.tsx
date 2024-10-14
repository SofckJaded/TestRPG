import { List, ListItem, IconButton, ListItemAvatar, ListItemText } from "@mui/material"
import { Item } from "../../../reduxToolkit/slices/items/types"
import DeleteIcon from "@mui/icons-material/Delete"

type CurrentItemsListProps = {
    editedItems: Item[]
    setItemsToRemove: React.Dispatch<React.SetStateAction<Item[]>>
    setEditedItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const CurrentItemsList: React.FC<CurrentItemsListProps> = ({ editedItems, setItemsToRemove, setEditedItems }) => {
    const clickHandle = (item: Item) => {
        setEditedItems((items) => items.filter((i) => i._id !== item._id))
        setItemsToRemove((prevState) => [...prevState!, item])
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
            {editedItems ? (
                editedItems.map((item) => (
                    <ListItem
                        key={item._id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={(e) => clickHandle(item)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <img src={item.icon} alt={item.title} width="30" />
                        </ListItemAvatar>
                        <ListItemText primary={`${item.title}`} />
                    </ListItem>
                ))
            ) : (
                <p style={{ textAlign: "center" }}>No items found</p>
            )}
        </List>
    )
}

export default CurrentItemsList
