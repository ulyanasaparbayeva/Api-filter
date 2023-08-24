import React, { useState } from 'react';

const Lesson = () => {
  const [modalShow, setModalShow] = useState(false);



  return (
    <div className="bg">
      <div className="btn-group ">
        <button onClick={() => setModalShow(true)} className="btn">Wiew POP-UP</button>
        {modalShow && (
          <div className="modal-background">
            <div className="modal-content">
              <i onClick={() => setModalShow(false)} className='bx bx-x'></i>
              <h2>Are you sure want to delete this element?</h2>
              <div className="btn-group">
                <button className="btn-yes">
                  Yes
                </button>
                <button className="btn-no">
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Lesson