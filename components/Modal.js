import Button from "./Button";

function Modal({ modalVisibility, onClick, title, text, buttonText, buttonColor }) {
    return (
        <div className={`${ modalVisibility } fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40`}>
          <div className='bg-white mx-auto my-32 w-1/3 rounded'>
              <div className='px-6 pt-7'>
                  <h3 className='text-xl font-bold mb-6 text-relectr-normal-text'>{ title }</h3> 
                  <p className='text-base font-normal text-relectr-normal-text'>{ text }</p>
              </div>
              <div className='mt-8 bg-relectr-grey rounded-b text-right'>
                <Button type='button' text={ buttonText } color={`${ buttonColor } my-2 mr-4`} onClick={ onClick } />
              </div>
          </div> 
        </div>
    )
}

export default Modal
