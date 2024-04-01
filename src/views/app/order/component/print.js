import React from "react";
const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal"
};
class PrintOrder extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div className="container">
                <table>
                    <thead style={thStyle}>
                    <th>column 1</th>
                    <th>column 2</th>
                    <th>column 3</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}
export default PrintOrder;