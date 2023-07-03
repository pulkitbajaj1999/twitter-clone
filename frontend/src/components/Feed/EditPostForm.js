// react-libraries
import React, { useRef } from 'react'

// thirdparty libraries
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'

const classes = {
  closeIcon: {
    color: 'white',
  },
  editButton: {
    '&:hover': {
      backgroundColor: '#353739',
    },
    borderRadius: 1,
    backgroundColor: '#353739',
    width: '100%',
    height: '100%',
    fontSize: '100px',
    margin: 'auto',
  },
  editIcon: {
    fontSize: '100px',
    color: 'white',
  },
  inputFieldTitle: {
    backgroundColor: '#353739',
    color: 'white',
    marginBottom: 2,
    borderRadius: 1,
    width: '100%',
  },
  inputFieldDescription: {
    backgroundColor: '#353739',
    color: 'white',
    borderRadius: 1,
    width: '100%',
  },
  saveBtn: {
    '&:hover': {
      backgroundColor: 'white',
      transform: 'scale(1.1)',
    },
    marginLeft: 'auto',
    backgroundColor: 'white',
    color: 'black',
  },
}

const EditPostForm = (props) => {
  const imageFileRef = useRef()
  const descriptionRef = useRef()
  const post = props.post
  const saveHandler = () => {
    const formBody = new FormData()
    formBody.append(
      'body',
      descriptionRef.current.querySelector('textarea#description').value
    )
    formBody.append('imageFile', imageFileRef.current.files[0])
    props.onSave(formBody)
  }

  return (
    <React.Fragment>
      <Container sx={{ display: 'flex', padding: 0 }}>
        <Typography>Add Playlist</Typography>
        <IconButton
          aria-label="delete"
          sx={{ marginLeft: 'auto' }}
          onClick={props.onClose}
        >
          <CloseIcon sx={classes.closeIcon} />
        </IconButton>
      </Container>
      <Box
        sx={{
          display: 'flex',
          paddingLeft: 'auto',
          marginBottom: 2,
        }}
      >
        <Container
          sx={{
            display: 'flex',
          }}
        >
          <IconButton
            color="primary"
            sx={classes.editButton}
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" ref={imageFileRef} />
            <EditOutlinedIcon sx={classes.editIcon} />
          </IconButton>
        </Container>
        <Container>
          <TextField
            id="description"
            label="Description"
            defaultValue={post.body}
            sx={classes.inputFieldDescription}
            multiline
            rows={4}
            ref={descriptionRef}
          />
        </Container>
      </Box>
      <Container sx={{ display: 'flex' }}>
        <Button variant="contained" sx={classes.saveBtn} onClick={saveHandler}>
          Save
        </Button>
      </Container>
    </React.Fragment>
  )
}

export default EditPostForm
