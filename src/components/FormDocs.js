import React, { useContext, useState } from 'react';

import Context from '../context';
import Actions from '../context/actions';

import workBookReader, { docs } from './common/WorkBookReader';
import filterFCEArrays from './common/FilterFCEArrays';
import InputGroup from './common/InputGroup';
import Spinner from './Spinner';

const FormDocs = () => {
  const { dispatch } = useContext(Context);
  const { addFce } = Actions(dispatch);

  const [fceFile, setFceFile] = useState(null);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [vimFile, setVimFile] = useState(null);
  const [paidFile, setPaidFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearInput = fn => (ref) => {
    // document.getElementById(inputId).value = null;
    if (ref && ref.currentTarget) {
      ref.currentTarget.value = null;
    } else if (ref && ref.current) {
      ref.current.value = null;
    }

    fn(null);
  };

  const clearForm = () => {
    const formElement = document.getElementById('submitFormId');
    formElement.reset();

    [
      setFceFile,
      setInvoiceFile,
      setVimFile,
      setPaidFile,
    ].map(fn => fn(null));
  }

  const promiseOrEmptyArray = data => (data) ? workBookReader(data.file, docs[data.name]) : [];

  const onSubmitForm = async () => {
    setLoading(true);

    try {
      const [
        fceData,
        invoiceData,
        vimData,
        paidData
      ] = await Promise.all([
        promiseOrEmptyArray(fceFile),
        promiseOrEmptyArray(invoiceFile),
        promiseOrEmptyArray(vimFile),
        promiseOrEmptyArray(paidFile),
      ]);

      const res = await filterFCEArrays({
        fceFileName: (fceFile) ? fceFile.file.name : '',
        invoiceFileName: (fceFile) ? invoiceFile.file.name : '',
        vimFileName: (fceFile) ? vimFile.file.name : '',
        paidFileName: (fceFile) ? paidFile.file.name : '',
        fceData,
        invoiceData,
        vimData,
        paidData,
      });

      addFce(res);
      setLoading(false);
      clearForm();
      setLoading(true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleSubmitFile = fn => (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { target: { name, files: [file] } } = e;

      const [extension] = file.name.split('.').map(str => str.toLowerCase()).reverse();

      if (!['xls', 'xlsx'].some(ext => ext === extension)) {
        clearInput(fn)(e);
        setErrors({ [name]: ['Can only upload an excel file'] });
      }

      fn({ name, file });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className='form-docs'>
      {
        (loading) ? <Spinner />
          : (
            <div className='container'>
              <form id='submitFormId' onSubmit={onSubmitForm}>
                <div className='form-row mb-4'>
                  <div className='col'>
                    <label htmlFor='fce'>
                      Electronic Credit Invoice (FCE) File
                    </label>
                    <InputGroup
                      type='file'
                      name='fce'
                      icon='far fa-file'
                      onChange={handleSubmitFile(setFceFile)}
                      showDelete={true}
                      onClickDelete={clearInput(setFceFile)}
                      required={true}
                      errors={errors}
                      disabled={fceFile !== null}
                    />
                  </div>
                </div>
                <hr />
                <div className='form-row mb-2'>
                  <div className='col'>
                    <label htmlFor='invoice'>
                      Invoice Capturing File
                    </label>
                    <InputGroup
                      type='file'
                      name='invoice'
                      icon='far fa-file'
                      onChange={handleSubmitFile(setInvoiceFile)}
                      showDelete={true}
                      onClickDelete={clearInput(setInvoiceFile)}
                      errors={errors}
                      disabled={invoiceFile !== null}
                    />
                  </div>
                </div>
                <div className='form-row mb-2'>
                  <div className='col'>
                    <label htmlFor='vim'>
                      VIM File
                    </label>
                    <InputGroup
                      type='file'
                      name='vim'
                      icon='far fa-file'
                      onChange={handleSubmitFile(setVimFile)}
                      showDelete={true}
                      onClickDelete={clearInput(setVimFile)}
                      errors={errors}
                      disabled={vimFile !== null}
                    />
                  </div>
                </div>
                <div className='form-row mb-2'>
                  <div className='col'>
                    <label htmlFor='paid'>
                      Paid (Pagada) File
                    </label>
                    <InputGroup
                      type='file'
                      name='paid'
                      icon='far fa-file'
                      onChange={handleSubmitFile(setPaidFile)}
                      showDelete={true}
                      onClickDelete={clearInput(setPaidFile)}
                      errors={errors}
                      disabled={paidFile !== null}
                    />
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='col mx-5'>
                    <button
                      type='submit'
                      className={`btn btn-lg btn-block ${(fceFile === null) ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={fceFile === null}
                    >
                      Submit
                    </button>
                  </div>
                  <div className='col mx-5'>
                    <button
                      type='button'
                      className='btn btn-danger btn-lg btn-block'
                      onClick={(e) => {
                        e.preventDefault();
                        clearForm();
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )
      }
    </div>
  );
};

export default FormDocs;
