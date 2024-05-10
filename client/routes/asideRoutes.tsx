import React from 'react';
import dynamic from 'next/dynamic';
import { demoPagesMenu, pageLayoutTypesPagesMenu } from '../menu';


const AdminAside = dynamic(() => import('../pages/_layout/_asides/AdminAside'));
const InstructorAside = dynamic(() => import('../pages/_layout/_asides/InstructorAside'));


const asides = [
	
	{ path: '/admin/*', element: <AdminAside/>, exact: true },
	{ path: '/instructor/*', element: <InstructorAside/>, exact: true },

];

export default asides;
