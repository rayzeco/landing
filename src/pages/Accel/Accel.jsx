import "./accel-page.scss";

import React, { useEffect } from "react";

export default function AccelPage() {

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [])

  return (
    <div className="accel-page">

      <section className="with-rayze-section">
        <div className="container">
        <pre className="title">Accelerators</pre>
          <div className="top">
          <h1><span style={{ color: '#00FFB3' }}>Fast Track your engineering.</span></h1>
          We have a pre-built repository of developer productivity tools, cloud engineering accelerators & integration templates which fast tracks your IT deliveries.
              <h1></h1><h2><span style={{ color: '#00FFB3' }}>Our Accelerators:</span></h2>


          </div>
          <div className="bottom">
            <div>
              <h4>Fast Data Pipelines</h4>
              <p>To bootstrap a new data project, we have template based data pipelines with orchestration. This saves 3 months of time in starting a new data project.</p>

            </div>
            <div>
              <h4>Technology Modernization</h4>
              <p>To bootstrap a technology modernization project, we have Iaas (infrastructure as code) templates that rapidly stand up boiler plate code for container services.</p>

            </div>
            <div>
              <h4>Integration adaptors</h4>
              <p>Pre-Built integration adaptors allow us to rapidly integrate with the common ERP, HR and Banking systems saving time & cost</p>

            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
