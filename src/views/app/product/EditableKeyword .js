import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const EditableKeyword = React.memo(({ initialValue, onSave, onCancel }) => {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <Button color="primary" size="sm" onClick={() => onSave(value)}>
                Cập nhật
            </Button>
            <Button color="secondary" size="sm" onClick={onCancel} style={{ marginLeft: "5px" }}>
                Hủy
            </Button>
        </div>
    );
});

export default EditableKeyword;
