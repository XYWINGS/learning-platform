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
	part: string;
	user: string;
	document: [];
	price: number;
}

const id: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState<Course>();
	const [documents, setDocuments] = useState<Document[]>([{ name: '', file: '' }]);
	const [price, setPrice] = useState<any>('50');
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
						data1.courseName = res.data.courseName;
						data1.price = res.data.price;
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
					data1.username = res.data.name;
					data1.userid = res.data._id;
					// Assuming you want to log the response data
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};
		fetchData(); // Call the async function
	}, [id, state]);

	const initialOptions: ReactPayPalScriptOptions = {
		clientId:
			'AcGbD2oTsz-H-WQhFE5-4PvSr97NmhguF7HN2t6V9OwenZfqywUHdd2B31gl8mhStN04MKcdMGwgbM42',
		currency: 'USD',
		// Add other options as needed
	};

	const styles: PayPalButtonsComponentProps['style'] = {
		layout: 'horizontal',
		shape: 'rect',
	};
	const data1 = {
		courseName: data?.courseName,
		userid: user?._id,
		username: user?.name,
		price: 50,
		status: 'completed',
		date: new Date().toISOString().split('T')[0],
	};

	const handlePaymentSuccess = async (data: any, actions: any) => {
		// Implement logic to handle successful payment
		await setState(false);
		try {
			const orderData = await actions.order.capture();
			console.log('Payment successful:', orderData);

			const res: any = await axios.post(`http://localhost:8070/addpayment`, data1);
			await console.log(data1);
			if (res) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Successfully update course',
				});
				console.log('ok');

				
			} else {
				console.log('bad');
			}

			const data2 = {
				courseName: data1.courseName,
				id:id,
				rate:0
			};
		
			const res1: any = await axios.put(`http://localhost:8071/updateuser/${data1.userid}`, data2);
			await console.log(data1);
			if (res1) {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Successfully update course',
				});
				console.log('ok');

				
			} else {
				console.log('bad');
			}

			window.location.href = '/student/my-learning';
			// Add logic to update your backend/database with the payment details
		} catch (error) {
			console.error('Error capturing payment:', error);
			// Handle error scenario
		}
	};

	return (
		<PageWrapper>
			<Head>
				<title>course</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Link href='/student/course'>
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
												<label className='form-label'>Course Price</label>
											</td>
											<td className='text-bold'>{data?.price}</td>
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
										<div className='col-11'>
											<td scope='col'>{row.name}</td>
										</div>
									</div>
								))}

								<div className=''>
									<PayPalScriptProvider options={initialOptions}>
										<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
											<PayPalButtons
												style={styles}
												createOrder={(data, actions: any) => {
													// Implement logic to create the PayPal order
													return actions.order.create({
														purchase_units: [
															{
																amount: {
																	value: price, // Set the payment amount dynamically
																},
															},
														],
													});
												}}
												onApprove={handlePaymentSuccess}
											/>
										</div>
									</PayPalScriptProvider>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default id;
