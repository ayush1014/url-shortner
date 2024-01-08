import './url.css';

function URL() {
    return (
        <>
            <div className='main-container'>
                <div className='input-container'>
                    <label>URL LINK HERE</label>
                    <textarea
                        placeholder='add url here'
                    ></textarea>
                </div>
                <button>
                    Shorten URL
                </button>

            </div>
        </>
    );
}

export default URL;