import React from 'react';


function UnsplashSearch(props) {
  return (

    <div>
         <article className="article">
            
            
            <img src={props.urls.full} alt={props.user.name} className="art" />
            <div>
                <b className="name"> NAME : {props.user.name}</b><br />
                <b className="bold">LOCATION : {props.user.location}</b>
                
            </div>

            <div>
                <img src={props.user.profile_image.large} alt={props.user.name} className="user" />
            </div>
            <span>
                <ul>
                    <li><u>USERNAME:</u> <a href={`https://instagram.com/${props.user.instagram_username}`}>{props.user.instagram_username}</a></li> <br />
                    <li><u>BIO: </u><p align="align-left">{props.user.bio}</p></li>
                </ul>
            </span>

        </article>
      </div>
    
  );
}

export default UnsplashSearch;


