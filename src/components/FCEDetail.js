import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { format as dateFormat } from 'date-fns';

import Context from '../Context';
import constants from '../Constants';

import Spinner from './Spinner';

const FCEDetail = ({ match, history }) => {
  const { state, dispatch } = useContext(Context);
  const { currentFce } = state;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { params: { id } } = match;
    const fceFound = state.fces.find(fce => fce.id === id);

    if (!fceFound) {
      return history.push('/details');
    }

    dispatch({ type: constants.SET_CURRENT_FCE, payload: fceFound });
    setLoading(false);

    return () => {
      dispatch({ type: constants.SET_CURRENT_FCE, payload: null });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateToString = (d, format = 'd MMM YYYY') => dateFormat(new Date(d), format, { useAdditionalWeekYearTokens: true })

  /**
   * id
   * fceFileName
   * invoiceFileName
   * vimFileName
   * paidFileName
   * createdAt
   *
   * busqueda-nc
   * codctacte
   * comentarios-conduent
   * cuitemisor
   * descripcion
   * fecha-cancelacion
   * fecha-limite-accion
   * fechaemision
   * fechapuestadispo
   * fechavenpago
   * importetotal
   * nombre
   * nrocmp
   * ptovta
   * responsable
   * saldo
   * status
   * vendor
   *
   * invoices[].document-id-number
   * invoices[].vendor-name
   * invoices[].invoice-number || invoices[].customReference
   * invoices[].invoice-date
   * invoices[].invoice-total
   * invoices[].invoice-currency
   * invoices[].invoice-cuit
   *
   * vims[].document-id
   * vims[].mm-invoice-document-no
   * vims[].reference || vims[].customReference
   * vims[].vim-process-status-text
   * vims[].accounting-document-no
   * vims[].vendor-name
   * vims[].vendor
   *
   * paids[].account
   * paids[].document-number
   * paids[].document-date
   * paids[].reference || paids[].customReference
   * paids[].clearing-document
   * paids[].clearing-date
   */

  return (
    <div className='fce-detail'>
      {
        (loading) ? <Spinner />
          : (
            <React.Fragment>
              <div className='jumbotron mb-2'>
                <div className='container'>
                  <h2 className='display-4'>
                    {currentFce['nombre']}
                  </h2>
                  <p className='lead text-muted'>
                    Vendor: {currentFce['vendor']}
                    <br />
                    CUIT: {currentFce['cuitemisor']}
                    <br />
                    Ptovta: {currentFce['ptovta']}
                    <br />
                    Nrocmp: {currentFce['nrocmp']}
                  </p>
                  <hr className='my-4'></hr>
                  <button type='button' className='btn btn-primary btn-lg' data-toggle='collapse' data-target='#collapseMoreInfo' aria-expanded='false' aria-controls='collapseMoreInfo'>
                    Show more info
                  </button>
                </div>
              </div>
              {/* FCE info */}
              <p className='mt-2'>
                <b>FCE File:</b> {currentFce.fceFileName}
              </p>
              <div className='collapse' id='collapseMoreInfo'>
                <div className='card card-body'>
                  <div className='row'>
                    <div className='col'>
                      <p>
                        <b>Description:</b> {currentFce['descripcion']}
                      </p>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <ul className='list-unstyled'>
                        <li><b>Codctacte:</b> {currentFce['codctacte']}</li>
                        <li><b>Busqueda NC:</b> {currentFce['busqueda-nc']}</li>
                      </ul>
                    </div>
                    <div className='col'>
                      <ul className='list-unstyled'>
                        <li><b>Status:</b> {currentFce['status']}</li>
                        <li><b>Responsable:</b> {currentFce['responsable']}</li>
                      </ul>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <ul className='list-unstyled'>
                        <li><b>Available date:</b> {currentFce['fechapuestadispo'] && dateToString(currentFce['fechapuestadispo'])}</li>
                        <li><b>Emission date:</b> {currentFce['fechaemision'] && dateToString(currentFce['fechaemision'])}</li>
                        <li><b>Limit action date:</b> {currentFce['fecha-limite-accion'] && dateToString(currentFce['fecha-limite-accion'])}</li>
                        <li><b>Paid date:</b> {currentFce['fechavenpago'] && dateToString(currentFce['fechavenpago'])}</li>
                        <li><b>Cancellation date:</b> {currentFce['fecha-cancelacion'] && dateToString(currentFce['fecha-cancelacion'])}</li>
                      </ul>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <p>
                        <b>Comments:</b> {currentFce['comentarios-conduent']}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Invoice info */}
              <div className='row mt-2'>
                <div className='col'>
                  <p data-toggle='collapse' data-target='#collapseInvoice' aria-expanded='false' aria-controls='collapseInvoice'>
                    <b>Invoice Capturing File:</b> {currentFce.invoiceFileName}
                    {' '}
                    <span className='badge badge-primary'>{currentFce.invoices.length} matches</span>
                  </p>
                </div>
              </div>
              <div className='collapse' id='collapseInvoice'>
                <div className='row'>
                  <div className='overflow-auto' style={{
                    maxHeight: '350px',
                    overflow: 'scroll',
                  }}>
                    <ul className='list-group'>
                      {
                        currentFce.invoices.map(obj => (
                          <li className='list-group-item'>
                            <div className='d-flex w-100 justify-content-between'>
                              <h5 className='mb-1'>
                                Document Id: {obj['document-id-number']}
                              </h5>
                              <small>
                                {obj['invoice-date'] && dateToString(obj['invoice-date'])}
                              </small>
                            </div>
                            <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small>Donec id elit non mi porta.</small>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              {/* VIM info */}
              <div className='row mt-2'>
                <div className='col'>
                  <p data-toggle='collapse' data-target='#collapseVim' aria-expanded='false' aria-controls='collapseVim'>
                    <b>VIM File:</b> {currentFce.vimFileName}
                    {' '}
                    <span className='badge badge-primary'>{currentFce.vims.length} matches</span>
                  </p>
                </div>
              </div>
              <div className='collapse' id='collapseVim'>
                <div className='row'>
                  <div className='overflow-auto' style={{
                    maxHeight: '350px',
                    overflow: 'scroll',
                  }}>
                    <ul className='list-group'>
                      {
                        currentFce.vims.map(obj => (
                          <li className='list-group-item'>
                            <div className='d-flex w-100 justify-content-between'>
                              <h5 className='mb-1'>
                                Document Id: {obj['document-id']}
                              </h5>
                            </div>
                            <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small>Donec id elit non mi porta.</small>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              {/* Paid info */}
              <div className='row mt-2'>
                <div className='col'>
                  <p data-toggle='collapse' data-target='#collapsePaid' aria-expanded='false' aria-controls='collapsePaid'>
                    <b>Paid (Pagada) File:</b> {currentFce.paidFileName}
                    {' '}
                    <span className='badge badge-primary'>{currentFce.paids.length} matches</span>
                  </p>
                </div>
              </div>
              <div className='collapse' id='collapsePaid'>
                <div className='row'>
                  <div className='overflow-auto' style={{
                    maxHeight: '350px',
                    overflow: 'scroll',
                  }}>
                    <ul className='list-group'>
                      {
                        currentFce.paids.map(obj => (
                          <li className='list-group-item'>
                            <div className='d-flex w-100 justify-content-between'>
                              <h5 className='mb-1'>
                                Document Id: {obj['document-number']}
                              </h5>
                            </div>
                            <p className='mb-1'>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small>Donec id elit non mi porta.</small>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <footer className='mt-2'>
                Submitted At: {dateToString(currentFce.createdAt, 'd MMM YYYY, HH:mm:ss')}
              </footer>
            </React.Fragment>
          )
      }
    </div >
  );
};

export default withRouter(FCEDetail);
