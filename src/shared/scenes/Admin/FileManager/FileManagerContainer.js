/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  uploadFiles,
  fetchAttachmentsIfNeeded,
  deleteAttachment,
  selectFile,
} from '../state';
import FileManager from './FileManager';

type Props = {
  handleFinish: () => void,
  attachments: Object,
  dispatch: Function,
  selectFile: () => void,
  deleteAttachment: () => void,
  uploadFiles: () => void,
  fetchAttachmentsIfNeeded: () => void,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

class FileManagerContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAttachmentsIfNeeded());
  }
  props: Props;

  onUploadFinish = signResult => {
    const signUrl = signResult.signedUrl;
    const splitUrl = signUrl.split('?');
    const fileUrl = splitUrl[0];

    const payload = {
      fileName: signResult.fileName,
      originalName: signResult.originalName,
      fileType: signResult.fileType,
      s3Key: signResult.s3Key,
      url: fileUrl,
    };
    this.props.dispatch(uploadFiles(payload));
  };

  handleRemoveMedia = mediaId => {
    this.props.dispatch(deleteAttachment(mediaId));
  };

  selectTheFile = file => {
    this.props.dispatch(selectFile(file));
  };

  render() {
    return (
      <FileManager
        onUploadFinish={this.onUploadFinish}
        handleRemoveMedia={this.handleRemoveMedia}
        attachments={this.props.attachments}
        selectFile={this.selectTheFile}
        ui={this.props.ui}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    attachments: state.admin.attachments,
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps)(FileManagerContainer);
