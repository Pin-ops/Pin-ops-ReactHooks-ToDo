import React from 'react';
import { Popover } from 'react-bootstrap';


export const popoverBox = ( content ) => (
    <Popover className="m-2 p-2 bg-warning" id="popover-basic">
        <Popover.Content>
            { content }
        </Popover.Content>
    </Popover>
);
