export type Props = {
  removeMedia?: Function,
  file?: {
    id?: string,
    filename?: string,
    url?: string,
  },
};

import React, { PropTypes } from 'react';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

const File = (props) => {
  function handleclick() {
    const mediaId = props.file.id;
    props.removeMedia(mediaId);
  }

  return (
      <Card>
      <CardMedia overlay={ <CardTitle title={ props.file.filename } /> }>
        <img src={ props.file.url } alt={ props.file.filename } />
      </CardMedia>
        <CardActions>
          <IconButton tooltip="Edit image">
            <EditIcon />
          </IconButton>
          <IconButton onClick={ handleclick } tooltip="Permanently delete">
            <RemoveIcon />
          </IconButton>
        </CardActions>
      </Card>
  );
};

export default File;
