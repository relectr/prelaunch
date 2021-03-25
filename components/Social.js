import Image from 'next/image'

// The social media button components
function Social({ src, alt, link }) {
    return (
        <a href={ link } target='_blank' rel='noreferrer'>
            <div className='w-12 h-12 inline-block mx-2 bg-relectr-grey pt-3 rounded-full' >
               <Image src={ src } alt={ alt } width='24' height='24' /> 
            </div>
        </a>
    )
}

export default Social
