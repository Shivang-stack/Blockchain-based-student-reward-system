import React from 'react'
import {Link,withRouter} from "react-router-dom"
const Titlebar = () => (

    <div>
        <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
            <Link className="nav-link" to='/'>
                Categories of Events
            </Link>
        </li>

        </ul>
    </div>
)


export default withRouter(Titlebar);