import React from "react";
import { TbError404 } from "react-icons/tb";
function PageNotFound() {
    return (
        <div
            style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
            }}
        >
            <div>
                <h1 style={{ color: "white",textAlign:'center',marginTop:'30px' }}>
                    <TbError404 />
                </h1>
                <h1 style={{ color: "white" }}> Page Not Found</h1>
            </div>
        </div>
    );
}

export default PageNotFound;
