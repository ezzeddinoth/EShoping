import React, { useEffect, useRef, useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import './Photo.css';
import APICall from '../../APICall/APICall';

// PhotoWindow in TableFprm
export default function Photo(props) {

    useEffect(() => {

    }, []);

    const [preview, setPreview] = useState();
    const [oldPicture, setOldPicture] = useState(props.value);
    const [style, setStyle] = useState({ display: "none" });
    const [API, setAPI] = useState();

    const fileInputRef = useRef();

    const filseSelectedHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            let type = file.type.replace("image/", "");
            setPreview(reader.result);
            props.onChange(props.id, reader.result.replace("data:image/" + type + ";base64,", ""));
        }
        reader.readAsDataURL(file);
    }

    const selectPhoto = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    }

    const removePhoto = (e) => {
        setOldPicture();
        setPreview();
    }

    const photoAvailable = (preview || oldPicture);

    const getPhoto = () => {
        const getPhotoSource = () => {
            return preview ? preview : "data:image/jpeg;base64," + props.value
        }
        return <div className="photoContainer">
            {photoAvailable ? <img className="productPhoto" alt="part"
                src={getPhotoSource()} ></img>
                : <FaPlus style={style} className="plus" onClick={selectPhoto}>
                </FaPlus>}
        </div>
    }

    return (
        <div className="photo" onMouseOver={() => setStyle({ display: "block" })} onMouseOut={() => setStyle({ display: "none" })}>
            <div className="photoHeader">
                <div className="pictureType"><div className="pictureText">{"photo"}</div></div>
                <div className="cornerIcon">
                    {photoAvailable && <RiCloseLine style={style} className="x" onClick={removePhoto}></RiCloseLine>}
                </div>
            </div>
            {getPhoto()}
            <input type="file" onChange={filseSelectedHandler} style={{ display: "none" }} ref={fileInputRef}
                accept="image/jpeg, image/jpg, image/png," />
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
        </div>
    );
}