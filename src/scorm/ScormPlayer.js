import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { parse } from 'fast-xml-parser';

const ScormPlayer = ({ scormUrl }) => {
    const [entryPoint, setEntryPoint] = useState('');
    const [scormAPI, setScormAPI] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const iframeRef = useRef(null);

    useEffect(() => {
        const fetchMainfestAndLoad = async () => {
            try {
                // Fetch the manifest file
                //const response = await axios.get(`${scormUrl}`);//imsmanifest.xml
                //const manifestXml = response.data;

                // Parse the manifest file
                //const manifestJson = parse(manifestXml);

                //const entryPoint = manifestJson.manifest.resources[0].resource[0].$.href;

                // if (iframeRef.current) {
                //     iframeRef.current.src = `${scormUrl}`;///${entryPoint}`
                // }
                setEntryPoint(`${scormUrl}`);
            } catch (error) {
                console.error('Error fetching manifest file:', error);
            }
        };

        fetchMainfestAndLoad();

        // window.API = new ScormAPI();
        // window.API_Initialize();

        // window.addEventListener('upload', () => {
        //     window.API_Terminate();
        // });

        return () => {
            // window.API_Terminate();
        }
    }, [scormUrl]);

    useEffect(() => {

        if(!iframeLoaded) return;
        const iframe = iframeRef.current;

        //if(!iframe) return;

        const onLoadHandler = () => {

        // }
        // iframe.onload = () => {
            const iframeWindow = iframe.contentWindow;
            const iframeDocument = iframe.contentDocument || iframe.contentDocument.document;

            const scormAPI=iframeWindow.API || iframeWindow.parent.API || iframeDocument.API;

            if(scormAPI){
                setScormAPI(scormAPI);
                console.log('SCORM API intialized:', scormAPI);

                const learnerName = scormAPI.LMSGetValue('cmi.core.student_name');
                console.log('Learner Name:', learnerName);
            } else{
                console.error('SCORM API not found');
            }
        };
        iframe.addEventListener('load', onLoadHandler);

        // Cleanup on component unamount
        return () => {
            iframe.removeEventListener('load', onLoadHandler);
        };
        
    }, [iframeLoaded]);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    }

    // const setScormValue = (key, value) => {
    //     if(scormAPI){
    //         scormAPI.LMSSetValue(key, value);
    //     }
    // };

    const getStatus = () => {
        if (window.API) {
            const status = window.API_Get('cmi.core.lesson_status');
            console.log('SCORM status:', status);
        }
    };

    return (
        <div>
            <iframe ref={iframeRef} src={entryPoint} title="SCORM PLAYER" width="100%" height="600" allowFullScreen onLoad={handleIframeLoad}></iframe>
        </div>
    );
};

export default ScormPlayer;
