import React, { useContext, useState } from 'react';

import Context from '../Context';
import constants from '../Constants';

import workBookReader, { docs } from './common/WorkBookReader';
import filterFCEArrays from './common/FilterFCEArrays';
import InputGroup from './common/InputGroup';
import Spinner from './Spinner';

const FormDocs = () => {
  const { state, dispatch } = useContext(Context);

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

  const clearForm = (fns = []) => {
    const formElement = document.getElementById('submitFormId');
    formElement.reset();

    fns.map(fn => clearInput(fn)());
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

      const res = filterFCEArrays(fceData, invoiceData, vimData, paidData);

      dispatch({ type: constants.ADD_FCE, payload: res });

      clearForm([
        setFceFile,
        setInvoiceFile,
        setVimFile,
        setPaidFile,
      ]);
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
                    <label for='fce'>
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
                    <label for='invoice'>
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
                    <label for='vim'>
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
                    <label for='paid'>
                      Paid (Pagadas) File
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
                <div className='mx-5'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg btn-block'
                    disabled={fceFile === null}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )
      }
    </div>
  );
};

export default FormDocs;