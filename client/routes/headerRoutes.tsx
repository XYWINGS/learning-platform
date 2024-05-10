import React from 'react';
import AdminHeader from '../pages/_layout/_headers/AdminHeader';
import StudenHeader from '../pages/_layout/_headers/studentHeader';
import InstructorHeader from '../pages/_layout/_headers/InstructorHeader';



const headers = [


	{
		path: `/admin/*`,
		element: <AdminHeader />,
	},
	{
		path: `/student/*`,
		element: <StudenHeader />,
	},
	{
		path: `/instructor/*`,
		element: <InstructorHeader />,
	},

];

export default headers;
