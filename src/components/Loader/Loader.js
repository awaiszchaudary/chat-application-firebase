import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Loader = () => {
    return (
        <div className='container-fluid' style={{ backgroundColor: 'white', height: '980px' }}>
            <div className='row'>
                <div className='offset-md-6 col-md-6' style={{marginTop: '450px'}}>
                    <MDBSpinner grow style={{width: '4rem', height: '4rem'}}>
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                </div>
            </div>
        </div>
    );
}

export default Loader;