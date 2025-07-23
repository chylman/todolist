import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

type EditableSpanPropsType = {
  title: string
  classes?: string
  changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  title,
  classes,
  changeTitle,
}: EditableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [titleInput, setTitleInput] = useState<string>(title.toUpperCase())
  const onEditMode = () => setIsEditMode(true)
  const offEditMode = () => {
    setIsEditMode(false)
    changeTitle(titleInput)
  }

  const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value.toUpperCase())
  }

  return isEditMode ? (
    <TextField
      variant="standard"
      value={titleInput}
      autoFocus
      onBlur={offEditMode}
      onChange={setTitleInputHandler}
    />
  ) : (
    <Typography className={classes} onDoubleClick={onEditMode}>
      {title}
    </Typography>
  )
}
