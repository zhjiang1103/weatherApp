import React from 'react';
//import Card from 'react-bootstrap/Card';


const UserFavCard = (props) => {

console.log("props", props);

    return (
        
       
        <>
            <h2>{`User Name: ${props.userFav.name}`}</h2>
        
            <div><p>{`Favorite City: ${props.userFav.favcity}`}</p></div>
           
       
        </>
    )

}

export default UserFavCard