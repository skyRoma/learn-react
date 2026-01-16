'use client'

import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    const [image, setImage] = useState();
    const imageInputRef = useRef();

    function handleClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setImage(null)
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!image && <p>No image picked yet.</p>}
                    {image && (
                        <Image
                            src={image}
                            alt="The image selected by the user"
                            fill
                        />
                    )}
                </div>
                <input
                    type="file"
                    id={name}
                    className={classes.input}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    required
                />

                <button className={classes.button} type="button" onClick={handleClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}
