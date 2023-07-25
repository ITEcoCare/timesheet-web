import UserHome from "./User/UserHome";
import { Button, Layout, Menu, theme, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import FCalendar from "./FullCalendar/FCalendar";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const { Header, Sider, Content } = Layout;

const Tempo2 = () => {
 
    return (
        <>
        <div>tempo2</div>
            <FCalendar></FCalendar>
        </>
    );
};
export default Tempo2;
