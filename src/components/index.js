import './url.css';
import React, { useState } from 'react';
import copy from "copy-to-clipboard";

function URL() {

    const [text, setText] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [click, setClick] = useState(false);


    const handleText = (e) => {
        setText(e.target.value)
    }

    const submitUrl = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sk_ghOUKJBkaDe0wj2O' // Replace with your API key
            },
            body: JSON.stringify({
                originalURL: text,
                domain: 'cww4.short.gy'
            })
        };

        fetch('https://api.short.io/links', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data);
                if (data.shortURL) {
                    setShortUrl(data.shortURL);
                } else {
                    console.error("No shortURL in response:", data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
        setClick(true);
        setText('');
    }

    const handleCopy = () => {
        copy(shortUrl)
        alert('Your Shorterned link has been copied')
        setShortUrl('')
        setClick(false)
    }


    return (
        <>
            <div className='main-container'>
                <div className='input-container'>
                    <label>URL LINK HERE</label>
                    <textarea
                        placeholder='add url here'
                        value={text}
                        onChange={handleText}
                    ></textarea>
                    <p>{text}</p>
                </div>
                <button
                    onClick={submitUrl}
                >
                    Shorten URL
                </button>

                {click&&<div className='result-container'>
                    <h1>Your short url is here: </h1>
                    <span>{shortUrl}</span>
                    <button
                        onClick={handleCopy}
                    >
                        copy short url
                    </button>
                </div>}

            </div>
        </>
    );
}

export default URL;