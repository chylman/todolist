import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'

type Props = {
  onCreateItem: (title: string) => void
  maxTitleLength: number
}

export const CreateItemForm = ({ onCreateItem, maxTitleLength }: Props) => {
  const [itemInput, setItemInput] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const isAddBtnDisabled = !itemInput || itemInput.length > maxTitleLength

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim()
    if (trimmedTitle) {
      onCreateItem(trimmedTitle)
    } else {
      setError(true)
    }

    setItemInput('')
  }

  const setItemInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setItemInput(e.currentTarget.value)
  }

  const onKeyDownItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isAddBtnDisabled) {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label={`${maxTitleLength} charters max length`}
        value={itemInput}
        onChange={setItemInputHandler}
        onKeyDown={onKeyDownItemHandler}
        className={error ? 'error' : ''}
        error={error || itemInput.length > maxTitleLength}
        helperText={error && 'enter valid title'}
      />
      <IconButton
        aria-label={'add'}
        disabled={isAddBtnDisabled}
        onClick={createItemHandler}
      >
        <AddBoxIcon fontSize="large" />
      </IconButton>
      {itemInput.length > maxTitleLength && (
        <div style={{ color: 'red' }}> title is too long</div>
      )}
    </div>
  )
}
