"use client";
import Image, {ImageProps} from "next/image";
import {useState} from "react";
export function ProductImage(props:ImageProps){const [failed,setFailed]=useState(false);return failed?<span className="image-unavailable">Product image unavailable</span>:<Image {...props} alt={props.alt} onError={()=>setFailed(true)}/>}
