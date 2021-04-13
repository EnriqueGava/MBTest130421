import React, { Fragment, useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

const DigitalSignature = () => {
	const signatureRef = useRef({});
	const [imageData, setImageData] = useState("");
	const [error, setError] = useState(false);
	const saveSignature = (signature) => { setImageData(signature); }
	useEffect(() => {
		console.log(imageData)
		},[imageData]);
		
    return(
        <Fragment>
            <SignatureCanvas  backgroundColor = 'rgb(230,230,230)'
			ref={signatureRef}
			canvasProps={{width: 500, height: 250, style:{'border':'1px solid #000000'} }}
			onBegin={() => {setError(false)}}
			/>
			<div>
				<button onClick={() => {
					  signatureRef.current.clear();
					  saveSignature(null);
					}}> Borrar </button>
					
				<button onClick={() => {
					//saveSignature(signatureRef.current.toData())
					saveSignature(signatureRef.current.getTrimmedCanvas().toDataURL('image/jpg'))
				}}> Guardar </button>
				
				<pre>
					{
						error ? <div>La firma es obligatoria</div> : false
					}
				</pre>
			</div>
        </Fragment>
    )
}

export default DigitalSignature;