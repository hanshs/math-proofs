import React from "react";

export default function Layout(props: React.PropsWithChildren<{}>) {
    return <>
        {/* <div className="container mx-auto flex items-end">
            <button className="rounded-lg shadow px-3 py-1 ml-auto">Login</button>
        </div> */}
        <div className="container mx-auto py-6">{props.children}</div>
    </>
}