
// The social media button components
function Social({ src, alt, link }) {
    return (
        <a href={ link } target='_blank' rel='noreferrer'>
            <div className='w-12 h-12 inline-block mx-2 bg-relectr-grey pt-3 rounded-full' >
               <img src={ src } alt={ alt } className='mx-auto' />
            </div>
        </a>
    )
}

export default Social
