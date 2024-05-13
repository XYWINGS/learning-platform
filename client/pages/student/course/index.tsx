import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import ThemeContext from '../../../context/themeContext';
import useDarkMode from '../../../hooks/useDarkMode';
import { TABS, TTabs } from '../../../common/type/helper';
import Page from '../../../layout/Page/Page';

import router from 'next/router';
import axios from 'axios';
import Input from '../../../components/bootstrap/forms/Input';
import image from '../../../assets/How-to-create-an-online-course.jpg';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import { NULL } from 'sass';

const Index: NextPage = () => {
	interface Course {
		_id: string;
		courseName: string;
		discription: string;
		part: string;
		enrollKey: string;
		document: any;
		status: any;
		price: number;
	}
	const [course, setCourse] = useState<Course[]>([]);
	const [course1, setCourse1] = useState<Course[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [user, setUser] = useState<any>();
	const [cid, setId] = useState<any>([]);
	

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:8090/getallcourse`);
				const newData = response.data.filter((item: any) => !cid.includes(item._id)); // Filter out items already in cid
				setCourse(newData); // Add only new items to setCourse
				console.log(newData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};

		fetchData();
	}, [cid]);

	useEffect(() => {
		const fetchData = async () => {
			// Load data from localStorage when the component mounts
			const token = await localStorage.getItem('token');

			if (token) {
				try {
					const res = await axios.get('http://localhost:8080/current-user', {
						headers: {
							authorization: 'Bearer ' + token,
						},
					});
					await setUser(res.data);
					await setCourse1([]);
					for (let i = 0; i < 2; i++) {
						const courseId = res.data.course[i].id;
						console.log('hi');
						const courseData = await fetchData1(courseId);
						await setCourse1((prevCourses) => [...prevCourses, courseData]); // Push course1 data into state array
					}
					await console.log(course1)
					console.log(res.data);
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};
		fetchData(); // Call the async function
	}, []);

	const fetchData1 = async (id: any) => {
		try {
			const response = await axios.get(`http://localhost:8090/getcourseId/${id}`);
			setId((prevIds:any) => [...prevIds,id]); 
			return response.data; // Return the fetched data
			
		} catch (error) {
			console.error('Error fetching data: ', error);
			return null;
		}
	};

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					{course1?
					<div className='row row-cols-1 row-cols-md-3 g-4'>
						{course1?.slice(0, 2).map((course, index) => (
							<div className='col' key={index}>
								<div className='card'>
									<img
										src={course?.document[0]?.file || image}
										className='card-img-top'
										alt='...'
										style={{ height: '200px' }}
									/>
									<div className='card-body'>
										<h5 className='card-title'>{course.courseName}</h5>
										<p className='card-text'>{course.discription}</p>
										<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
											<Button
												className='btn btn-primary me-md-2'
												icon='Eye'
												type='button'
												tag='a'
												href={`/student/my-learning/view-course/${course._id}`}>
												view
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					:<></>}
					<hr />
					<div className='input-group mt-5 mb-5'>
						<span className='input-group-text' id='basic-addon1'>
							<Icon icon='Search'></Icon>
						</span>
						<Input
							id='searchInput'
							type='search'
							className='shadow-none bg-transparent'
							placeholder='Search course...'
							onChange={(event: any) => {
								setSearchTerm(event.target.value);
							}}
							value={searchTerm}
						/>
					</div>
					<div>
						<div className='row row-cols-1 row-cols-md-3 g-4'>
							{course
								.filter((val) => {
									if (searchTerm === '') {
										return val;
									} else if (
										val.courseName
											.toLowerCase()
											.includes(searchTerm.toLowerCase())
									) {
										return val;
									}
								})
								.map((course, index) => (
									<div className='col' key={index}>
										<div className='card'>
											<img
												src={course.document[0].file || image}
												className='card-img-top'
												alt='...'
												style={{ height: '200px' }}
											/>
											<div className='card-body'>
												<h5 className='card-title'>{course.courseName}</h5>
												<p className='card-text'>{course.discription}</p>
												<div className='row'>
													<div className='col-xxl-6'>
														<h5>Rs {course.price}.00</h5>
													</div>
													<div className='col-xxl-6'>
														<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
															<Button
																className='btn btn-primary me-md-2'
																icon='LockOpen'
																type='button'
																tag='a'
																href={`/student/course/view-course/${course._id}`}>
																Enroll me
															</Button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
