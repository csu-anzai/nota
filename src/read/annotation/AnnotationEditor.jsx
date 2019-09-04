import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AnnotationEditor extends Component {
  state = {}

  render() {
    const { text, handleChange } = this.props;

    return (
      <ReactQuill
        value={text}
        onChange={handleChange}
      />
    )
  }
}

export default AnnotationEditor;
