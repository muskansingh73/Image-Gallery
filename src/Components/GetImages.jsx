import React, { useRef } from "react";
import { useState, useEffect } from "react"
import Image from "./Image";
import StartSearch, { LoadImage } from "./Api";
import axios from "axios";
import UnsplashSearch from "./UnsplashSearch";
import clsx from "clsx";
import LazyLoad from "./LazyLoad";

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;

function GetImages() {
    <LoadImage />
    const [images, setImages] = useState([])
    const [searchq, setsearch] = useState()
    const [page, setpage] = useState(1);
    

    //LAZY LOAD
    const triggerRef = useRef(null)
    const onGrabData = (currentPage) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = images.slice(
                    ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
                    NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
                );
                console.log(data);
                resolve(data);
            }, 3000);
        });
    };

    const { data, loading } = LazyLoad({ triggerRef, onGrabData })

    // FETCH IMAGES

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/photos?client_id=AhT6CJtGo5BBj2UwV49XVmval2A3V51hroClZodwI4s&_limit=9&_page=${page}`)
            const data = await response.json()
            setImages(data)
            console.log(data)
            setImages((prev) => [...prev, ...data])
        }

        fetchImages()
    });

    //SEARCHING IMAGES
      const[query,setQuery] = useState([])
      const[results,setResults] = useState()
     

    const searchImages = async () => {
        const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=AhT6CJtGo5BBj2UwV49XVmval2A3V51hroClZodwI4s`
        );
        setResults(response.data.results);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchImages();
    }

    const getsearch = () => {
        setsearch(query)
    }
    const searchdata = StartSearch(query);
    console.log(StartSearch(searchq))

    //INFINITE SCROLLING FUNCTION


    const handleScrolling = async () => {
        console.log("scrollHeight" + document.documentElement.scrollHeight)
        console.log("innerHeight" + window.innerHeight)
        console.log("scrollTop" + document.documentElement.scrollTop)
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setpage((prev => prev + 1))

            }

        } catch (error) {
            console.log(error)
        }

    }


    //INFINITE SCROLLING
    useEffect(() => {
        window.addEventListener("scroll", handleScrolling)
        return () => window.removeEventListener("scroll", handleScrolling)
    }, [])

    return (

        <div>
            <h1>
                {!images ?
                    <h2 className="h2name">Loading ....</h2> :
                    <section>
                        <div className="search">
                            <header>
                                <form onSubmit={handleSubmit} >
                                    <label>GALLERY OF IMAGES</label>
                                    <button type="submit" className="buttonsearch">Search</button>
            
                                    <input type="text" value={query} onChange={handleInputChange} className="inputsearch" />

                                </form>

                            </header>

                        </div>

                        <div className="divmain">

                            {results ? results.map(image => (
                                <UnsplashSearch key={image.id} {...image} />))
                                : null}
                            {data.map(image => (
                                <Image key={image.id} {...image} />))}

                        </div>
                        <div ref={triggerRef} className={clsx('trigger', { visible: loading })}>

                        </div>
                    </section>
                }
            </h1>
        </div>
    )

}

export default GetImages;