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
interface Document {
	name: string;
	file: string;
}
interface Course {
	_id: string;
	courseName: string;
	discription: string;
	part: string;
	enrollKey: string;
	user: string;
	document: [];
	price:number;
	status:string;
}

const id: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState<Course>();
	const [edit, setEdit] = useState<boolean>(false);
	const [rows, setRows] = useState<Document[]>([{ name: '', file: '' }]);
	const [documents, setDocuments] = useState<Document[]>([{ name: '', file: '' }]);

	//add new row to inome
	const addRow = () => {
		setRows([...rows, { name: '', file: '' }]);
	};

	const deleteRow = (index: number) => {
		const updatedRows = [...rows];
		updatedRows.splice(index, 1);
		setRows(updatedRows);
	};
	const deleteDocument = (index: number) => {
		const updatedRows = [...documents];
		updatedRows.splice(index, 1);
		setDocuments(updatedRows);
	};

	// fetch data
	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8090/getcourseId/${id}`)
					.then(async (res: any) => {
						await setData(res.data);
						await setDocuments(res.data.document);
						console.log(res.data.document);
					})
					.catch((err) => {
						console.error('Error fetching data: ', err);
					});
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};

		fetchData();
	}, [id]);

	const handlesave = async () => {
		const processingPopup = Swal.fire({
			title: 'Processing...',
			html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
			allowOutsideClick: false,
			showCancelButton: false,
			showConfirmButton: false,
		});

		const mergedData = [...rows, ...documents];

		await rows.forEach(async (row, index) => {
			const url: any = await handleUploadDocument(row.file);
			row.file = await url;

			if (index == rows.length - 1) {
				const mergedData: any = [...rows, ...documents];
				const data1: any = data;
				data1.document = mergedData;
        console.log(data1)
				const res: any = await await axios.put(
					`http://localhost:8090/updatecourse/${id}`,
					data1,
				);
				if (res) {
					Swal.fire({
						icon: 'success',
						title: 'Success',
						text: 'Successfully update course',
					});
					console.log('ok');

					return;
				} else {
					console.log('bad');
				}
			}
		});
	};
	const handleUploadDocument = async (documentupload: any) => {
		if (documentupload) {
			// Assuming generatePDF returns a Promise
			const pdfFile = documentupload;

			const storageRef = ref(storage, `employees/${pdfFile.name}`);
			const uploadTask = uploadBytesResumable(storageRef, pdfFile);

			return new Promise((resolve, reject) => {
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress1 = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
						);
					},
					(error) => {
						console.error(error.message);
						reject(error.message);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref)
							.then((url) => {
								console.log('File uploaded successfully. URL:', url);

								console.log(url);
								resolve(url); // Resolve the Promise with the URL
							})
							.catch((error) => {
								console.error(error.message);
								reject(error.message);
							});
					},
				);
			});
		} else {
			console.log('hi');
			return '';
		}
	};

	return (
		<PageWrapper>
			<Head>
				<title>course</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Link href='/instructor/course'>
						<Button icon='ArrowBackIos'>Back page</Button>
					</Link>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Share' color='primary'></Button>

					<Button icon='Edit' color='primary' hidden={edit} isLight>
						Edit
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='container' id='pdfCaptureWrapper'>
					<div className='container'></div>
					<div className='col-sm-12'>
						<div className='card'>
							<div className='card-body'>
								<h5 className='card-title'>Course Details</h5>
								<table className='table'>
									<thead>
										<tr>
											<th scope='col'></th>
											<th scope='col'>Course name</th>
											<th scope='col' className='form-control test-end'>
												 {data?.courseName}
											</th>
										</tr>
									</thead>
									<tbody>
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
												<label className='form-label'>Enroll key</label>
											</td>
											<td className='text-bold'>{data?.enrollKey}</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<label className='form-label'>Course Price</label>
											</td>
											<td className='text-bold'>{data?.price}</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<label className='form-label'>Status</label>
											</td>
											<td className='text-bold'>{data?.status}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<Card stretch style={{ height: '500px' }}>
							<CardBody isScrollable={true} className='table-responsive'>
								<h5 className='card-title'>Documents</h5>
								<table className='table mt-5'>
									<thead>
										<tr>
											<th>file name</th>
											<th>file</th>
											<th></th>
										</tr>
									</thead>
									{documents?.map((row, index) => (
										<tr>
											<td scope='col'>{row.name}</td>
											<td scope='col'>
												<a href={row.file} target='_blank'>
													{' '}
													click hear to view document
												</a>
											</td>
											<td>
												<Button
													icon='Delete'
													color='primary'
													onClick={deleteDocument}></Button>
											</td>
										</tr>
									))}
								</table>
								<h6 className='card-title'>Add new document</h6>
								<table className='table mt-5'>
									<thead>
										<tr>
											<th scope='col'></th>
											<th scope='col'> Name</th>
											<th scope='col'>file</th>

											<th></th>
										</tr>
									</thead>

									<tbody>
										{rows?.map((row, index) => (
											<tr key={index}>
												<th scope='row'>{index + 1}</th>

												<td>
													<input
														type='text'
														className='form-control test-end'
														value={row.name}
														onChange={(e) => {
															const updatedRows = [...rows];
															updatedRows[index].name =
																e.target.value;
															setRows(updatedRows);
														}}
													/>
												</td>
												<td>
													<Input
														type='file'
														onChange={(e: any) => {
															const updatedRows = [...rows];
															updatedRows[index].file =
																e.target.files[0];
															setRows(updatedRows);
														}}
													/>
												</td>

												<td>
													<Button
														className='mt-1'
														color='danger'
														onClick={() => deleteRow(index)}>
														Cancle
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<Button icon='Add' color='primary' onClick={addRow}>
									Add Row
								</Button>
								<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
									<Button color='info' onClick={handlesave}>
										Save
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default id;
