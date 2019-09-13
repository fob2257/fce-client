import React, { useContext, useState, useEffect } from 'react';

import Context from '../Context';

import { docs, workBookStreamReader } from './common/WorkBookStreamReader';
import InputGroup from './common/InputGroup';

const FormDocs = () => {
  const { state, dispatch } = useContext(Context);

  const [fceFile, setFceFile] = useState(null);
  const [vimFile, setVimFile] = useState(null);
  const [paidFile, setPaidFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { target: { name, files: [file] } } = e;
      setFceFile(file);
      console.log({ [name]: file });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className='form-docs'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col'>
            <label for='fce'>
              Electronic Credit Invoice (FCE) File
            </label>
            <InputGroup
              type='file'
              name='fce'
              icon='far fa-file'
              onChange={handleSubmitFile}
              required={true}
            />
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col'>
            <label for='invoice'>
              Invoice Capturing File
            </label>
            <InputGroup
              type='file'
              name='invoice'
              icon='far fa-file'
              onChange={handleSubmitFile}
            // disabled={}
            />
          </div>
          <div className='col'>
            <label for='vim'>
              VIM File
            </label>
            <InputGroup
              type='file'
              name='vim'
              icon='far fa-file'
              onChange={handleSubmitFile}
            />
          </div>
          <div className='col'>
            <label for='paid'>
              Paid (Pagadas)
            </label>
            <InputGroup
              type='file'
              name='paid'
              icon='far fa-file'
              onChange={handleSubmitFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDocs;
