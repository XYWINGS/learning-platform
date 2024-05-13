import React, { useState, useEffect, FC, use } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Card, { CardBody } from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import Swal from 'sweetalert2';
import postservice from '../../../../services/postservice';
import { storage } from '../../../../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}

// CustomerEditModal component definition
const TeamAddModal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	interface task {
		name: string;
		file: string;
	}
	const [rows, setRows] = useState<task[]>([{ name: '', file: '' }]);
	const [user, setUser] = useState<any>();

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

					setUser(res.data._id);
					console.log(res.data); // Assuming you want to log the response data
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};

		fetchData(); // Call the async function
	}, []);

	//add new row to inome
	const addRow = () => {
		setRows([...rows, { name: '', file: '' }]);
	};

	const deleteRow = (index: number) => {
		const updatedRows = [...rows];
		updatedRows.splice(index, 1);
		setRows(updatedRows);
	};

	// Initialize formik for form management
	const formik = useFormik({
		initialValues: {
			// 	// Set initial form values based on existing customer data
			user: user,
			courseName: '',
			discription: '',
			part: 0,
			price: 0,
			enrollKey: '',
			document: [{}],
			status: 'pending',
		},

		validate: (values) => {
			const errors: {
				courseName?: string;
				discription?: string;
				enrollKey?: string;
				price?: string;
			} = {};
			if (!values.courseName) {
				errors.courseName = 'Required';
			}
			if (!values.discription) {
				errors.discription = 'Required';
			}
			if (!values.enrollKey) {
				errors.enrollKey = 'Required';
			}
			if (!values.price) {
				errors.price = 'Required';
			}

			return errors;
		},
		onSubmit: async (values) => {
			const processingPopup = Swal.fire({
				title: 'Processing...',
				html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
				allowOutsideClick: false,
				showCancelButton: false,
				showConfirmButton: false,
			});
			if (rows.length == 0) {
				Swal.fire('Error', 'please add task to the Project.', 'error');
				return;
			}
			values.part = rows.length;
			values.user = user;
			console.log(values);

			const isInvalidRow = rows.some((row1) => !row1.file || !row1.name);

			if (isInvalidRow) {
				Swal.fire({
					icon: 'error',
					title: 'Invalid Data',
					text: 'Please fill  all rows in task .',
				});
				return;
			}
			await rows.forEach(async (row, index) => {
				const url: any = await handleUploadDocument(row.file);
				row.file = await url;

				if (index == rows.length - 1) {
					values.document = await rows;
					await console.log(values);

					const res: any = await await axios.post(
						`http://localhost:8090/courseRegister/`,
						values,
					);
					if (res) {
						Swal.fire({
							icon: 'success',
							title: 'Success',
							text: 'Successfully add project',
						});
						console.log('ok');
						setIsOpen(false);
						return;
					} else {
						console.log('bad');
					}
				}
			});
		},
	});
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
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id}>
			<ModalHeader setIsOpen={setIsOpen} className='p-4'>
				<ModalTitle id=''>{'New course'}</ModalTitle>
			</ModalHeader>
			<ModalBody className='px-4'>
				{/* Form fields for customer information */}
				<div className='row g-4'>
					<FormGroup id='courseName' label='Course Name' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.courseName}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.courseName}
							invalidFeedback={formik.errors.courseName}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='discription' label='Discription' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.discription}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.discription}
							invalidFeedback={formik.errors.discription}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='price' label='Price' className='col-md-6'>
						<Input
							type='number'
							onChange={formik.handleChange}
							value={formik.values.price}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.price}
							invalidFeedback={formik.errors.price}
							validFeedback='Looks good!'
						/>
					</FormGroup>

					<FormGroup id='enrollKey' label='Enrollment Key' className='col-md-6'>
						<Input
							onChange={formik.handleChange}
							value={formik.values.enrollKey}
							onBlur={formik.handleBlur}
							isValid={formik.isValid}
							isTouched={formik.touched.enrollKey}
							invalidFeedback={formik.errors.enrollKey}
							validFeedback='Looks good!'
						/>
					</FormGroup>

					<p className='h5'>Add Document</p>

					<Card stretch style={{ height: '500px' }}>
						<CardBody isScrollable={true} className='table-responsive'>
							<div className='row g-4'></div>
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
									{rows.map((row, index) => (
										<tr key={index}>
											<th scope='row'>{index + 1}</th>

											<td>
												<input
													type='text'
													className='form-control test-end'
													value={row.name}
													onChange={(e) => {
														const updatedRows = [...rows];
														updatedRows[index].name = e.target.value;
														setRows(updatedRows);
													}}
												/>
											</td>
											<td>
												<Input
													type='file'
													onChange={(e: any) => {
														const updatedRows = [...rows];
														updatedRows[index].file = e.target.files[0];
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
						</CardBody>
					</Card>
				</div>
			</ModalBody>
			<ModalFooter className='px-4 pb-4'>
				{/* Save button to submit the form */}
				<Button color='info' onClick={formik.handleSubmit}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};
// If 'id' is not present, return null (modal won't be rendered)

// Prop types definition for CustomerEditModal component
TeamAddModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default TeamAddModal;
