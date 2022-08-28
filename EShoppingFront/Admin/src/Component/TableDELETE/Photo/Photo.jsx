import React, { useEffect, useRef, useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import PartNumberService from "../../../Service/PartNumberService";
import { FaPlus } from "react-icons/fa";
import './Photo.css';
import APICall from '../../APICall/APICall';

// PhotoWindow in TableFprm
export default function Photo(props) {

    useEffect(() => {
        const fetchPhoto = async (picture) => {
            if (picture.PictureId !== props.nullGUID) {
                setAPI({
                    res: await PartNumberService.getPicture(picture.PictureId),
                    onSucceed: (res) => {

                        setOldPicture(res.data.Stream)
                    }
                });
            }
        }
        fetchPhoto(props.Picture)
    }, [props.Picture, props.nullGUID]);

    const [preview, setPreview] = useState();
    const [oldPicture, setOldPicture] = useState(props.Picture.stream);
    const [style, setStyle] = useState({ display: "none" });
    const [API, setAPI] = useState();

    const fileInputRef = useRef();

    const filseSelectedHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            let type = file.type.replace("image/", "");
            let value = {
                "FileStream": reader.result.replace("data:image/" + type + ";base64,", ""),
                "FileName": props.Picture.PictureType + "." + type,
                "FilePath": ""
            }
            setAPI({
                res: await PartNumberService.savePicture(value),
                onSucceed: (res) => {
                    setPreview(reader.result);
                    console.log("PictureId after Upload " + res.data.PictureID)
                    props.adjustPhotos(props.Picture.PictureType, res.data.PictureID, false);
                }
            });
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
        props.adjustPhotos(props.Picture.PictureType, props.nullGUID, true);
    }

    const photoAvailable = (preview || oldPicture);

    const getPhoto = () => {
        const getPhotoSource = () => {
            return preview ? preview : "data:image/jpeg;base64," + oldPicture
        }
        return <div className="photoContainer">
            {photoAvailable ? <img className="" alt="part"
                src={getPhotoSource()} ></img>
                : <FaPlus style={style} className="plus" onClick={selectPhoto}>
                </FaPlus>}
        </div>
    }

    return (
        <div className="photo" onMouseOver={() => setStyle({ display: "block" })} onMouseOut={() => setStyle({ display: "none" })}>
            <div className="photoHeader">
                <div className="pictureType"><div className="pictureText">{props.Picture.PictureType}</div></div>
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