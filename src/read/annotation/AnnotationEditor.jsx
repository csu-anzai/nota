import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

class AnnotationEditor extends Component {
  state = {}
  quillRef = React.createRef()

  modules = {
    toolbar: [
      // [{ 'header': 1 }, { 'header': 2 }],
      ['bold', 'italic', 'blockquote'],
      // [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
    ],
  }

  formats = [
    // 'header',
    'bold', 'italic', 'blockquote',
    // 'list', 'bullet', 'indent',
    'link',
  ]

  setQuillRef = (ref) => {
    if (!ref) return;
    
    ref.focus();

    this.quillRef = ref;
  }

  render() {
    const { text, handleChange } = this.props;

    return (
      <AnnotationQuillContainer>
        <ReactQuill
          ref={this.setQuillRef}
          value={text}
          onChange={handleChange}
          modules={this.modules}
          formats={this.formats}
        />
      </AnnotationQuillContainer>
    )
  }
}

const AnnotationQuillContainer = styled.div`
  flex: 1;

  .quill {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-flow: column-reverse;

    .ql-toolbar.ql-snow {
      border: none;
      border-top: 1px solid ${theme.borderColor};
      padding: 0 12px;

      button {
        height: 44px;
        padding: 10px 10px;
        width: 44px;
      }
    }

    .ql-container {
      border: none;

      .ql-editor {
        font-size: 1.2em;
      }
    }
  }
`;

export default AnnotationEditor;
