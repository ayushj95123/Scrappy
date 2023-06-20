import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const Preview = ({ delta }) => {
  const [modifiedHtml, setModifiedHtml] = useState('');
  console.log("MOdified html", modifiedHtml)
  useEffect(() => {
    const convertDeltaToHtml = async () => {
      // Convert delta to HTML
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      const html = converter.convert();

      // Make an HTTP request to the server endpoint
      try {
        const response = await axios.post('http://localhost:8000/parse-html', {
          html: html,
        });
        setModifiedHtml(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    convertDeltaToHtml();
  }, [delta]);

  return (
    <div>
      <h2>Preview:</h2>
      <div dangerouslySetInnerHTML={{ __html: modifiedHtml }}></div>
    </div>
  );
};

export default Preview;


