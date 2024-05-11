import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import image from '../../../assets/How-to-create-an-online-course.jpg';
import ThemeContext from '../../../context/themeContext';
import useDarkMode from '../../../hooks/useDarkMode';
import { TABS, TTabs } from '../../../common/type/helper';
import Page from '../../../layout/Page/Page';

import router, { useRouter } from 'next/router';
import axios from 'axios';
import Button from '../../../components/bootstrap/Button';

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
	const router = useRouter();
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
					console.log(res.data.course.length);
					if (course1.length == 0) {
						for (let i = 0; i <= res.data.course.length - 1; i++) {
							const courseId = res.data.course[i].id;
							console.log('hi');
							const courseData = await fetchData1(courseId);
							await setCourse1((prevCourses) => [...prevCourses, courseData]); // Push course1 data into state array
						}
					}

					console.log(res.data);
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};
		setCourse1([]);
		fetchData(); // Call the async function
	}, []);

	const fetchData1 = async (id: any) => {
		try {
			const response = await axios.get(`http://localhost:8090/getcourseId/${id}`);
			return response.data; // Return the fetched data
		} catch (error) {
			console.error('Error fetching data: ', error);
			return null;
		}
	};
	const navigater = (id: any) => {
		router.push(`/student/my-learning/view-course/${id}`);
	};
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='row row-cols-1 row-cols-md-3 g-4'>
						{course1
							.filter(
								(course, index, self) =>
									index === self.findIndex((c) => c._id === course._id),
							)
							.map((course, index) => (
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
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
