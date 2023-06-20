import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Preview from './Preview';

export default function Editor() {
  const [value, setValue] = useState('');
  const [delta, setDelta] = useState(null);
  const quillRef = React.useRef();

  const handleEditorChange = (content, delta, source, editor) => {
    setValue(content);
    setDelta(editor.getContents());
  };

  const handleSaveClick = () => {
    // Save the delta or perform any other actions
    console.log('Saved Delta:', delta);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        ref={quillRef}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          },
        }}
      />
      <button onClick={handleSaveClick}>Save</button>
      {delta && <Preview delta={delta} />}
    </div>
  );
}
