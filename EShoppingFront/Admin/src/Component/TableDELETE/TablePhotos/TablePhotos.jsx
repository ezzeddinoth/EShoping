import React from 'react';
import Photo from '../Photo/Photo';
import './TablePhotos.css';


// PobUp to edit Table Row or add new one
export default function TablePhotos(props) {

    const adjustPhotos = (photoType, photoID, isDefault) => {
        props.changeValue(photoType, photoID, isDefault)
    }

    return (
        <div className="picturesContainer">
            <label className="labelPictures">Fotos</label>
            <div className="photoGrid" >
                {props.Pictures.map((Picture, index) => {
                    return <Photo editedPhoto={props.editedPhoto} nullGUID={props.nullGUID} key={index} adjustPhotos={adjustPhotos}
                        Picture={Picture}></Photo>
                })}
            </div>
        </div>
    );
}


