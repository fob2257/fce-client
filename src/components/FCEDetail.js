import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { format as dateFormat } from 'date-fns';

import './FCEDetail.style.css';

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
   * invoices[].cuit
   * invoices[].invoice-number || invoices[].customReference
   * invoices[].invoice-date
   * invoices[].invoice-total
   * invoices[].invoice-currency
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
                </div>
              </div>
              {/* FCE info */}
              <p className='mt-2 clickable' data-toggle='collapse' data-target='#collapseFce' aria-expanded='false' aria-controls='collapseFce'>
                <b>FCE File:</b> {currentFce.fceFileName}
                {' '}
                <span className='badge badge-primary'>Show more info</span>
              </p>
              <div className='collapse' id='collapseFce'>
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
              <p className={`mt-2 ${currentFce.invoices.length && 'clickable'}`} data-toggle='collapse' data-target='#collapseInvoice' aria-expanded='false' aria-controls='collapseInvoice'>
                <b>Invoice Capturing File:</b> {currentFce.invoiceFileName}
                {' '}
                <span className='badge badge-primary'>
                  {currentFce.invoices.length} matches
                </span>
              </p>
              {
                (currentFce.invoices.length) ? (
                  <div className='collapse' id='collapseInvoice'>
                    <div className='card card-body'>
                      <div className='overflow-auto'>
                        <ul className='list-group'>
                          {
                            currentFce.invoices.map(obj => (
                              <li className='list-group-item'>
                                <div className='row'>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>Document Id:</b> {obj['document-id-number']}</li>
                                      <li><b>Vendor Name:</b> {obj['vendor-name']}</li>
                                      <li><b>CUIT:</b> {obj['cuit']}</li>
                                      <li><b>Invoice Number:</b> {obj['invoice-number']}</li>
                                    </ul>
                                  </div>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>Invoice Date:</b> {obj['invoice-date'] && dateToString(obj['invoice-date'])}</li>
                                      <li><b>Invoice Total:</b> {obj['invoice-total']}</li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null
              }
              {/* VIM info */}
              <p className={`mt-2 ${currentFce.vims.length && 'clickable'}`} data-toggle='collapse' data-target='#collapseVim' aria-expanded='false' aria-controls='collapseVim'>
                <b>VIM File:</b> {currentFce.vimFileName}
                {' '}
                <span className='badge badge-primary'>
                  {currentFce.vims.length} matches
                </span>
              </p>
              {
                (currentFce.vims.length) ? (
                  <div className='collapse' id='collapseVim'>
                    <div className='card card-body'>
                      <div className='overflow-auto'>
                        <ul className='list-group'>
                          {
                            currentFce.vims.map(obj => (
                              <li className='list-group-item'>
                                <div className='row'>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>Document Id:</b> {obj['document-id']}</li>
                                      <li><b>Vendor Name:</b> {obj['vendor-name']}</li>
                                      <li><b>Vendor:</b> {obj['vendor']}</li>
                                      <li><b>Reference:</b> {obj['reference']}</li>
                                    </ul>
                                  </div>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>VIM Process Status:</b> {obj['vim-process-status-text']}</li>
                                      <li><b>Accounting Doc No:</b> {obj['accounting-document-no']}</li>
                                      <li><b>MM Invoice Doc No:</b> {obj['mm-invoice-document-no']}</li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null
              }
              {/* Paid info */}
              <p className={`mt-2 ${currentFce.paids.length && 'clickable'}`} data-toggle='collapse' data-target='#collapsePaid' aria-expanded='false' aria-controls='collapsePaid'>
                <b>Paid (Pagada) File:</b> {currentFce.paidFileName}
                {' '}
                <span className='badge badge-primary'>{currentFce.paids.length} matches</span>
              </p>
              {
                (currentFce.paids.length) ? (
                  <div className='collapse' id='collapsePaid'>
                    <div className='card card-body'>
                      <div className='overflow-auto'>
                        <ul className='list-group'>
                          {
                            currentFce.paids.map(obj => (
                              <li className='list-group-item'>
                                <div className='row'>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>Document Id:</b> {obj['document-number']}</li>
                                      <li><b>Account:</b> {obj['account']}</li>
                                      <li><b>Reference:</b> {obj['reference']}</li>
                                    </ul>
                                  </div>
                                  <div className='col'>
                                    <ul className='list-unstyled'>
                                      <li><b>Document Date:</b> {obj['document-date'] && dateToString(obj['document-date'])}</li>
                                      <li><b>Clearing Document:</b> {obj['clearing-document']}</li>
                                      <li><b>Clearing Date:</b> {obj['clearing-date'] && dateToString(obj['clearing-date'])}</li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null
              }
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
