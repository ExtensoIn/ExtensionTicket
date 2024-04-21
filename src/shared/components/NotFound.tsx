import ImageLinear from './ImageLinear';

const NotFound = () => {
    return (
        <ImageLinear height='100vh'>
            <div className='flex flex-col h-full justify-center items-center'>
                <h1 className='text-white text-4xl font-AbrilFatface font-light'>
                    No encontramos la página que buscas :(

                </h1>
            </div>
        </ImageLinear>
    )
}

export default NotFound;