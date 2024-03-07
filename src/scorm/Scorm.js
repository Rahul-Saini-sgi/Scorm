// import {SCORM} from 'pipwerks-scorm-api-wrapper';
import React, {useState} from 'react';
import axios from 'axios';
import ScormPlayer from './ScormPlayer';

const Scorm = () => {
  const scormUrl = 'https://testbucket-test123.s3.ap-south-1.amazonaws.com/2023julykognicspresentation-1-scorm2004+(1)/index.html';
  // const [scormUrl, setScormUrl] = useState('');

  //   const fetchScormPackage = async () => {
  //       try {
  //           const response = await axios.get('http://localhost:3002/scorm-package');
  //           const scormPackageUrl = URL.createObjectURL(response.data);
  //           setScormUrl(scormPackageUrl);
  //       } catch (error) {
  //           console.error('Error fetching SCORM package:', error);
  //       }
  //     }

return(
  <div>
    <h2>Main Component</h2>
    {/* <button onClick={fetchScormPackage}>Fetch SCORM Package</button>
    {scormUrl && <ScormPlayer scormUrl={scormUrl} />} */}
    <ScormPlayer scormUrl={scormUrl} />
  </div>
);
};

export default Scorm;
