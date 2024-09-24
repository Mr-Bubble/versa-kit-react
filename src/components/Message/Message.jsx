import React from 'react';
import { Button, Snackbar } from '@mui/joy';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

const Message = ({ open, message, severity = 'info', onClose, autoHideDuration = 3000 }) => {
  return (
    <Snackbar
      variant="soft"
      color={severity}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
      autoHideDuration={autoHideDuration}
      endDecorator={
        <Button
          onClick={onClose}
          size="sm"
          variant="soft"
          color={severity}
        >
          Dismiss
        </Button>
      }
    >
      {message}
    </Snackbar>
  );
};

export default Message;
