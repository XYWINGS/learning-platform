import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Button from '../../../../components/bootstrap/Button';
import Page from '../../../../layout/Page/Page';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, storage } from '../../../../firebaseConfig';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';

import Link from 'next/link';
import axios from 'axios';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import Input from '../../../../components/bootstrap/forms/Input';
import { tr } from 'date-fns/locale';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
	PayPalButtons,
	PayPalButtonsComponentProps,
	PayPalScriptProvider,
	ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

interface Document {
	name: string;
	file: string;
}
interface Course {
	_id: string;
	courseName: string;
	discription: string;
	part: number;
	user: string;
	document: [];
	price: number;
}
interface User{
	name:string,
	IT_no:string,
	role:string,
	password:string
}
const id: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState<Course>({_id:"ff",courseName:"",discription:"",part:0,user:"",document:[],price:0});
	const [documents, setDocuments] = useState<Document[]>([{ name: '', file: '' }]);
	const [course, setCourse] = useState<any>([]);
	const [course1, setCourse1] = useState<any>([]);
	const [user, setUser] = useState<any>();
	const [state, setState] = useState<boolean>(true);

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8090/getcourseId/${id}`)
					.then(async (res: any) => {
						await setData(res.data);
						await setDocuments(res.data.document);
						console.log(res.data)
					})
					.catch((err) => {
						console.error('Error fetching data: ', err);
					});
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};

		fetchData();
	}, [id, state]);
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
					await console.log(res.data);
					await setCourse(res.data.course)
				
					// Assuming you want to log the response data
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};
		fetchData(); // Call the async function
	}, [id, state,course1]);

const changerate =async ()=>{
	console.log(course)
	const updatedCourses = course.map((c:any) => {
		if (c.id === id) {
			if(c.rate<data?.part){
				return { ...c, rate: c.rate + 1 };
			}
		 
		}
		return c;
	  });
	  try {
		await axios
			.put(`http://localhost:8071/updatecourse/${user._id}`,updatedCourses)
			.then(async (res: any) => {
				await setCourse1(updatedCourses);
				
			})
			.catch((err) => {
				console.error('Error fetching data: ', err);
			});
	} catch (error) {
		console.error('Error fetching data: ', error);
	}
	  await setCourse(updatedCourses);
	  console.log(updatedCourses)
	
}


	

	return (
		<PageWrapper>
			<Head>
				<title>course</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Link href='/student/my-learning'>
						<Button icon='ArrowBackIos'>Back page</Button>
					</Link>
				</SubHeaderLeft>
				{/* <SubHeaderRight>
					<Button icon='Share' color='primary'></Button>

					<Button icon='Edit' color='primary' hidden={edit} isLight>
						Edit
					</Button>
				</SubHeaderRight> */}
			</SubHeader>
			<Page>
				<div className='container' id='pdfCaptureWrapper'>
					<div className='container'></div>
					<div className='col-sm-12'>
						<div className='card'>
							<div className='card-body'>
								<h5 className='card-title'>Course Details</h5>
								<table className='table'>
									<tbody>
										<tr>
											<td></td>
											<td>
												<label className='form-label'>Course Name</label>
											</td>
											<td className='text-bold'>{data?.courseName}</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<label className='form-label'>Discription</label>
											</td>
											<td className='text-bold'>{data?.discription}</td>
										</tr>

										<tr>
											<td></td>
											<td>
												<label className='form-label'>
													Amount completed
												</label>
											</td>
											{user?.course
												.filter((val: any) => {
													if (val.id.includes(id)) {
														// val=(val/3)*100
														return val;
													}
												})
												.map((row: any, index: any) => (
													<td className='text-bold'>
														<div className='row'>
															<div className='col-6'>
																<Input
																	type='range'
																	value={(row.rate/data?.part) * 100}
																	readOnly
																/>
															</div>
															<div className='col-6'>
																{(row.rate /data?.part) * 100} %
															</div>
														</div>
													</td>
												))}
											<td className='text-bold'></td>
										</tr>
									</tbody>
								</table>
								<h5 className='card-title'>Course Content</h5>
								<br />
								{documents?.map((row, index) => (
									<div className='row'>
										<div className='col-1'>
											<td>{index + 1}</td>
										</div>
										<div className='col-2'>
											<td scope='col'>{row.name}</td>
										</div>
										<div className='col-4'>
											<td scope='col' onClick={changerate}>
												<a href={row.file} target='_blank'>
												
													click hear to view document
												</a>
											</td>
											<div className='col2'></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default id;
